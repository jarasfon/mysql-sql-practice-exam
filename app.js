/* SQL Practice Exam — preserves original page structure and classes. */
(() => {
  'use strict';
  const KEY = 'mysql_sql_exam_round_v2';
  const HISTORY_KEY = 'mysql_sql_exam_history_v2';
  const BANK = window.QUESTION_BANK;
  const container = document.getElementById('examContainer');
  const nav = document.getElementById('sectionNav');
  const $ = id => document.getElementById(id);
  const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const read = key => { try { return JSON.parse(localStorage.getItem(key) || 'null'); } catch { return null; } };
  const write = (key, data) => { try { localStorage.setItem(key, JSON.stringify(data)); } catch { console.warn('ไม่สามารถบันทึก Local Storage'); } };
  const shuffle = values => {
    const a = [...values];
    for (let i = a.length - 1; i > 0; i--) {
      const rand = new Uint32Array(1);
      crypto.getRandomValues(rand);
      const j = rand[0] % (i + 1);
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  if (!Array.isArray(BANK) || BANK.length < 5 || BANK.some(g => !Array.isArray(g.questions) || g.questions.length !== 5)) {
    container.textContent = 'คลังข้อสอบไม่สมบูรณ์ กรุณาตรวจสอบ questions.js';
    return;
  }
  const bankById = new Map(BANK.map(g => [g.id, g]));
  const makeRound = () => ({
    roundId: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    groupIds: shuffle(BANK).slice(0, 5).map(g => g.id),
    answers: {}, results: {}, submitted: false, createdAt: new Date().toISOString()
  });
  let round = read(KEY);
  if (!round || !Array.isArray(round.groupIds) || round.groupIds.length !== 5 ||
      round.groupIds.some(id => !bankById.has(id)) || !round.answers || !round.results) {
    round = makeRound(); write(KEY, round);
  }
  const sections = () => round.groupIds.map(id => bankById.get(id));
  const allQuestions = () => sections().flatMap(g => g.questions);
  const persist = () => write(KEY, round);
  const difficultyClass = level => ({Easy:'easy', Medium:'medium', Hard:'hard', Advanced:'advanced'})[level] || 'medium';
  const isSql = q => /^(?:SELECT|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP|TRUNCATE|RENAME|REPLACE|START|COMMIT|ROLLBACK|SAVEPOINT|RELEASE|SET|SHOW|EXPLAIN|WITH|CALL|GRANT|REVOKE|mysqldump|mysql\s+-)/i.test(String(q.answer || '').trim());
  function check(q, value) {
    const text = value.trim();
    if (!text) return { status: 'unanswered', score: 0, feedback: 'ยังไม่ได้กรอกคำตอบ' };
    if (isSql(q) && window.SQLGrader) {
      const result = window.SQLGrader.gradeAnswer(q, text);
      if (result.status === 'correct') return { status: 'correct', score: 4, feedback: 'คำตอบตรงกับเฉลยอ้างอิง (ยังไม่ได้รัน SQL จริง)' };
      if (result.status === 'syntax-warning') return { status: 'review', score: null, feedback: `พบข้อควรตรวจสอบ: ${(result.feedback || []).join(' ')}` };
    }
    if (!isSql(q) && text.replace(/\s+/g, ' ') === String(q.answer || '').trim().replace(/\s+/g, ' ')) {
      return { status: 'correct', score: 4, feedback: 'ข้อความตรงกับเฉลยอ้างอิง' };
    }
    return { status: 'review', score: null, feedback: 'คำตอบต่างจากเฉลยอ้างอิง อาจถูกต้องได้ กรุณาเปรียบเทียบเฉลยแล้วประเมินด้วยตนเอง' };
  }
  function resultHtml(q) {
    const r = round.results[q.id];
    if (!r) return '';
    const labels = {correct:'ตรงเฉลย', review:'รอตรวจทาน', self_correct:'ประเมินตนเอง: ถูก', self_incorrect:'ประเมินตนเอง: ผิด', unanswered:'ยังไม่ตอบ'};
    const color = ['correct','self_correct'].includes(r.status) ? 'success' : r.status === 'review' ? 'warning' : 'secondary';
    const selfButtons = r.status === 'review' && !round.submitted ? `<div class="d-flex flex-wrap gap-2 mt-3"><button type="button" class="btn btn-sm btn-outline-success self-grade" data-qid="${escapeHtml(q.id)}" data-score="4">ฉันตรวจแล้ว: ถูก (4 คะแนน)</button><button type="button" class="btn btn-sm btn-outline-danger self-grade" data-qid="${escapeHtml(q.id)}" data-score="0">ฉันตรวจแล้ว: ผิด (0 คะแนน)</button></div>` : '';
    return `<div class="answer-feedback mt-3"><span class="badge text-bg-${color}">${labels[r.status] || 'ตรวจแล้ว'}</span><p class="small mt-2 mb-1">${escapeHtml(r.feedback)}</p><div class="solution"><div class="fw-bold text-success mb-2">แนวคำตอบ</div><pre>${escapeHtml(q.answer)}</pre><p><strong>คำอธิบาย:</strong> ${escapeHtml(q.explanation)}</p></div>${selfButtons}</div>`;
  }
  function render() {
    nav.innerHTML = '';
    container.innerHTML = '';
    sections().forEach((section, sIndex) => {
      const navBtn = document.createElement('button');
      navBtn.className = 'btn btn-sm btn-outline-primary section-nav-btn';
      navBtn.textContent = `ข้อ ${sIndex + 1}`;
      navBtn.addEventListener('click', () => $(`section-${sIndex}`).scrollIntoView({behavior:'smooth', block:'start'}));
      nav.appendChild(navBtn);
      const sectionEl = document.createElement('section');
      sectionEl.id = `section-${sIndex}`;
      sectionEl.innerHTML = `<div class="section-heading"><div class="d-flex flex-wrap justify-content-between align-items-start gap-2"><div><div class="small text-primary fw-bold">SECTION ${String(sIndex+1).padStart(2,'0')} · คลังข้อ ${section.id}</div><h3 class="h5 fw-bold mb-1">${escapeHtml(section.title)}</h3><p class="mb-0">${escapeHtml(section.description || section.category || '')}</p></div><span class="badge text-bg-primary">20 คะแนน</span></div></div>${section.schema ? `<div class="schema-box mb-3">${escapeHtml(section.schema)}</div>` : ''}`;
      section.questions.forEach((q, qIndex) => {
        const card = document.createElement('article');
        card.className = 'card question-card';
        const r = round.results[q.id];
        card.innerHTML = `<div class="card-header d-flex justify-content-between align-items-center gap-2"><div class="question-title">ข้อ ${sIndex+1}.${qIndex+1} <span class="text-secondary fw-normal small">(4 คะแนน)</span></div><span class="difficulty ${difficultyClass(section.difficulty)}">${escapeHtml(section.difficulty || q.type || 'SQL')}</span></div><div class="card-body"><p class="mb-3">${escapeHtml(q.prompt)}</p><label class="answer-label" for="answer-${q.id}">คำตอบของคุณ</label><textarea class="answer-editor" id="answer-${q.id}" data-qid="${q.id}" spellcheck="false" placeholder="เขียนคำสั่ง SQL หรืออธิบายคำตอบที่นี่..." ${r || round.submitted ? 'disabled' : ''}>${escapeHtml(round.answers[q.id] || '')}</textarea><div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mt-2"><span class="small text-secondary save-status" id="status-${q.id}">${r ? 'ตรวจข้อนี้แล้ว' : 'บันทึกอัตโนมัติ'}</span><button type="button" class="btn btn-sm btn-outline-success check-answer" data-qid="${q.id}" ${r || round.submitted ? 'disabled' : ''}>${r ? 'ตรวจแล้ว' : 'ตรวจคำตอบข้อนี้'}</button></div><div id="feedback-${q.id}">${resultHtml(q)}</div></div>`;
        sectionEl.appendChild(card);
      });
      container.appendChild(sectionEl);
    });
    document.querySelectorAll('.answer-editor').forEach(area => area.addEventListener('input', e => {
      round.answers[e.target.dataset.qid] = e.target.value;
      persist();
      $(`status-${e.target.dataset.qid}`).textContent = 'บันทึกแล้ว';
      updateProgress();
    }));
    document.querySelectorAll('.check-answer').forEach(btn => btn.addEventListener('click', () => {
      if (round.submitted || round.results[btn.dataset.qid]) return;
      const q = allQuestions().find(x => x.id === btn.dataset.qid);
      const answer = round.answers[q.id] || '';
      round.results[q.id] = check(q, answer);
      persist(); render();
      $(`feedback-${q.id}`).scrollIntoView({behavior:'smooth', block:'nearest'});
    }));
    document.querySelectorAll('.self-grade').forEach(btn => btn.addEventListener('click', () => {
      if (round.submitted || round.results[btn.dataset.qid]?.status !== 'review') return;
      const score = Number(btn.dataset.score);
      round.results[btn.dataset.qid] = {status:score === 4 ? 'self_correct' : 'self_incorrect', score, feedback:'คะแนนจากการประเมินตนเอง ไม่ใช่การตรวจ SQL โดยฐานข้อมูลจริง'};
      persist(); render();
    }));
    $('submitBtn').disabled = round.submitted;
    updateProgress(); updateSummary();
  }
  function updateProgress() {
    const count = allQuestions().filter(q => String(round.answers[q.id] || '').trim()).length;
    $('answeredCount').textContent = `${count} / 25`;
    $('completionText').textContent = `${count} จาก 25 ข้อ`;
    $('progressBar').style.width = `${count / 25 * 100}%`;
    $('progressBar').setAttribute('aria-valuenow', String(count * 4));
  }
  function updateSummary() {
    const results = Object.values(round.results);
    const confirmed = results.reduce((sum, r) => sum + (r.score ?? 0), 0);
    const review = results.filter(r => r.status === 'review').length;
    const checked = results.length;
    $('scoreSummary').textContent = `ตรวจแล้ว ${checked}/25 ข้อ · คะแนนที่ประเมินได้ ${confirmed}/100 · รอตรวจทาน ${review} ข้อ${round.submitted ? ' · ส่งข้อสอบแล้ว' : ''}`;
  }
  $('newRoundBtn').addEventListener('click', () => {
    if (!confirm('สุ่มข้อสอบรอบใหม่หรือไม่? คำตอบรอบปัจจุบันจะถูกแทนที่ (ส่งออกก่อนหากต้องการเก็บไว้)')) return;
    round = makeRound(); persist(); render(); window.scrollTo({top:0,behavior:'smooth'});
  });
  $('submitBtn').addEventListener('click', () => {
    if (round.submitted) return;
    if (!confirm('ยืนยันส่งข้อสอบ? หลังส่งจะไม่สามารถแก้ไขคำตอบหรือประเมินเพิ่มในรอบนี้ได้')) return;
    for (const q of allQuestions()) if (!round.results[q.id]) round.results[q.id] = check(q, round.answers[q.id] || '');
    round.submitted = true; round.submittedAt = new Date().toISOString();
    persist();
    const history = read(HISTORY_KEY) || [];
    history.unshift({roundId:round.roundId, date:round.submittedAt, groupIds:round.groupIds, score:Object.values(round.results).reduce((s,r)=>s+(r.score ?? 0),0), reviewCount:Object.values(round.results).filter(r=>r.status==='review').length});
    write(HISTORY_KEY, history.slice(0, 50)); render();
    $('scoreSummary').scrollIntoView({behavior:'smooth',block:'center'});
  });
  $('exportBtn').addEventListener('click', () => {
    let output = 'คำตอบชุดข้อสอบ MySQL & SQL\n\n';
    sections().forEach((g,s) => {
      output += `ข้อใหญ่ ${s+1}: ${g.title} (คลัง ${g.id})\n`;
      g.questions.forEach((q,i) => { output += `\nข้อ ${s+1}.${i+1}\nโจทย์: ${q.prompt}\nคำตอบ:\n${round.answers[q.id] || '(ยังไม่ได้ตอบ)'}\nผลตรวจ: ${round.results[q.id]?.status || 'ยังไม่ตรวจ'}\n`; });
      output += '\n' + '='.repeat(65) + '\n';
    });
    const url = URL.createObjectURL(new Blob(['\ufeff' + output],{type:'text/plain;charset=utf-8'}));
    const a = document.createElement('a'); a.href = url; a.download = 'mysql-sql-exam-answers.txt'; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
  $('clearBtn').addEventListener('click', () => {
    if (!confirm('ล้างคำตอบและผลตรวจของรอบปัจจุบันทั้งหมดหรือไม่?')) return;
    round.answers = {}; round.results = {}; round.submitted = false; delete round.submittedAt;
    persist(); render();
  });
  render();
})();
