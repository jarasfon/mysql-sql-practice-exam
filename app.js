const STORAGE_KEY = "mysql_sql_exam_answers_v1";
let answers = {};
try { answers = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); } catch (_) { answers = {}; }

const container = document.getElementById("examContainer");
const nav = document.getElementById("sectionNav");

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
}
function difficultyClass(level) {
  return ({Easy:"easy", Medium:"medium", Hard:"hard", Advanced:"advanced"})[level] || "medium";
}
function render() {
  nav.innerHTML = "";
  container.innerHTML = "";
  examSections.forEach((section, sIndex) => {
    const navBtn = document.createElement("button");
    navBtn.className = "btn btn-sm btn-outline-primary section-nav-btn";
    navBtn.textContent = `ข้อ ${sIndex + 1}`;
    navBtn.addEventListener("click", () => document.getElementById(`section-${sIndex}`).scrollIntoView({behavior:"smooth", block:"start"}));
    nav.appendChild(navBtn);

    const sectionEl = document.createElement("section");
    sectionEl.id = `section-${sIndex}`;
    sectionEl.innerHTML = `
      <div class="section-heading">
        <div class="d-flex flex-wrap justify-content-between align-items-start gap-2">
          <div><div class="small text-primary fw-bold">SECTION ${String(sIndex+1).padStart(2,"0")}</div>
          <h3 class="h5 fw-bold mb-1">${escapeHtml(section.title)}</h3>
          <p class="mb-0">${escapeHtml(section.intro)}</p></div>
          <span class="badge text-bg-primary">20 คะแนน</span>
        </div>
      </div>
      <div class="schema-box mb-3">${escapeHtml(section.schema)}</div>
    `;
    section.items.forEach((item, qIndex) => {
      const id = `${sIndex}-${qIndex}`;
      const card = document.createElement("article");
      card.className = "card question-card";
      card.innerHTML = `
        <div class="card-header d-flex justify-content-between align-items-center gap-2">
          <div class="question-title">ข้อ ${sIndex+1}.${qIndex+1} <span class="text-secondary fw-normal small">(${4} คะแนน)</span></div>
          <span class="difficulty ${difficultyClass(item[0])}">${escapeHtml(item[0])}</span>
        </div>
        <div class="card-body">
          <p class="mb-3">${escapeHtml(item[1])}</p>
          <label class="answer-label" for="answer-${id}">คำตอบของคุณ</label>
          <textarea class="answer-editor" id="answer-${id}" data-id="${id}" spellcheck="false" placeholder="เขียนคำสั่ง SQL หรืออธิบายคำตอบที่นี่...">${escapeHtml(answers[id] || "")}</textarea>
          <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mt-2">
            <span class="small text-secondary save-status" id="status-${id}">บันทึกอัตโนมัติ</span>
            <button class="btn btn-sm btn-outline-success solution-toggle" type="button" data-target="solution-${id}">ดูเฉลย</button>
          </div>
          <div class="solution d-none" id="solution-${id}">
            <div class="fw-bold text-success mb-2">แนวคำตอบ</div>
            <pre>${escapeHtml(item[2])}</pre>
            <p><strong>คำอธิบาย:</strong> ${escapeHtml(item[3])}</p>
          </div>
        </div>`;
      sectionEl.appendChild(card);
    });
    container.appendChild(sectionEl);
  });

  document.querySelectorAll(".answer-editor").forEach(area => {
    area.addEventListener("input", event => {
      const id = event.target.dataset.id;
      answers[id] = event.target.value;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
      const status = document.getElementById(`status-${id}`);
      if (status) status.textContent = "บันทึกแล้ว";
      updateProgress();
    });
  });
  document.querySelectorAll(".solution-toggle").forEach(button => {
    button.addEventListener("click", () => {
      const target = document.getElementById(button.dataset.target);
      const isHidden = target.classList.toggle("d-none");
      button.textContent = isHidden ? "ดูเฉลย" : "ซ่อนเฉลย";
    });
  });
  updateProgress();
}
function updateProgress() {
  const count = Object.values(answers).filter(value => String(value).trim().length > 0).length;
  document.getElementById("answeredCount").textContent = `${count} / 25`;
  document.getElementById("completionText").textContent = `${count} จาก 25 ข้อ`;
  document.getElementById("progressBar").style.width = `${count / 25 * 100}%`;
}
document.getElementById("exportBtn").addEventListener("click", () => {
  let output = "คำตอบชุดข้อสอบ MySQL & SQL\\n\\n";
  examSections.forEach((section, s) => {
    output += `ข้อใหญ่ ${s+1}: ${section.title}\\n`;
    section.items.forEach((item, q) => {
      const id = `${s}-${q}`;
      output += `\\nข้อ ${s+1}.${q+1}\\nโจทย์: ${item[1]}\\nคำตอบ:\\n${answers[id] || "(ยังไม่ได้ตอบ)"}\\n`;
    });
    output += "\\n" + "=".repeat(65) + "\\n";
  });
  const blob = new Blob(["\\ufeff" + output], {type:"text/plain;charset=utf-8"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = "mysql-sql-exam-answers.txt"; a.click();
  URL.revokeObjectURL(url);
});
document.getElementById("clearBtn").addEventListener("click", () => {
  if (!confirm("ยืนยันล้างคำตอบทั้งหมดหรือไม่? การดำเนินการนี้ไม่สามารถย้อนกลับได้")) return;
  answers = {};
  localStorage.removeItem(STORAGE_KEY);
  render();
});
render();
