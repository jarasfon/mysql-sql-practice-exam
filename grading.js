
/*
 * SQL Practice Exam
 * grading.js
 *
 * ระบบตรวจคำตอบ SQL แบบ Offline สำหรับ MySQL 8+
 * คะแนนเต็ม 4 คะแนนต่อข้อ
 *
 * หมายเหตุ:
 * - ไม่ได้รัน SQL จริง
 * - ตรวจคำตอบที่ตรงกับเฉลยอ้างอิง
 * - คำตอบ SQL ทางเลือกต้องได้รับการตรวจทาน
 */

(function (root) {
    'use strict';

    const MAX_SCORE = 4;

    // ==========================================
    // 1. แยก SQL ออกเป็น Tokens
    // ==========================================
    function tokenize(sql) {
        const input = String(sql ?? '');
        const tokens = [];
        let i = 0;

        while (i < input.length) {
            const rest = input.slice(i);
            const c = input[i];

            if (/\s/.test(c)) {
                i++;
                continue;
            }

            // Single-line comments
            if (
                (rest.startsWith('--') &&
                    (rest.length === 2 || /\s/.test(rest[2]))) ||
                c === '#'
            ) {
                while (i < input.length && input[i] !== '\n') {
                    i++;
                }
                continue;
            }

            // Block comments
            if (rest.startsWith('/*')) {
                const end = input.indexOf('*/', i + 2);

                if (end === -1) {
                    throw Error('คอมเมนต์ /* ยังไม่ปิด');
                }

                if (input[i + 2] === '!') {
                    throw Error(
                        'ไม่รองรับ MySQL executable comments'
                    );
                }

                i = end + 2;
                continue;
            }

            // Strings และ quoted identifiers
            if (c === "'" || c === '"' || c === '`') {
                const quote = c;
                let value = c;
                let closed = false;

                i++;

                while (i < input.length) {
                    const ch = input[i++];
                    value += ch;

                    if (
                        ch === '\\' &&
                        quote !== '`' &&
                        i < input.length
                    ) {
                        value += input[i++];
                        continue;
                    }

                    if (ch === quote) {
                        if (input[i] === quote) {
                            value += input[i++];
                            continue;
                        }

                        closed = true;
                        break;
                    }
                }

                if (!closed) {
                    throw Error(
                        'เครื่องหมาย ' +
                        quote +
                        ' เปิดไว้แต่ไม่ได้ปิด'
                    );
                }

                tokens.push(value);
                continue;
            }

            // Numbers
            const num = rest.match(
                /^(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?/
            );

            if (num) {
                tokens.push(num[0]);
                i += num[0].length;
                continue;
            }

            // SQL keywords และ identifiers
            const word = rest.match(
                /^[\p{L}_$][\p{L}\p{N}_$]*/u
            );

            if (word) {
                tokens.push(word[0].toUpperCase());
                i += word[0].length;
                continue;
            }

            // Operators
            const operators = [
                '<=>',
                '>=',
                '<=',
                '<>',
                '!=',
                ':=',
                '||',
                '&&',
                '<<',
                '>>',
                '->>',
                '->'
            ];

            const match = operators.find(
                op => rest.startsWith(op)
            );

            if (match) {
                tokens.push(match);
                i += match.length;
                continue;
            }

            // Symbols
            if (/^[(),.;*+\/%=<>!|&^~?:-]$/.test(c)) {
                tokens.push(c);
                i++;
                continue;
            }

            throw Error(
                'พบอักขระที่ไม่รองรับ: ' + c
            );
        }

        // ลบ semicolon ท้ายคำสั่ง
        while (tokens[tokens.length - 1] === ';') {
            tokens.pop();
        }

        return tokens;
    }

    // ==========================================
    // 2. Normalize SQL
    // ==========================================
    function normalizeSQL(sql) {
        return tokenize(sql).join(' ');
    }

    // ==========================================
    // 3. นับจำนวน SQL Statements
    // ==========================================
    function statementCount(tokens) {
        let count = 0;
        let inStatement = false;

        for (const token of tokens) {
            if (token === ';') {
                if (inStatement) {
                    count++;
                }

                inStatement = false;
            } else {
                inStatement = true;
            }
        }

        return count + Number(inStatement);
    }

    // ==========================================
    // 4. คำนวณความคล้ายคลึงของ Tokens
    // Longest Common Subsequence
    // ==========================================
    function lcsRatio(a, b) {
        if (!a.length || !b.length) {
            return 0;
        }

        let prev = new Uint16Array(b.length + 1);

        for (let i = 1; i <= a.length; i++) {
            const cur = new Uint16Array(b.length + 1);

            for (let j = 1; j <= b.length; j++) {
                cur[j] = a[i - 1] === b[j - 1]
                    ? prev[j - 1] + 1
                    : Math.max(prev[j], cur[j - 1]);
            }

            prev = cur;
        }

        return (
            2 * prev[b.length] /
            (a.length + b.length)
        );
    }

    // ==========================================
    // 5. ตรวจข้อควรระวังเบื้องต้น
    // ==========================================
    function diagnostics(tokens) {
        const notes = [];
        const first = tokens[0];

        if (
            (first === 'UPDATE' || first === 'DELETE') &&
            !tokens.includes('WHERE')
        ) {
            notes.push(
                'คำสั่ง UPDATE/DELETE ไม่มี WHERE: ' +
                'อาจกระทบทุกแถว ' +
                '(บางโจทย์อาจตั้งใจให้เป็นเช่นนั้น)'
            );
        }

        if (tokens.includes('FORM')) {
            notes.push(
                'ตรวจสอบคำว่า FORM: อาจต้องเป็น FROM'
            );
        }

        if (tokens.includes('=>')) {
            notes.push(
                'MySQL ใช้ >= สำหรับมากกว่าหรือเท่ากับ'
            );
        }

        return notes;
    }

    // ==========================================
    // 6. ตรวจคำตอบรายข้อ
    // ==========================================
    function gradeAnswer(question, response, options = {}) {
        const answer = String(response ?? '').trim();

        const references = [
            question?.expectedSql,
            question?.answer,
            ...(
                Array.isArray(question?.acceptedAnswers)
                    ? question.acceptedAnswers
                    : []
            )
        ].filter(
            x => typeof x === 'string' && x.trim()
        );

        const base = {
            questionId: question?.id ?? null,
            maxScore: MAX_SCORE,
            answer: answer,
            correctAnswer:
                question?.answer ??
                question?.expectedSql ??
                '',
            explanation: question?.explanation ?? '',
            feedback: [],
            needsReview: false
        };

        // --------------------------------------
        // 6.1 ไม่ได้ตอบคำถาม
        // --------------------------------------
        if (!answer) {
            return {
                ...base,
                score: 0,
                status: 'unanswered',
                isCorrect: false,
                feedback: [
                    'ยังไม่ได้กรอกคำตอบ'
                ]
            };
        }

        // --------------------------------------
        // 6.2 ไม่มีเฉลยอ้างอิง
        // --------------------------------------
        if (!references.length) {
            return {
                ...base,
                score: null,
                status: 'ungradable',
                isCorrect: null,
                needsReview: true,
                feedback: [
                    'ไม่มีเฉลยอ้างอิงสำหรับตรวจ'
                ]
            };
        }

        // --------------------------------------
        // 6.3 คำตอบอธิบายเป็นข้อความ
        // --------------------------------------
        const proseReference = references.every(
            ref => /[ก-๙]/.test(ref)
        );

        if (proseReference) {
            const compact = x =>
                x.trim().replace(/\s+/g, ' ');

            if (
                references.some(
                    ref => compact(ref) === compact(answer)
                )
            ) {
                return {
                    ...base,
                    score: MAX_SCORE,
                    status: 'correct',
                    isCorrect: true,
                    feedback: [
                        'ข้อความตรงกับแนวคำตอบอ้างอิง'
                    ]
                };
            }

            return {
                ...base,
                score: null,
                status: 'review',
                isCorrect: null,
                needsReview: true,
                feedback: [
                    'คำตอบอธิบายเป็นข้อความ ' +
                    'ต้องตรวจความถูกต้องของเนื้อหาด้วยตนเอง'
                ]
            };
        }

        // --------------------------------------
        // 6.4 Tokenize คำตอบผู้เข้าสอบ
        // --------------------------------------
        let userTokens;

        try {
            userTokens = tokenize(answer);
        } catch (error) {
            return {
                ...base,
                score: 0,
                status: 'syntax-warning',
                isCorrect: false,
                needsReview: true,
                feedback: [
                    error.message
                ]
            };
        }

        const feedback = diagnostics(userTokens);
        let best = 0;

        // --------------------------------------
        // 6.5 เปรียบเทียบกับเฉลยที่ยอมรับ
        // --------------------------------------
        for (const ref of references) {
            let expected;

            try {
                expected = tokenize(ref);
            } catch (error) {
                continue;
            }

            // คำตอบตรงกับเฉลยหลัง Tokenize
            if (
                userTokens.join('\u0000') ===
                expected.join('\u0000')
            ) {
                return {
                    ...base,
                    score: MAX_SCORE,
                    status: 'correct',
                    isCorrect: true,
                    feedback: [
                        'ตรงกับเฉลยที่ยอมรับหลังปรับช่องว่าง' +
                        'และตัวพิมพ์ของคำสั่ง SQL',
                        ...feedback
                    ]
                };
            }

            // คำนวณความคล้ายคลึง
            best = Math.max(
                best,
                lcsRatio(userTokens, expected)
            );
        }

        // --------------------------------------
        // 6.6 คะแนนเบื้องต้นจากความคล้ายคลึง
        // ไม่ใช่การยืนยันความถูกต้องทาง SQL
        // --------------------------------------
        const score =
            best >= 0.75 ? 2 :
            best >= 0.45 ? 1 :
            0;

        if (statementCount(userTokens) > 1) {
            feedback.push(
                'คำตอบมีหลายคำสั่ง ' +
                'กรุณาตรวจลำดับและผลของแต่ละคำสั่ง'
            );
        }

        feedback.push(
            'คำตอบไม่ตรงรูปแบบเฉลยที่ยอมรับ ' +
            'อาจเป็น SQL ทางเลือกที่ถูกต้อง ' +
            'ต้องตรวจทานก่อนสรุปคะแนน'
        );

        return {
            ...base,
            score: score,
            status: 'review',
            isCorrect: null,
            needsReview: true,
            similarity: Number(best.toFixed(3)),
            feedback: feedback
        };
    }

    // ==========================================
    // 7. ตรวจข้อสอบทั้งชุด
    // ==========================================
    function gradeExam(entries) {
        const results = (entries || []).map(
            entry => gradeAnswer(
                entry.question,
                entry.answer
            )
        );

        const total = results.reduce(
            (sum, result) =>
                sum + (result.score ?? 0),
            0
        );

        const maxScore =
            results.length * MAX_SCORE;

        const correctCount = results.filter(
            result => result.status === 'correct'
        ).length;

        const unansweredCount = results.filter(
            result => result.status === 'unanswered'
        ).length;

        const reviewCount = results.filter(
            result => result.needsReview
        ).length;

        const provisional = results.some(
            result => result.needsReview
        );

        const percentage = results.length
            ? Number(
                (
                    100 * total / maxScore
                ).toFixed(2)
            )
            : 0;

        return {
            results: results,
            totalScore: total,
            maxScore: maxScore,
            correctCount: correctCount,
            unansweredCount: unansweredCount,
            reviewCount: reviewCount,
            provisional: provisional,
            percentage: percentage
        };
    }

    // ==========================================
    // 8. Export Functions
    // ==========================================
    const api = Object.freeze({
        tokenize,
        normalizeSQL,
        gradeAnswer,
        gradeExam,
        MAX_SCORE
    });

    // ใช้กับ Browser
    root.SQLGrader = api;

    // ใช้กับ Node.js
    if (
        typeof module !== 'undefined' &&
        module.exports
    ) {
        module.exports = api;
    }

})(
    typeof window !== 'undefined'
        ? window
        : globalThis
);
