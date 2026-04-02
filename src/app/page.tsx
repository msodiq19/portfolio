"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Mail, Phone, MapPin, ExternalLink, ChevronRight, Download, X, Menu, ArrowUpRight, ArrowUp, MessageCircle } from "lucide-react";

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
import { ThemeToggle } from "@/components/ThemeToggle";

/* ─── Typing animation hook ─── */
function useTypingEffect(words: string[], speed = 60, pause = 2200) {
  const [displayed, setDisplayed] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [waiting, setWaiting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (waiting) {
      // Brief pause before typing next word
      timeout = setTimeout(() => setWaiting(false), 400);
    } else if (!deleting && charIdx < current.length) {
      // Typing forward — slightly randomised speed for natural feel
      const jitter = Math.random() * 40;
      timeout = setTimeout(() => {
        setCharIdx((c) => c + 1);
        setDisplayed(current.slice(0, charIdx + 1));
      }, speed + jitter);
    } else if (!deleting && charIdx >= current.length) {
      // Finished typing — hold, then start deleting
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      // Deleting — faster than typing
      timeout = setTimeout(() => {
        setCharIdx((c) => c - 1);
        setDisplayed(current.slice(0, charIdx - 1));
      }, speed / 2.5);
    } else {
      // Fully deleted — move to next word
      setDisplayed("");
      setDeleting(false);
      setCharIdx(0);
      setWordIdx((w) => (w + 1) % words.length);
      setWaiting(true);
    }

    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, waiting, words, speed, pause]);

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
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [formSent, setFormSent] = useState(false);

  const typedText = useTypingEffect([
    "Software Engineer",
    "Frontend Architect",
    "Scalable Systems Builder",
    "Your Next Engineering Hire",
  ]);

  // Nav scroll effect + scroll-to-top visibility
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 400);
    };
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

  const filters = ["All", "Featured", "Enterprise", "Web App"];

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
            <ThemeToggle />
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
        <ThemeToggle />
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

          <div className="container hero-grid-layout">
            {/* Left */}
            <div className="hero-content">
              <div className="hero-badge" onClick={() => scrollTo("contact")} style={{ cursor: "pointer" }}>
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
                  <Image src="/sodiq-muhammed.jpeg" alt="Sodiq Muhammed" width={380} height={380} priority />
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
          <div className="about-grid">
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
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                        style={{ objectFit: "cover" }}
                      />
                    ) : (
                      project.title.slice(0, 2).toUpperCase()
                    )}
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
              Open to full-time roles, contract work, and interesting technical conversations. Based in Lagos, Nigeria — open to relocation to Canada, UK, or EU.
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

              {/* Direct contact buttons */}
              <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
                <p style={{ fontSize: "13px", color: "var(--text-muted)", textAlign: "center", marginBottom: "4px" }}>
                  Or reach out directly
                </p>
                <div style={{ display: "flex", gap: "10px" }}>
                  <a
                    href={`https://wa.me/${personalInfo.phone.replace(/[^\d]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost"
                    style={{ flex: 1, justifyContent: "center", padding: "12px", fontSize: "13px" }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    WhatsApp
                  </a>
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="btn btn-ghost"
                    style={{ flex: 1, justifyContent: "center", padding: "12px", fontSize: "13px" }}
                  >
                    <Mail size={16} />
                    Send Email
                  </a>
                </div>
                <a
                  href={`tel:${personalInfo.phone}`}
                  className="btn btn-ghost"
                  style={{ justifyContent: "center", padding: "12px", fontSize: "13px" }}
                >
                  <Phone size={16} />
                  Call {personalInfo.phone}
                </a>
              </div>
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
                  Actively seeking full-time roles or contract work in Canada, UK, or EU. Visa sponsorship required. Available for remote work globally.
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
              © 2026 Sodiq Muhammed. Built with Next.js.
            </p>
          </div>
          <div className="footer-links">
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href={`mailto:${personalInfo.email}`}>Email</a>
          </div>
        </div>
      </footer>

      {/* ─── SCROLL TO TOP ─── */}
      <button
        className={`fab fab-left ${showScrollTop ? "fab-visible" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </button>

      {/* ─── CONTACT FAB ─── */}
      <div className="fab-contact-wrapper">
        <div className={`fab-contact-menu ${contactOpen ? "fab-contact-open" : ""}`}>
          <a
            href={`https://wa.me/${personalInfo.phone.replace(/[^\d]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="fab-contact-item"
            title="WhatsApp"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            <span>WhatsApp</span>
          </a>
          <a
            href={`tel:${personalInfo.phone}`}
            className="fab-contact-item"
            title="Call"
          >
            <Phone size={20} />
            <span>Call</span>
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            className="fab-contact-item"
            title="Email"
          >
            <Mail size={20} />
            <span>Email</span>
          </a>
        </div>
        <button
          className="fab fab-right fab-visible"
          onClick={() => setContactOpen((o) => !o)}
          aria-label="Contact me"
        >
          {contactOpen ? <X size={20} /> : <MessageCircle size={20} />}
        </button>
      </div>
    </>
  );
}
