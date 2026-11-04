/* Offline holistic SQL rubric: provisional structural assessment, never executes SQL. */
(function(root){
'use strict';
const MAX_SCORE=4;
function tokenize(sql){
 const out=[];let i=0;sql=String(sql??'');
 while(i<sql.length){const rest=sql.slice(i),c=sql[i];
  if(/\s/.test(c)){i++;continue;}
  if(rest.startsWith('--')&&(!rest[2]||/\s/.test(rest[2]))||c==='#'){while(i<sql.length&&sql[i]!=='\n')i++;continue;}
  if(rest.startsWith('/*')){const end=sql.indexOf('*/',i+2);if(end<0)throw Error('คอมเมนต์ยังไม่ปิด');if(sql[i+2]==='!')throw Error('ไม่รองรับ executable comments');i=end+2;continue;}
  if("'\"`".includes(c)){const quote=c;let s=c,closed=false;i++;while(i<sql.length){let x=sql[i++];s+=x;if(x==='\\'&&quote!=='`'&&i<sql.length){s+=sql[i++];continue;}if(x===quote){if(sql[i]===quote){s+=sql[i++];continue;}closed=true;break;}}if(!closed)throw Error('เครื่องหมายคำพูดยังไม่ปิด');out.push(s);continue;}
  const m=rest.match(/^(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?|^[\p{L}_$][\p{L}\p{N}_$]*/u);if(m){out.push(m[0].toUpperCase());i+=m[0].length;continue;}
  const op=['<=>','->>','>=','<=','<>','!=',':=','||','&&','<<','>>','->','=>'].find(x=>rest.startsWith(x));if(op){out.push(op);i+=op.length;continue;}
  if('(),.;*+/%=<>!|&^~?:-'.includes(c)){out.push(c);i++;continue;}
  throw Error('พบอักขระที่ไม่รองรับ: '+c);
 }
 while(out.at(-1)===';')out.pop();return out;
}
function normalizeSQL(s){return tokenize(s).join(' ');}
const COMMANDS=new Set('SELECT INSERT UPDATE DELETE CREATE ALTER DROP TRUNCATE RENAME REPLACE START COMMIT ROLLBACK SAVEPOINT RELEASE SET SHOW EXPLAIN WITH CALL GRANT REVOKE PREPARE EXECUTE DEALLOCATE LOAD LOCK UNLOCK ANALYZE OPTIMIZE'.split(' '));
const CLAUSES=['SELECT','FROM','WHERE','JOIN','LEFT','RIGHT','INNER','GROUP','HAVING','ORDER','LIMIT','OFFSET','INSERT','INTO','VALUES','UPDATE','SET','DELETE','CREATE','ALTER','DROP','TABLE','DATABASE','INDEX','ON','PRIMARY','FOREIGN','REFERENCES','UNIQUE','NOT','NULL','AND','OR','IN','LIKE','BETWEEN','COUNT','SUM','AVG','MAX','MIN','DISTINCT','CASE','WHEN','THEN','ELSE','END','WITH','AS','ROLLBACK','COMMIT','TRANSACTION'];
const critical=new Set(CLAUSES);
const operators=new Set(['>','<','>=','<=','=','<>','!=','<=>','+','-','*','/','%']);
function lcs(a,b){let prev=new Uint16Array(b.length+1);for(let i=1;i<=a.length;i++){let cur=new Uint16Array(b.length+1);for(let j=1;j<=b.length;j++)cur[j]=a[i-1]===b[j-1]?prev[j-1]+1:Math.max(prev[j],cur[j-1]);prev=cur;}return prev[b.length];}
function ratio(a,b){return a.length&&b.length?2*lcs(a,b)/(a.length+b.length):0;}
function normalize(t){return t.filter(x=>x!==';');}
function keyTokens(t){return t.filter(x=>critical.has(x));}
function identifiers(t){return t.filter(x=>/^[A-Z_][A-Z0-9_$]*$/.test(x)&&!critical.has(x)&&!['ASC','DESC','INT','VARCHAR','DECIMAL','BIGINT','DATETIME','AUTO_INCREMENT','ENGINE','INNODB','DEFAULT','CURRENT_TIMESTAMP','UNSIGNED'].includes(x));}
function literals(t){return t.filter(x=>/^['"]/.test(x)||/^\d/.test(x));}
function opTokens(t){return t.filter(x=>operators.has(x));}
function contains(a,x){return a.includes(x);}
function assess(user,expected){
 const exact=user.join('\0')===expected.join('\0');if(exact)return {score:4,similarity:1,feedback:['คำตอบตรงกับเฉลยหลังปรับช่องว่างและตัวพิมพ์ SQL']};
 const sim=ratio(user,expected),a=keyTokens(user),b=keyTokens(expected),structure=ratio(a,b),ids=ratio(identifiers(user),identifiers(expected));
 const commandA=user.find(x=>COMMANDS.has(x)),commandB=expected.find(x=>COMMANDS.has(x));
 const missing=b.filter(x=>!a.includes(x));const notes=[];
 if(commandA!==commandB)notes.push('ชนิดคำสั่งหลักไม่ตรงกับเฉลย');
 if(missing.length)notes.push('ควรตรวจสอบส่วนคำสั่ง: '+[...new Set(missing)].slice(0,6).join(', '));
 if(user.includes('FORM'))notes.push('FORM อาจสะกดผิด ควรใช้ FROM');
 if(user.includes('=>'))notes.push('เครื่องหมายมากกว่าหรือเท่ากับต้องใช้ >=');
 if(['UPDATE','DELETE'].includes(commandA)&&expected.includes('WHERE')&&!user.includes('WHERE'))notes.push('ไม่มี WHERE ซึ่งอาจแก้ไขหรือลบข้อมูลผิดกลุ่ม');
 const sameLiterals=literals(user).join('\0')===literals(expected).join('\0');
 const sameOperators=opTokens(user).join('\0')===opTokens(expected).join('\0');
 if(!sameLiterals)notes.push('ตรวจสอบค่าตัวเลขหรือข้อความในเงื่อนไข');
 if(!sameOperators)notes.push('ตรวจสอบเครื่องหมายเปรียบเทียบและตัวดำเนินการ');
 let score=0;
 if(commandA===commandB){
  if(sim>=.92&&structure>=.9&&ids>=.8&&sameLiterals&&sameOperators)score=3;
  else if(sim>=.68&&structure>=.65&&ids>=.45)score=2;
  else if(sim>=.34||structure>=.4)score=1;
  if(!sameLiterals||!sameOperators)score=Math.min(score,2);
  if(missing.includes('WHERE')&&['UPDATE','DELETE'].includes(commandA))score=Math.min(score,1);
 }else if(sim>=.6&&structure>=.5)score=1;
 if(user.includes('=>')||user.includes('FORM'))score=Math.min(score,1);
 if(!notes.length)notes.push('โครงสร้างใกล้เคียงเฉลย แต่ยังมีความแตกต่างที่ต้องตรวจสอบ');
 return {score,similarity:Number(sim.toFixed(3)),feedback:notes};
}
function gradeAnswer(question,response){
 const answer=String(response??'').trim();const base={questionId:question?.id??null,maxScore:4,answer,correctAnswer:question?.answer||question?.expectedSql||'',explanation:question?.explanation||'',provisional:true,needsReview:true};
 if(!answer)return {...base,score:0,status:'unanswered',provisional:false,needsReview:false,feedback:['ยังไม่ได้กรอกคำตอบ']};
 const refs=[question?.expectedSql,question?.answer,...(Array.isArray(question?.acceptedAnswers)?question.acceptedAnswers:[])].filter(x=>typeof x==='string'&&x.trim());
 if(!refs.length)return {...base,score:0,status:'review',feedback:['ไม่มีเฉลยอ้างอิง']};
 let user;try{user=tokenize(answer);}catch(e){return {...base,score:0,status:'syntax-warning',feedback:[e.message]};}
 if(!COMMANDS.has(user.find(x=>COMMANDS.has(x))))return {...base,score:0,status:'review',feedback:['ไม่พบคำสั่ง SQL ที่รู้จัก']};
 let best=null;
 for(const ref of refs){let expected;try{expected=tokenize(ref);}catch{continue;}
  const result=assess(user,expected);if(!best||result.score>best.score||(result.score===best.score&&result.similarity>best.similarity))best=result;
  if(best.score===4)break;
 }
 if(!best)return {...base,score:0,status:'review',feedback:['เฉลยอ้างอิงไม่อยู่ในรูปแบบ SQL ที่ตรวจได้']};
 return {...base,...best,status:best.score===4?'correct':'partial',provisional:best.score!==4,needsReview:best.score!==4,feedback:best.score===4?best.feedback:[...best.feedback,'คะแนนเป็นการประเมินเบื้องต้นจากโครงสร้าง SQL ไม่ใช่ผลการรัน SQL จริง']};
}
function gradeExam(entries){const results=(entries||[]).map(e=>gradeAnswer(e.question,e.answer));return {results,totalScore:results.reduce((s,r)=>s+r.score,0),maxScore:results.length*4,correctCount:results.filter(r=>r.status==='correct').length,reviewCount:results.filter(r=>r.needsReview).length,provisional:results.some(r=>r.provisional)};}
const api=Object.freeze({MAX_SCORE,tokenize,normalizeSQL,gradeAnswer,gradeExam});root.SQLGrader=api;if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
