"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Mail, Phone, MapPin, ExternalLink, ChevronRight, Download, X, Menu, ArrowUpRight } from "lucide-react";

const Github = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const Linkedin = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);
import { personalInfo, stats, skills, experiences, projects, education } from "@/data/portfolio";

/* ─── Typing animation hook ─── */
function useTypingEffect(words: string[], speed = 80, pause = 1800) {
  const [displayed, setDisplayed] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx <= current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx));
        setCharIdx((c) => c + 1);
      }, speed);
    } else if (!deleting && charIdx > current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx >= 0) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx));
        setCharIdx((c) => c - 1);
      }, speed / 2);
    } else {
      setDeleting(false);
      setWordIdx((w) => (w + 1) % words.length);
    }
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return displayed;
}

/* ─── Reveal on scroll hook ─── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ─── Section component ─── */
function Section({ id, children, className = "", style }: { id: string; children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useReveal();
  return (
    <section id={id} style={style}>
      <div ref={ref} className={`container reveal ${className}`}>
        {children}
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────
   MAIN PAGE
─────────────────────────────────────────────── */
export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [formSent, setFormSent] = useState(false);

  const typedText = useTypingEffect(["Systems Thinker", "Frontend Engineer", "Architecture-Minded", "Security-Aware"]);

  // Nav scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navLinks = ["About", "Experience", "Projects", "Contact"];

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.featured && activeFilter === "Featured") ||
      projects.filter((p) => p.category.toLowerCase().includes(activeFilter.toLowerCase()));

  const filters = ["All", "Featured", "Enterprise SaaS", "Architecture Docs", "Fintech"];

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Construct mailto link
    const subject = `Portfolio Contact from ${formState.name}`;
    const body = `Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`;
    window.location.href = `mailto:${personalInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setFormSent(true);
    setTimeout(() => setFormSent(false), 4000);
  };

  return (
    <>
      {/* ─── NAV ─── */}
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-inner">
          <span className="nav-logo" onClick={() => scrollTo("hero")}>
            MS.
          </span>

          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link}>
                <a href={`#${link.toLowerCase()}`} onClick={(e) => { e.preventDefault(); scrollTo(link.toLowerCase()); }}>
                  {link}
                </a>
              </li>
            ))}
          </ul>

          <div className="nav-cta">
            <a
              href="mailto:muhammedsodiq2018@gmail.com"
              className="btn btn-ghost"
              style={{ fontSize: "13px", padding: "9px 18px" }}
            >
              <Mail size={14} /> Hire Me
            </a>
            <a
              href="/resume.pdf"
              download
              className="btn btn-primary"
              style={{ fontSize: "13px", padding: "9px 18px" }}
            >
              <Download size={14} /> Resume
            </a>
          </div>

          <button className="hamburger" onClick={() => setMenuOpen(true)} aria-label="Open menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* ─── MOBILE MENU ─── */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <button
          onClick={() => setMenuOpen(false)}
          style={{ position: "absolute", top: 24, right: 24, background: "none", border: "none", color: "var(--text-secondary)", cursor: "pointer" }}
          aria-label="Close menu"
        >
          <X size={24} />
        </button>
        {navLinks.map((link) => (
          <a key={link} href={`#${link.toLowerCase()}`} onClick={(e) => { e.preventDefault(); scrollTo(link.toLowerCase()); }}>
            {link}
          </a>
        ))}
        <a href="mailto:muhammedsodiq2018@gmail.com" className="btn btn-primary">
          Hire Me
        </a>
      </div>

      <main>
        {/* ═══════════════════════════════════
            HERO
        ═══════════════════════════════════ */}
        <section id="hero" className="hero">
          <div className="hero-bg">
            <div className="hero-orb hero-orb-1" />
            <div className="hero-orb hero-orb-2" />
            <div className="hero-grid" />
          </div>

          <div className="container" style={{ display: "grid", gridTemplateColumns: "1fr auto", alignItems: "center", gap: "48px", width: "100%" }}>
            {/* Left */}
            <div className="hero-content">
              <div className="hero-badge">
                <span className="hero-badge-dot" />
                {personalInfo.availability}
              </div>

              <h1 className="hero-name">
                <span className="gradient-text">{personalInfo.name.split(" ")[0]}</span>
                <br />
                <span style={{ color: "var(--text-primary)" }}>{personalInfo.name.split(" ")[1]}</span>
              </h1>

              <p className="hero-title">
                <span>{typedText}</span>
                <span className="cursor" />
              </p>

              <p className="hero-description">{personalInfo.bio}</p>

              <div className="hero-actions">
                <button className="btn btn-primary" onClick={() => scrollTo("projects")}>
                  View My Work <ChevronRight size={16} />
                </button>
                <button className="btn btn-ghost" onClick={() => scrollTo("contact")}>
                  Get In Touch
                </button>
              </div>

              <div className="hero-socials">
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="social-link" title="GitHub">
                  <Github size={18} />
                </a>
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="social-link" title="LinkedIn">
                  <Linkedin size={18} />
                </a>
                <a href={`mailto:${personalInfo.email}`} className="social-link" title="Email">
                  <Mail size={18} />
                </a>
              </div>
            </div>

            {/* Right - Avatar */}
            <div className="hero-avatar-section">
              <div className="hero-avatar-ring">
                <div className="hero-avatar-img">
                  <Image src="/avatar.png" alt="Muhammed Sodiq" width={380} height={380} priority />
                </div>

                {/* Float cards */}
                <div className="hero-float-card hero-float-card-1">
                  <div className="float-card-icon">🏗️</div>
                  <div className="float-card-value">10+</div>
                  <div className="float-card-label">Projects Shipped</div>
                </div>

                <div className="hero-float-card hero-float-card-2">
                  <div className="float-card-icon">⚡</div>
                  <div className="float-card-value">95</div>
                  <div className="float-card-label">Lighthouse Score</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════
            STATS
        ═══════════════════════════════════ */}
        <div className="container" style={{ paddingBottom: "80px" }}>
          <div className="stats-grid">
            {stats.map((stat) => (
              <div className="stat-item" key={stat.label}>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════
            ABOUT
        ═══════════════════════════════════ */}
        <Section id="about">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "64px", alignItems: "start" }}>
            {/* Left */}
            <div>
              <p className="section-label">About Me</p>
              <h2 className="section-title">
                Building systems that are{" "}
                <span className="gradient-text">simpler, safer, and reliable</span>
              </h2>
              <p className="section-subtitle" style={{ marginBottom: "24px" }}>
                I&apos;m a software engineer with a Computer Science degree from the University of Lagos, specializing in building production-grade web systems with deliberate architecture, security-aware design, and a relentless focus on simplification.
              </p>
              <p style={{ fontSize: "15px", color: "var(--text-muted)", lineHeight: 1.8, marginBottom: "32px" }}>
                My work bridges the gap between product vision and technical execution — from designing RBAC systems and documenting Architecture Decision Records, to hitting 95 Lighthouse scores under low-bandwidth constraints. I believe the best code is the code you don&apos;t need to write.
              </p>

              {/* Education card */}
              <div className="card" style={{ padding: "24px", background: "var(--bg-card)" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                  <div style={{ fontSize: "32px" }}>🎓</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "16px", marginBottom: "4px" }}>{education.degree}</div>
                    <div style={{ color: "var(--text-secondary)", fontSize: "14px" }}>{education.institution}</div>
                    <div style={{ display: "flex", gap: "12px", marginTop: "10px" }}>
                      <span className="tag">{education.period}</span>
                      <span className="tag tag-emerald">GPA {education.gpa}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Skills */}
            <div>
              <p className="section-label">Technical Stack</p>
              <div className="skills-grid" style={{ marginTop: "8px" }}>
                {skills.map((cat) => (
                  <div key={cat.category} className="card skill-category">
                    <div className="skill-category-name">{cat.category}</div>
                    <div className="skill-items">
                      {cat.items.map((item) => (
                        <span key={item} className="skill-item">{item}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* ═══════════════════════════════════
            EXPERIENCE
        ═══════════════════════════════════ */}
        <Section id="experience" style={{ background: "var(--bg-secondary)" }}>
          <p className="section-label">Experience</p>
          <h2 className="section-title" style={{ marginBottom: "8px" }}>
            Where I&apos;ve built <span className="gradient-text">real things</span>
          </h2>
          <p className="section-subtitle" style={{ marginBottom: "56px" }}>
            Production systems, architectural decisions, and ownership from day one.
          </p>

          <div className="experience-list">
            {experiences.map((exp, i) => (
              <div key={i} className="card experience-card">
                <div className="exp-header">
                  <div>
                    <div className="exp-company">{exp.company}</div>
                    <div className="exp-role">{exp.role}</div>
                  </div>
                  <div className="exp-meta">
                    <div className="exp-period">{exp.period}</div>
                    <div className="exp-type">{exp.type}</div>
                  </div>
                </div>
                <p className="exp-description">{exp.description}</p>
                <ul className="exp-highlights">
                  {exp.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
                <div className="exp-tags">
                  {exp.tags.map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ═══════════════════════════════════
            PROJECTS
        ═══════════════════════════════════ */}
        <Section id="projects">
          <p className="section-label">Projects</p>
          <h2 className="section-title" style={{ marginBottom: "8px" }}>
            Shipped work that <span className="gradient-text">matters</span>
          </h2>
          <p className="section-subtitle" style={{ marginBottom: "40px" }}>
            From enterprise platforms to real-time collaboration tools — all production, all owned end-to-end.
          </p>

          {/* Filters */}
          <div className="projects-filter">
            {filters.map((f) => (
              <button
                key={f}
                className={`filter-btn ${activeFilter === f ? "active" : ""}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="projects-grid">
            {(activeFilter === "All"
              ? projects
              : activeFilter === "Featured"
                ? projects.filter((p) => p.featured)
                : projects.filter((p) =>
                  p.category.toLowerCase().includes(activeFilter.toLowerCase())
                )
            ).map((project, i) => (
              <div key={project.id} className="card project-card">
                {/* Image area */}
                <div className="project-image">
                  <span className="project-number">0{i + 1}</span>
                  {project.featured && (
                    <span className="project-featured-badge">Featured</span>
                  )}
                  <span className="project-image-placeholder">
                    {project.title.slice(0, 2).toUpperCase()}
                  </span>
                  <div className="project-image-overlay">
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                        style={{ fontSize: "13px", padding: "9px 18px" }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={14} /> Live
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-ghost"
                        style={{ fontSize: "13px", padding: "9px 18px", background: "rgba(0,0,0,0.5)" }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github size={14} /> Code
                      </a>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="project-content">
                  <div className="project-category">{project.category}</div>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>

                  <div className="project-metrics">
                    {project.metrics.map((m) => (
                      <span key={m} className="project-metric">{m}</span>
                    ))}
                  </div>

                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>

                  <div className="project-links">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-ghost"
                        style={{ fontSize: "13px", padding: "8px 14px", flex: 1, justifyContent: "center" }}
                      >
                        <Github size={14} /> GitHub
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline"
                        style={{ fontSize: "13px", padding: "8px 14px", flex: 1, justifyContent: "center" }}
                      >
                        <ArrowUpRight size={14} /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* GitHub CTA */}
          <div style={{ textAlign: "center", marginTop: "56px" }}>
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ fontSize: "14px" }}>
              <Github size={16} /> View all repositories on GitHub <ArrowUpRight size={14} />
            </a>
          </div>
        </Section>

        {/* ═══════════════════════════════════
            CONTACT
        ═══════════════════════════════════ */}
        <Section id="contact" style={{ background: "var(--bg-secondary)" } as React.CSSProperties}>
          <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center", marginBottom: "64px" }}>
            <p className="section-label" style={{ justifyContent: "center" }}>Contact</p>
            <h2 className="section-title">
              Let&apos;s build something <span className="gradient-text">remarkable</span>
            </h2>
            <p className="section-subtitle" style={{ margin: "0 auto" }}>
              Open to full-time roles, contract work, and interesting technical conversations. Based in Lagos, Nigeria — open to relocation.
            </p>
          </div>

          <div className="contact-grid">
            {/* Form */}
            <div>
              <form className="contact-form" onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <label className="form-label" htmlFor="name">Name</label>
                  <input
                    id="name"
                    type="text"
                    className="form-input"
                    placeholder="Your name"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    className="form-input"
                    placeholder="your@email.com"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    className="form-textarea"
                    placeholder="Tell me about the role or project..."
                    required
                    value={formState.message}
                    onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
                  />
                </div>
                <button type="submit" className="btn btn-primary" style={{ justifyContent: "center", width: "100%", padding: "14px" }}>
                  {formSent ? "✓ Opening email client..." : "Send Message →"}
                </button>
              </form>
            </div>

            {/* Info */}
            <div className="contact-info">
              <div className="card contact-info-item">
                <div className="contact-info-icon"><Mail size={20} /></div>
                <div>
                  <div className="contact-info-label">Email</div>
                  <a href={`mailto:${personalInfo.email}`} className="contact-info-value" style={{ textDecoration: "none", color: "var(--text-primary)" }}>
                    {personalInfo.email}
                  </a>
                </div>
              </div>

              <div className="card contact-info-item">
                <div className="contact-info-icon"><Phone size={20} /></div>
                <div>
                  <div className="contact-info-label">Phone</div>
                  <div className="contact-info-value">{personalInfo.phone}</div>
                </div>
              </div>

              <div className="card contact-info-item">
                <div className="contact-info-icon"><MapPin size={20} /></div>
                <div>
                  <div className="contact-info-label">Location</div>
                  <div className="contact-info-value">{personalInfo.location} · Open to relocation</div>
                </div>
              </div>

              <div className="card contact-info-item">
                <div className="contact-info-icon"><Github size={20} /></div>
                <div>
                  <div className="contact-info-label">GitHub</div>
                  <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="contact-info-value" style={{ textDecoration: "none", color: "var(--accent-cyan)" }}>
                    github.com/msodiq19 ↗
                  </a>
                </div>
              </div>

              {/* Availability block */}
              <div style={{ padding: "24px", background: "var(--grad-subtle)", border: "1px solid var(--border-active)", borderRadius: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                  <span style={{ width: 8, height: 8, background: "#10b981", borderRadius: "50%", display: "inline-block", animation: "pulse 2s infinite" }} />
                  <span style={{ fontWeight: 600, color: "#34d399", fontSize: "14px" }}>Open to Opportunities</span>
                </div>
                <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                  Actively seeking full-time roles in the UK or EU. Visa sponsorship required. Available for remote work globally.
                </p>
              </div>
            </div>
          </div>
        </Section>
      </main>

      {/* ─── FOOTER ─── */}
      <footer className="footer">
        <div className="container footer-inner">
          <div>
            <span className="nav-logo" style={{ fontSize: "18px", cursor: "default" }}>MS.</span>
            <p className="footer-copy" style={{ marginTop: "6px" }}>
              © 2025 Muhammed Sodiq. Built with Next.js.
            </p>
          </div>
          <div className="footer-links">
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href={`mailto:${personalInfo.email}`}>Email</a>
          </div>
        </div>
      </footer>
    </>
  );
}
