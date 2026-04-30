import { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion";
import resumePdf from "./assets/VaidehiGoruputiMarch2026Resume.pdf";

// ── types ──────────────────────────────────────────────────────────────────────
interface StatPillProps { val: string; label: string; color: "blue" | "green" | "purple"; style?: React.CSSProperties; }
interface ProjectCardProps { num: string; title: string; desc: string; tags: { label: string; color?: "blue" | "purple" | "green" }[]; results?: { val: string; label: string }[]; wide?: boolean; }
interface SkillGroupProps { title: string; items: string[]; }
interface ExpItemProps { role: string; period: string; company: string; bullets: string[]; accentColor?: string; glowColor?: string; delay?: number; }

// ── constants ──────────────────────────────────────────────────────────────────
const SKILLS = [
  { title: "Frontend", items: ["React.js", "TypeScript", "Redux", "JavaScript", "HTML5", "CSS3", "Material UI", "Bootstrap"] },
  { title: "Backend & Architecture", items: ["Node.js", "NestJS", "RxJS", "MQTT", "WebSockets", "REST APIs", "Microservices", "Event-Driven"] },
  { title: "Cloud & DevOps", items: ["GCP", "Kubernetes", "Docker", "GitHub Actions", "CI/CD", "GCP Logging"] },
  { title: "Databases", items: ["MongoDB", "MySQL", "Redis"] },
  { title: "Testing", items: ["Jest", "Cypress", "Cucumber (BDD)", "Gherkin"] },
  { title: "Tools", items: ["Git", "Jira", "Postman", "VS Code", "PlantUML"] },
];

const PROJECTS: ProjectCardProps[] = [
  {
    num: "01 — FLAGSHIP PROJECT", title: "NextGen Self-Serve Checkout Platform",
    desc: "Architected and shipped an enterprise-grade retail checkout system at NCR Voyix, handling high-volume real-time transactions across distributed hardware (scanners, PIN pads, cash devices). Built the full stack — React/TypeScript frontend and NestJS microservices backend — within an MQTT event-driven architecture deployed on GCP Kubernetes clusters.",
    tags: [
      { label: "React.js" }, { label: "TypeScript" }, { label: "Redux" },
      { label: "NestJS", color: "purple" }, { label: "Node.js", color: "purple" }, { label: "RxJS", color: "purple" },
      { label: "MQTT", color: "green" }, { label: "Kubernetes", color: "green" }, { label: "GCP", color: "green" },
      { label: "Docker" }, { label: "Cypress (E2E)" },
    ],
    results: [
      { val: "Real-time", label: "Device Integration" },
      { val: "High-volume", label: "Transaction Processing" },
      { val: "BDD", label: "Regression Coverage" },
    ],
    wide: true,
  },
  {
    num: "02 — ENTERPRISE APPS", title: "Insurance & Finance Platforms",
    desc: "Delivered production-grade frontends for major Insurance and Finance clients at Machint Solutions. Built reusable component libraries, Appian integrations, and RESTful API layers serving thousands of users daily.",
    tags: [{ label: "React.js" }, { label: "Redux" }, { label: "REST APIs", color: "purple" }, { label: "Appian", color: "purple" }, { label: "Material UI" }, { label: "Jest" }],
  },
  {
    num: "03 — GOVERNMENT · HEALTH", title: "Takamol & HMIS Systems",
    desc: "Led frontend development for government workforce management (Takamol) and hospital management information systems (HMIS), earning the Best Team award for delivery excellence.",
    tags: [{ label: "React.js" }, { label: "TypeScript" }, { label: "REST APIs", color: "purple" }, { label: "Agile/Scrum", color: "green" }, { label: "Bootstrap" }],
  },
];

// ── animation helpers ──────────────────────────────────────────────────────────
const fadeUp = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } };
const fadeIn  = { hidden: { opacity: 0 },        show: { opacity: 1, transition: { duration: 0.8 } } };
const stagger = (delay = 0) => ({ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: delay } } });

