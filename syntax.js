/* SQL editor syntax highlighting: textarea remains the real editable control. */
(function(root){
'use strict';
const KEYWORDS=new Set(('SELECT FROM WHERE AND OR NOT IN IS NULL LIKE BETWEEN EXISTS AS DISTINCT ALL JOIN INNER LEFT RIGHT FULL OUTER CROSS ON USING GROUP BY HAVING ORDER ASC DESC LIMIT OFFSET INSERT INTO VALUES UPDATE SET DELETE CREATE TABLE DATABASE ALTER ADD COLUMN DROP TRUNCATE INDEX UNIQUE PRIMARY KEY FOREIGN REFERENCES DEFAULT CHECK CONSTRAINT AUTO_INCREMENT UNSIGNED INT INTEGER BIGINT SMALLINT TINYINT VARCHAR CHAR TEXT DECIMAL FLOAT DOUBLE DATE DATETIME TIMESTAMP BOOLEAN BOOL ENGINE COLLATE CHARACTER START TRANSACTION COMMIT ROLLBACK SAVEPOINT WITH RECURSIVE UNION EXCEPT INTERSECT CASE WHEN THEN ELSE END CAST CONVERT COALESCE IFNULL NULLIF COUNT SUM AVG MIN MAX ROUND NOW CURRENT_TIMESTAMP DATE_FORMAT YEAR MONTH DAY IF SHOW EXPLAIN DESCRIBE USE GRANT REVOKE VIEW PROCEDURE FUNCTION TRIGGER OVER PARTITION ROW_NUMBER RANK DENSE_RANK TRUE FALSE REGEXP HAVING REPLACE IGNORE DUPLICATE KEY SQL_CALC_FOUND_ROWS').split(' '));
const escape=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function highlight(sql){
  const pattern=/(--[^\n]*|#[^\n]*|\/\*[\s\S]*?(?:\*\/|$)|'(?:\\.|''|[^'\\])*'|"(?:\\.|""|[^"\\])*"|`(?:``|[^`])*`|\b(?:\d+(?:\.\d+)?|\.\d+)\b|[\p{L}_$][\p{L}\p{N}_$]*|>=|<=|<>|!=|<=>|:=|[+*/%=<>!-])/gu;
  let result='',last=0,m;
  while((m=pattern.exec(sql))){
    result+=escape(sql.slice(last,m.index));
    const t=m[0]; let kind='';
    if(t.startsWith('--')||t.startsWith('#')||t.startsWith('/*')) kind='comment';
    else if(t[0]==="'"||t[0]==='"') kind='string';
    else if(t[0]==='`') kind='identifier';
    else if(/^\d|^\.\d/.test(t)) kind='number';
    else if(KEYWORDS.has(t.toUpperCase())) kind='keyword';
    else if(/^[+*/%=<>!-]/.test(t)) kind='operator';
    result+=kind?`<span class="sql-${kind}">${escape(t)}</span>`:escape(t);
    last=pattern.lastIndex;
  }
  result+=escape(sql.slice(last));
  return result+'\n'; // ensures last line height and scroll match
}
function attach(textarea){
  if(textarea.parentElement.classList.contains('sql-editor-wrap'))return;
  const wrapper=document.createElement('div');wrapper.className='sql-editor-wrap';
  const backdrop=document.createElement('pre');backdrop.className='sql-editor-highlight';backdrop.setAttribute('aria-hidden','true');
  textarea.parentNode.insertBefore(wrapper,textarea);wrapper.append(backdrop,textarea);
  const update=()=>{backdrop.innerHTML=highlight(textarea.value);};
  const scroll=()=>{backdrop.scrollTop=textarea.scrollTop;backdrop.scrollLeft=textarea.scrollLeft;};
  textarea.addEventListener('input',update);textarea.addEventListener('scroll',scroll,{passive:true});
  update();scroll();
}
root.SQLSyntax={highlight,attach,attachAll:()=>document.querySelectorAll('textarea.answer-editor').forEach(attach)};
})(window);
