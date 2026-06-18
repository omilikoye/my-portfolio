// === Data ===
const SKILLS = [
  { icon: "🐛", name: "Web Pentesting", items: ["OWASP Top 10", "Burp Suite", "SQLi / XSS", "IDOR"] },
  { icon: "🌐", name: "Networking", items: ["Nmap", "Wireshark", "TCP/IP", "Subnetting"] },
  { icon: "🛡", name: "Recon & OSINT", items: ["Subfinder", "Amass", "Google Dorking"] },
  { icon: "</>", name: "Scripting", items: ["Python", "Bash", "PowerShell (basics)"] },
  { icon: "🔒", name: "Crypto / Hashing", items: ["Hashcat", "John", "RSA basics"] },
  { icon: "🖥", name: "Linux Internals", items: ["Privilege Escalation", "Bash-fu", "Systemd"] },
];

const PROJECTS = [
  { name: "vuln-lab-writeups", desc: "A growing collection of detailed walkthroughs for HTB & THM machines, including methodology and tooling notes.", tags: ["HTB", "THM", "writeups"], severity: "info" },
  { name: "subdomain-sweeper", desc: "Tiny Python recon helper that chains subfinder, dnsx, and httpx to fingerprint live targets.", tags: ["python", "recon", "automation"], severity: "low" },
  { name: "xss-payload-arena", desc: "Self-hosted DVWA-style sandbox to practice reflected, stored, and DOM-based XSS variants.", tags: ["xss", "lab", "docker"], severity: "high" },
  { name: "ad-home-lab", desc: "Documented Active Directory home lab: misconfig chains, BloodHound paths, and Kerberoasting practice.", tags: ["ad", "windows", "bloodhound"], severity: "medium" },
];

const CERTS = [
  { name: "eJPT", org: "INE Security", year: "2025", status: "earned" },
  { name: "CompTIA Security+", org: "CompTIA", year: "2024", status: "earned" },
  { name: "PNPT", org: "TCM Security", year: "2026", status: "in progress" },
  { name: "OSCP", org: "Offensive Security", year: "2027", status: "targeted" },
];

const ACHIEVEMENTS = [
  { icon: "🏆", title: "Top 8% on HackTheBox", detail: "Global rank, 2025 season." },
  { icon: "🚩", title: "1st place — CampusCTF '25", detail: "Captured 14/15 flags in web category." },
  { icon: "🏆", title: "TryHackMe Streak: 180 days", detail: "Daily room solver streak." },
  { icon: "🚩", title: "Responsible disclosure x3", detail: "Reported low-sev bugs on small SaaS apps." },
];

const BLOGS = [
  { title: "Hunting your first IDOR (the boring way)", date: "2026-04-12", read: "6 min" },
  { title: "I solved 50 THM rooms — here's what stuck", date: "2026-03-02", read: "9 min" },
  { title: "Burp Suite tips I wish I knew on day one", date: "2026-01-20", read: "4 min" },
];

// === Render helpers ===
const $ = (sel) => document.querySelector(sel);

function renderSkills() {
  $("#skills-grid").innerHTML = SKILLS.map((s, i) => `
    <div class="card float-up" style="animation-delay:${i * 60}ms">
      <div class="skill-head"><span class="ico">${s.icon}</span><h3>${s.name}</h3></div>
      <ul class="skill-list">${s.items.map(it => `<li>${it}</li>`).join("")}</ul>
    </div>`).join("");
}

function renderProjects() {
  $("#projects-grid").innerHTML = PROJECTS.map((p, i) => `
    <a href="project-details.html?project=${p.name}" class="project float-up" style="animation-delay:${1 * 80}ms">
      <div class="project-head">
        <h3>./${p.name}</h3>
        <span class="sev sev-${p.severity}">sev:${p.severity}</span>
      </div>
      <p class="project-desc">${p.desc}</p>
      <div class="project-tags">${p.tags.map(t => `<span class="tag">#${t}</span>`).join("")}</div>
      <a href="project-details.html?project=${p.name}" class="project-link">read writeup ↗</a>
    </a>`).join("");
}

function renderCerts() {
  $("#certs-grid").innerHTML = CERTS.map((c, i) => `
    <div class="cert float-up" style="animation-delay:${i * 70}ms">
      <span class="award">🏅</span>
      <div class="cert-body">
        <div class="cert-row"><h3>${c.name}</h3><span class="year">${c.year}</span></div>
        <p class="cert-org">${c.org}</p>
        <p class="cert-status">status: <span class="neon">${c.status}</span></p>
      </div>
    </div>`).join("");
}

function renderAchievements() {
  $("#achievements-list").innerHTML = ACHIEVEMENTS.map((a, i) => `
    <li class="float-up" style="animation-delay:${i * 80}ms">
      <span class="bullet">${a.icon}</span>
      <h3>${a.title}</h3>
      <p>${a.detail}</p>
    </li>`).join("");
}

function renderBlogs() {
  $("#blogs-list").innerHTML = BLOGS.map((b, i) => `
    <a href="#" class="blog float-up" style="animation-delay:${i * 70}ms">
      <div class="blog-row"><h3>${b.title}</h3><span class="cyber">↗</span></div>
      <p class="blog-meta">${b.date} · ${b.read} read</p>
    </a>`).join("");
}

// === Typewriter ===
function typewriter() {
  const lines = [
    "$ whoami",
    "koye_omili :: junior penetration tester",
    "$ cat about.txt",
    "I break things (ethically) so you don't have to.",
    "$ ./start_engagement --target you",
  ];
  const body = $("#terminal-body");
  let li = 0, ci = 0, current = "";
  const shown = [];

  function render() {
    body.innerHTML =
      shown.map(l => `<div>${l}</div>`).join("") +
      (li < lines.length ? `<div>${current}<span class="cursor"></span></div>` : "");
  }

  function tick() {
    if (li >= lines.length) { render(); return; }
    const target = lines[li];
    if (ci < target.length) {
      ci++;
      current = target.slice(0, ci);
      render();
      setTimeout(tick, 35);
    } else {
      shown.push(target);
      li++; ci = 0; current = "";
      setTimeout(tick, 250);
    }
  }
  tick();
}

// === Init ===
document.addEventListener("DOMContentLoaded", () => {
  renderSkills();
  renderProjects();
  renderCerts();
  renderAchievements();
  renderBlogs();
  $("#year").textContent = new Date().getFullYear();
  typewriter();
});