function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: threshold });
  const controls = useAnimation();
  useEffect(() => { if (inView) controls.start("show"); }, [inView, controls]);
  return { ref, controls };
}

// ── sub-components ─────────────────────────────────────────────────────────────
function StatPill({ val, label, color, style }: StatPillProps) {
  const colors = { blue: "#38bdf8", green: "#34d399", purple: "#818cf8" };
  return (
    <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 2 }}
      style={{ position: "absolute", background: "#141920", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "10px 16px", backdropFilter: "blur(10px)", ...style }}>
      <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.1rem", color: colors[color] }}>{val}</div>
      <div style={{ fontSize: ".7rem", color: "#64748b", marginTop: 2 }}>{label}</div>
    </motion.div>
  );
}

function Tag({ label, color = "blue" }: { label: string; color?: "blue" | "purple" | "green" }) {
  const map = {
    blue:   { bg: "rgba(56,189,248,0.07)",   border: "rgba(56,189,248,0.2)",   text: "#38bdf8" },
    purple: { bg: "rgba(129,140,248,0.07)",  border: "rgba(129,140,248,0.2)",  text: "#818cf8" },
    green:  { bg: "rgba(52,211,153,0.07)",   border: "rgba(52,211,153,0.2)",   text: "#34d399" },
  };
  const c = map[color];
  return (
    <span style={{ padding: "4px 10px", borderRadius: 6, background: c.bg, border: `1px solid ${c.border}`, fontSize: ".74rem", color: c.text, fontFamily: "'DM Mono', monospace", letterSpacing: ".03em" }}>
      {label}
    </span>
  );
}

function ProjectCard({ num, title, desc, tags, results, wide }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);
  const { ref, controls } = useReveal();
  return (
    <motion.div ref={ref} initial="hidden" animate={controls} variants={fadeUp}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        gridColumn: wide ? "1 / -1" : undefined,
        background: "#0d1117", border: `1px solid ${hovered ? "rgba(56,189,248,0.3)" : "rgba(255,255,255,0.07)"}`,
        borderRadius: 20, padding: "2.5rem", position: "relative", overflow: "hidden",
        transition: "border-color .3s, transform .3s", transform: hovered ? "translateY(-4px)" : "translateY(0)",
      }}>
      {hovered && (
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at top left, rgba(56,189,248,0.05), transparent 60%)", pointerEvents: "none" }} />
      )}
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: ".74rem", color: "#64748b", marginBottom: "1.5rem" }}>{num}</div>
      <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.35rem", fontWeight: 700, marginBottom: ".8rem", letterSpacing: "-.02em" }}>{title}</h3>
      <p style={{ fontSize: ".88rem", color: "#64748b", lineHeight: 1.7, marginBottom: "1.5rem" }}>{desc}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: ".5rem" }}>
        {tags.map((t, i) => <Tag key={i} label={t.label} color={t.color} />)}
      </div>
      {results && (
        <div style={{ display: "flex", gap: "2rem", marginTop: "1.5rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.07)", flexWrap: "wrap" }}>
          {results.map((r, i) => (
            <div key={i}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.4rem", fontWeight: 700, color: "#34d399" }}>{r.val}</div>
              <div style={{ fontSize: ".76rem", color: "#64748b", marginTop: 2 }}>{r.label}</div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

function SkillGroup({ title, items }: SkillGroupProps) {
  const { ref, controls } = useReveal();
  return (
    <motion.div ref={ref} initial="hidden" animate={controls} variants={fadeUp}
      style={{ background: "#030608", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "1.8rem" }}>
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: ".72rem", color: "#38bdf8", letterSpacing: ".15em", textTransform: "uppercase", marginBottom: "1.2rem" }}>{title}</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: ".5rem" }}>
        {items.map((item, i) => (
          <motion.span key={i} whileHover={{ y: -2, background: "rgba(56,189,248,0.1)", borderColor: "rgba(56,189,248,0.3)", color: "#38bdf8" }}
            style={{ padding: ".35rem .8rem", background: "#141920", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 6, fontSize: ".82rem", color: "#f0f4f8", cursor: "default", transition: "all .2s", display: "inline-block" }}>
            {item}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

function ExpItem({ role, period, company, bullets, accentColor = "#38bdf8", glowColor = "rgba(56,189,248,0.5)", delay = 0 }: ExpItemProps) {
  const { ref, controls } = useReveal();
  return (
    <motion.div ref={ref} initial={{ opacity: 0, x: -20 }} animate={controls} variants={{ show: { opacity: 1, x: 0, transition: { duration: .6, delay } } }}
      style={{ position: "relative", marginBottom: "3.5rem" }}>
      <div style={{ position: "absolute", left: "-2.5rem", width: 10, height: 10, borderRadius: "50%", background: accentColor, marginTop: 6, boxShadow: `0 0 12px ${glowColor}` }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: ".5rem", marginBottom: ".5rem" }}>
        <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.2rem", fontWeight: 700 }}>{role}</h3>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: ".76rem", color: "#64748b", padding: ".25rem .75rem", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 100 }}>{period}</span>
      </div>
      <div style={{ fontSize: ".88rem", color: accentColor, marginBottom: "1rem" }}>{company}</div>
      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: ".6rem" }}>
        {bullets.map((b, i) => (
          <li key={i} style={{ fontSize: ".87rem", color: "#64748b", lineHeight: 1.65, paddingLeft: "1.2rem", position: "relative" }}>
            <span style={{ position: "absolute", left: 0, color: accentColor, fontSize: ".72rem", top: ".12rem" }}>→</span>
            {b}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / 40;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); return; }
      setCount(Math.floor(start));
    }, 30);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <div ref={ref} style={{ fontFamily: "'Syne', sans-serif", fontSize: "3rem", fontWeight: 800, background: "linear-gradient(135deg,#38bdf8,#818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{count}{suffix}</div>;
}

// ── global styles injected once ────────────────────────────────────────────────
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&family=DM+Mono:wght@400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: 'DM Sans', sans-serif; background: #030608; color: #f0f4f8; overflow-x: hidden; cursor: none; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #030608; }
  ::-webkit-scrollbar-thumb { background: #64748b; border-radius: 2px; }
  @keyframes pulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:.5; transform:scale(1.4); } }
  @keyframes rotateBorder { 0%{background:linear-gradient(0deg,#38bdf8,#818cf8)} 50%{background:linear-gradient(180deg,#818cf8,#34d399)} 100%{background:linear-gradient(360deg,#38bdf8,#818cf8)} }
  .avatar-ring { animation: rotateBorder 6s linear infinite; }
  @keyframes slideDown { from { transform:translateY(-100%); opacity:0; } to { transform:translateY(0); opacity:1; } }
  nav { animation: slideDown .6s ease both; }
`;

export default function App() {
  const cursorRef  = useRef<HTMLDivElement>(null);
  const ringRef    = useRef<HTMLDivElement>(null);
  const rxRef      = useRef(0);
  const ryRef      = useRef(0);
  const mxRef      = useRef(0);
  const myRef      = useRef(0);
  const rafRef     = useRef<number>(0);
  const [menuOpen, setMenuOpen] = useState(false);

  // cursor
  useEffect(() => {
    const move = (e: MouseEvent) => { mxRef.current = e.clientX; myRef.current = e.clientY; };
    document.addEventListener("mousemove", move);
    const tick = () => {
      if (cursorRef.current) { cursorRef.current.style.left = mxRef.current + "px"; cursorRef.current.style.top = myRef.current + "px"; }
      rxRef.current += (mxRef.current - rxRef.current) * 0.12;
      ryRef.current += (myRef.current - ryRef.current) * 0.12;
      if (ringRef.current) { ringRef.current.style.left = rxRef.current + "px"; ringRef.current.style.top = ryRef.current + "px"; }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { document.removeEventListener("mousemove", move); cancelAnimationFrame(rafRef.current); };
  }, []);

  const cursorEnter = () => { if (cursorRef.current) { cursorRef.current.style.width = "20px"; cursorRef.current.style.height = "20px"; } if (ringRef.current) { ringRef.current.style.width = "60px"; ringRef.current.style.height = "60px"; } };
  const cursorLeave = () => { if (cursorRef.current) { cursorRef.current.style.width = "12px"; cursorRef.current.style.height = "12px"; } if (ringRef.current) { ringRef.current.style.width = "40px"; ringRef.current.style.height = "40px"; } };

  const navLinks = ["#work", "#skills", "#experience", "#contact"];
  const navLabels = ["Work", "Skills", "Experience", "Contact"];

  return (
    <>
      <style>{GLOBAL_CSS}</style>

      {/* CURSOR */}
      <div ref={cursorRef} style={{ position: "fixed", top: 0, left: 0, width: 12, height: 12, background: "#38bdf8", borderRadius: "50%", pointerEvents: "none", zIndex: 9999, transform: "translate(-50%,-50%)", transition: "width .2s, height .2s", mixBlendMode: "screen" }} />
      <div ref={ringRef} style={{ position: "fixed", top: 0, left: 0, width: 40, height: 40, border: "1.5px solid rgba(56,189,248,0.5)", borderRadius: "50%", pointerEvents: "none", zIndex: 9998, transform: "translate(-50%,-50%)", transition: "width .25s, height .25s" }} />

      {/* NOISE */}
      <div style={{ position: "fixed", inset: 0, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`, pointerEvents: "none", zIndex: 1, opacity: .4 }} />

      {/* ORBs */}
      <div style={{ position: "fixed", width: 600, height: 600, borderRadius: "50%", background: "rgba(56,189,248,0.07)", filter: "blur(120px)", top: -200, left: -200, pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", width: 500, height: 500, borderRadius: "50%", background: "rgba(129,140,248,0.06)", filter: "blur(120px)", bottom: 0, right: -200, pointerEvents: "none", zIndex: 0 }} />

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0 6vw", height: 70, display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(3,6,8,0.75)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.1rem", background: "linear-gradient(135deg,#38bdf8,#818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>VG.</div>
        <ul style={{ display: "flex", gap: "2.5rem", listStyle: "none" }}>
          {navLinks.map((href, i) => (
            <li key={i} onMouseEnter={cursorEnter} onMouseLeave={cursorLeave}>
              <a href={href} style={{ fontSize: ".83rem", fontWeight: 400, letterSpacing: ".08em", textTransform: "uppercase", color: "#64748b", textDecoration: "none" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#f0f4f8")} onMouseLeave={e => (e.currentTarget.style.color = "#64748b")}>
                {navLabels[i]}
              </a>
            </li>
          ))}
        </ul>
        <a href="mailto:vaidehig94@gmail.com" onMouseEnter={cursorEnter} onMouseLeave={cursorLeave}
          style={{ padding: ".5rem 1.2rem", border: "1px solid rgba(56,189,248,0.3)", borderRadius: 6, fontSize: ".82rem", fontWeight: 500, color: "#38bdf8", textDecoration: "none", letterSpacing: ".05em", transition: "background .2s, box-shadow .2s" }}
          onMouseOver={e => { e.currentTarget.style.background = "rgba(56,189,248,0.1)"; e.currentTarget.style.boxShadow = "0 0 20px rgba(56,189,248,0.15)"; }}
          onMouseOut={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.boxShadow = "none"; }}>
          Hire Me →
        </a>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "center", padding: "120px 8vw 80px", gap: "4rem", position: "relative", zIndex: 2 }}>
        <div>
          <motion.div variants={stagger(0.2)} initial="hidden" animate="show">
            <motion.div variants={fadeUp} style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", padding: ".35rem 1rem", borderRadius: 100, border: "1px solid rgba(56,189,248,0.25)", background: "rgba(56,189,248,0.06)", fontSize: ".76rem", letterSpacing: ".1em", textTransform: "uppercase" as const, color: "#38bdf8", marginBottom: "1.5rem" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#34d399", display: "inline-block", animation: "pulse 2s infinite" }} />
              Open to Product Companies
            </motion.div>

            <motion.h1 variants={fadeUp} style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(3rem, 7vw, 5.5rem)", fontWeight: 800, lineHeight: 1, letterSpacing: "-.04em" }}>
              Vaidehi
              <span style={{ display: "block", background: "linear-gradient(135deg,#38bdf8,#818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Goruputi</span>
            </motion.h1>

            <motion.p variants={fadeUp} style={{ fontSize: "1rem", color: "#64748b", marginTop: "1.2rem", fontWeight: 300, lineHeight: 1.8, maxWidth: 440 }}>
              Software Engineer II · 5+ years building scalable React frontends & event-driven microservices. From enterprise checkout systems to distributed cloud platforms.
            </motion.p>

            <motion.div variants={fadeUp} style={{ display: "flex", gap: "1rem", marginTop: "2.5rem" }}>
              <a href="#work" onMouseEnter={cursorEnter} onMouseLeave={cursorLeave}
                style={{ padding: ".8rem 2rem", borderRadius: 8, background: "linear-gradient(135deg,#38bdf8,#818cf8)", color: "#fff", fontWeight: 500, fontSize: ".9rem", textDecoration: "none", transition: "transform .2s, box-shadow .2s" }}
                onMouseOver={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(56,189,248,0.25)"; }}
                onMouseOut={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
                View Work
              </a>
              <a href={resumePdf} target="_blank" rel="noreferrer" onMouseEnter={cursorEnter} onMouseLeave={cursorLeave}
                style={{ padding: ".8rem 2rem", borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)", color: "#64748b", fontSize: ".9rem", textDecoration: "none", transition: "border-color .2s, color .2s" }}
                onMouseOver={e => { e.currentTarget.style.borderColor = "rgba(56,189,248,0.3)"; e.currentTarget.style.color = "#f0f4f8"; }}
                onMouseOut={e => { e.currentTarget.style.borderColor = ""; e.currentTarget.style.color = "#64748b"; }}>
                Resume ↗
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* AVATAR */}
        <motion.div variants={fadeIn} initial="hidden" animate="show" style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ position: "relative", width: 340, height: 340 }}>
            <div className="avatar-ring" style={{ position: "absolute", inset: -2, borderRadius: 32, padding: 2, background: "linear-gradient(135deg,#38bdf8,#818cf8)" }}>
              <div style={{ width: "100%", height: "100%", borderRadius: 30, background: "#141920", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: ".5rem" }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "5rem", fontWeight: 800, background: "linear-gradient(135deg,#38bdf8,#818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>VG</div>
                <div style={{ fontSize: ".78rem", color: "#64748b", letterSpacing: ".1em" }}>SDE-2 · Hyderabad</div>
              </div>
            </div>
            <StatPill val="5+" label="Yrs React" color="blue"  style={{ top: -10, right: -30 }} />
            <StatPill val="25%" label="Perf Gain" color="green" style={{ bottom: 30, left: -40 }} />
            <StatPill val="K8s" label="Deployed"  color="purple" style={{ bottom: -10, right: -20 }} />
          </div>
        </motion.div>
      </section>

      {/* STATS BAR */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1, background: "rgba(255,255,255,0.07)", borderTop: "1px solid rgba(255,255,255,0.07)", borderBottom: "1px solid rgba(255,255,255,0.07)", position: "relative", zIndex: 2 }}>
        {[{ t: 5, s: "+", l: "Years of Experience" }, { t: 25, s: "%", l: "Performance Improvement" }, { t: 30, s: "%", l: "Error Reduction" }, { t: 5, s: "+", l: "Enterprise Domains" }].map((item, i) => (
          <div key={i} style={{ padding: "2.5rem", background: "#030608", textAlign: "center" }}>
            <Counter target={item.t} suffix={item.s} />
            <div style={{ fontSize: ".78rem", color: "#64748b", marginTop: ".5rem", letterSpacing: ".04em" }}>{item.l}</div>
          </div>
        ))}
      </div>

      {/* WORK */}
      <section id="work" style={{ padding: "7rem 8vw", position: "relative", zIndex: 2 }}>
        <motion.div {...useRevealProps()} style={{ fontFamily: "'DM Mono', monospace", fontSize: ".72rem", color: "#38bdf8", letterSpacing: ".2em", textTransform: "uppercase" as const, marginBottom: "1rem" }}>// selected work</motion.div>
        <motion.h2 {...useRevealProps(0.1)} style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 800, letterSpacing: "-.03em", marginBottom: "3rem" }}>What I've Built</motion.h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
          {PROJECTS.map((p, i) => <ProjectCard key={i} {...p} />)}
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{ padding: "7rem 8vw", background: "#0d1117", borderTop: "1px solid rgba(255,255,255,0.07)", borderBottom: "1px solid rgba(255,255,255,0.07)", position: "relative", zIndex: 2 }}>
        <motion.div {...useRevealProps()} style={{ fontFamily: "'DM Mono', monospace", fontSize: ".72rem", color: "#38bdf8", letterSpacing: ".2em", textTransform: "uppercase" as const, marginBottom: "1rem" }}>// technical skills</motion.div>
        <motion.h2 {...useRevealProps(0.1)} style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 800, letterSpacing: "-.03em", marginBottom: "3rem" }}>My Stack</motion.h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.5rem" }}>
          {SKILLS.map((s, i) => <SkillGroup key={i} {...s} />)}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" style={{ padding: "7rem 8vw", position: "relative", zIndex: 2 }}>
        <motion.div {...useRevealProps()} style={{ fontFamily: "'DM Mono', monospace", fontSize: ".72rem", color: "#38bdf8", letterSpacing: ".2em", textTransform: "uppercase" as const, marginBottom: "1rem" }}>// career timeline</motion.div>
        <motion.h2 {...useRevealProps(0.1)} style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 800, letterSpacing: "-.03em", marginBottom: "2.5rem" }}>Experience</motion.h2>

        {/* Awards */}
        <motion.div {...useRevealProps(0.15)} style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", marginBottom: "3rem" }}>
          {[{ icon: "🏆", text: "Tech Genie Award — Technical Excellence" }, { icon: "🥇", text: "Best Team Award — Takamol Project" }].map((a, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: ".7rem", padding: ".7rem 1.2rem", borderRadius: 10, border: "1px solid rgba(52,211,153,0.2)", background: "rgba(52,211,153,0.05)" }}>
              <span>{a.icon}</span>
              <span style={{ fontSize: ".82rem", color: "#34d399", fontWeight: 500 }}>{a.text}</span>
            </div>
          ))}
        </motion.div>

        <div style={{ position: "relative", paddingLeft: "2.5rem" }}>
          <div style={{ position: "absolute", left: 0, top: 8, bottom: 0, width: 1, background: "rgba(255,255,255,0.07)" }} />
          <ExpItem
            role="Software Engineer II (SDE-2)"
            period="Jan 2025 – Feb 2026"
            company="NCR Voyix · Hyderabad · Retail Domain"
            accentColor="#38bdf8"
            glowColor="rgba(56,189,248,0.5)"
            bullets={[
              "Designed end-to-end features across React/TypeScript frontend and NestJS microservices backend within an MQTT-based event-driven architecture",
              "Spearheaded development of NextGen Self-Serve Checkout (SCO) systems for high-volume retail transactions in distributed environments",
              "Implemented asynchronous device communication via MQTT — scanner, cash devices, PIN pads — and inter-service messaging",
              "Built and deployed containerized microservices on GCP Kubernetes clusters with high availability and resilience",
              "Created architectural documentation using PlantUML sequence and component diagrams",
              "Automated validation with Cucumber (BDD) and Cypress E2E for full regression coverage",
              "Leveraged GCP Logging & Monitoring for production performance tuning and proactive issue resolution",
            ]}
          />
          <ExpItem
            role="Senior Associate — React JS Developer"
            period="Feb 2021 – Jan 2025"
            company="Machint Solutions · Hyderabad"
            accentColor="#818cf8"
            glowColor="rgba(129,140,248,0.5)"
            delay={0.15}
            bullets={[
              "Delivered enterprise frontend applications across Insurance, Government, Healthcare, and Finance domains",
              "Designed and implemented scalable, reusable UI components with React JS, Redux, TypeScript for high development efficiency",
              "Integrated RESTful APIs and Appian services for dynamic, data-driven critical business applications",
              "Achieved 25% improvement in application speed and 30% reduction in system errors through refactoring and optimization",
              "Ensured cross-browser compatibility and fully responsive designs across all devices and platforms",
              "Collaborated in full Agile cycles including sprint planning, stand-ups, retrospectives, and releases",
            ]}
          />
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "7rem 8vw", textAlign: "center", background: "#0d1117", borderTop: "1px solid rgba(255,255,255,0.07)", position: "relative", zIndex: 2 }}>
        <motion.div {...useRevealProps()} style={{ fontFamily: "'DM Mono', monospace", fontSize: ".72rem", color: "#38bdf8", letterSpacing: ".2em", textTransform: "uppercase" as const, marginBottom: "1rem" }}>// get in touch</motion.div>
        <motion.h2 {...useRevealProps(0.1)} style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2.5rem,5vw,4rem)", fontWeight: 800, letterSpacing: "-.04em", marginBottom: "1rem" }}>
          Let's Build
          <span style={{ display: "block", background: "linear-gradient(135deg,#38bdf8,#818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Something Great</span>
        </motion.h2>
        <motion.p {...useRevealProps(0.15)} style={{ fontSize: "1rem", color: "#64748b", maxWidth: 480, margin: "0 auto 2.5rem", lineHeight: 1.8 }}>
          Actively looking for opportunities at product-based companies. Full-stack, frontend, or system design — let's talk.
        </motion.p>
        <motion.div {...useRevealProps(0.2)} style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
          {[
            { href: "mailto:vaidehig94@gmail.com", label: "vaidehig94@gmail.com" },
            { href: "tel:+918309803518", label: "+91 8309803518" },
            { href: "https://linkedin.com/in/vaidehi-goruputi", label: "LinkedIn", target: "_blank" },
            { href: "https://github.com/vaidehi-goruputi", label: "GitHub", target: "_blank" },
          ].map((link, i) => (
            <a key={i} href={link.href} target={link.target} rel={link.target ? "noreferrer" : undefined}
              onMouseEnter={cursorEnter} onMouseLeave={cursorLeave}
              style={{ display: "flex", alignItems: "center", gap: ".6rem", padding: ".8rem 1.6rem", borderRadius: 10, border: "1px solid rgba(255,255,255,0.07)", background: "#030608", fontSize: ".88rem", color: "#f0f4f8", textDecoration: "none", transition: "all .2s" }}
              onMouseOver={e => { e.currentTarget.style.borderColor = "rgba(56,189,248,0.3)"; e.currentTarget.style.background = "rgba(56,189,248,0.07)"; e.currentTarget.style.color = "#38bdf8"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseOut={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.background = "#030608"; e.currentTarget.style.color = "#f0f4f8"; e.currentTarget.style.transform = ""; }}>
              {link.label}
            </a>
          ))}
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer style={{ textAlign: "center", padding: "2rem", fontSize: ".76rem", color: "#64748b", borderTop: "1px solid rgba(255,255,255,0.07)", position: "relative", zIndex: 2 }}>
        Crafted with precision by <span style={{ color: "#38bdf8" }}>Vaidehi Goruputi</span> · SDE-2 · Hyderabad, India
      </footer>
    </>
  );
}

// ── hook helper to avoid repeated boilerplate ──────────────────────────────────
function useRevealProps(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  return {
    ref,
    initial: "hidden",
    animate: inView ? "show" : "hidden",
    variants: { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: .7, delay, ease: [0.22, 1, 0.36, 1] } } },
  } as const;
}
