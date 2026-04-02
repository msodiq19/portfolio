export const personalInfo = {
    name: "Sodiq Muhammed",
    title: "Software Engineer",
    tagline: "Systems · Architecture · Security-Minded",
    bio: "Software engineer with a strong computer science foundation and a bias toward first-principles reasoning. I design simple, scalable systems by making deliberate architectural and security tradeoffs, taking ownership from problem definition through execution.",
    location: "Lagos, Nigeria",
    email: "muhammedsodiq2018@gmail.com",
    phone: "+234 813 508 4641",
    github: "https://github.com/msodiq19",
    linkedin: "https://linkedin.com/in/sodiq19",
    availability: "Open to opportunities",
};

export const stats = [
    { value: "3+", label: "Years Experience" },
    { value: "10+", label: "Projects Shipped" },
    { value: "5+", label: "Happy Clients" },
    { value: "15+", label: "Technologies" },
];

export const skills = [
    { category: "Languages", items: ["TypeScript", "JavaScript", "Python", "PHP"] },
    {
        category: "Frontend",
        items: ["React", "Next.js", "Vue.js", "Nuxt.js", "HTML5", "CSS3/SCSS"],
    },
    {
        category: "Architecture",
        items: ["System Design", "RBAC", "OAuth2", "REST APIs", "ADR", "Service Boundaries"],
    },
    {
        category: "Backend & Infra",
        items: ["Node.js", "Laravel", "Docker", "CI/CD", "Firebase", "Supabase"],
    },
    {
        category: "Tools",
        items: ["Git", "Figma", "Redux", "SWR", "React Query", "Zustand"],
    },
];

export const experiences = [
    {
        company: "4Runner Global Services",
        role: "Software Engineer",
        period: "2022 – 2023, 2026 – Present",
        type: "Client Project · Remote",
        description:
            "Initially built the web presence for 4Runner Global Services in 2022. Returned in 2026 to rebuild with a modern internal operations dashboard and redesigned landing page.",
        highlights: [
            "Built original web platform in 2022–2023",
            "Returned in 2026 to redesign and rebuild from scratch",
            "Building internal dashboard for managing operations and service delivery",
            "Developed responsive landing page driving client acquisition",
            "End-to-end ownership from UI/UX to deployment",
        ],
        tags: ["Next.js", "TypeScript", "Dashboard", "Landing Page"],
    },
    {
        company: "Simestra",
        role: "Software Engineer",
        period: "2025",
        type: "Client Project · Remote",
        description:
            "Architected and built a production-grade marketing automation system used by enterprise clients. Led architectural decisions from service layer separation to RBAC design.",
        highlights: [
            "Designed layered architecture reducing API coupling by ~60%",
            "Migrated Redux to SWR after tradeoff analysis, cutting boilerplate by ~85%",
            "Implemented fine-grained RBAC across 15+ resource types",
            "Authored Architecture Decision Records (ADRs) for future evolution",
            "Achieved ~70% coverage on critical flows via integration testing",
        ],
        tags: ["React", "TypeScript", "RBAC", "OAuth2", "ADR"],
    },
    {
        company: "Excellent Link Academy",
        role: "Software Engineer",
        period: "2025",
        type: "Contract · Lagos",
        description:
            "Built an e-learning platform optimized for low-bandwidth and mobile-first environments, achieving a 95 Lighthouse score on slow 3G connections.",
        highlights: [
            "Achieved 95 Lighthouse score on mobile networks",
            "Implemented SEO-friendly SSR while maintaining CSR flexibility",
            "Reduced redundant API calls by ~40% via smart caching strategies",
            "Mobile-first responsive design across all device sizes",
        ],
        tags: ["Next.js", "SSR", "Performance", "SEO", "TypeScript"],
    },
    {
        company: "QuantumSphere Technologies",
        role: "Software Engineer",
        period: "2023 – 2024",
        type: "Remote Contract",
        description:
            "Led frontend development of an internal admin dashboard for a fintech platform, integrating multiple backend services and stabilizing API contracts.",
        highlights: [
            "Led development of admin dashboard integrating multiple REST APIs",
            "Defined stable API contracts with backend engineers",
            "Set up CI/CD pipelines reducing manual deployment errors",
            "Participated in code reviews in a fully remote team",
        ],
        tags: ["React", "REST APIs", "CI/CD", "Docker", "Fintech"],
    },
];

export const projects = [
    {
        id: 1,
        title: "Simestra Marketing Platform",
        category: "Enterprise SaaS",
        description:
            "Production-grade marketing automation system for enterprise clients. Built with strict service boundaries, fine-grained RBAC, and comprehensive Architecture Decision Records.",
        longDescription:
            "A complex enterprise marketing platform with layered architecture, OAuth security model, RBAC across 15+ resource types, and full ADR documentation covering tradeoffs and evolution paths.",
        tags: ["React", "TypeScript", "RBAC", "OAuth2", "SWR"],
        image: "/Simestra.jpg",
        github: "https://github.com/msodiq19",
        live: null,
        featured: true,
        metrics: ["~60% API coupling reduction", "~85% boilerplate reduction", "~70% test coverage"],
    },
    {
        id: 2,
        title: "Marketing Platform Architecture",
        category: "Architecture Docs",
        description:
            "12,000-word architectural case study documenting 5 key decisions including service layer separation, state management strategy, and RBAC permission design with ADRs.",
        longDescription:
            "Comprehensive architectural documentation demonstrating senior-level system design thinking. Covers tradeoffs, rejected alternatives, OAuth security model, and future evolution paths.",
        tags: ["System Design", "ADR", "Technical Writing", "Architecture"],
        image: "/Simestra.jpg",
        github: "https://github.com/msodiq19/marketing-platform-architecture",
        live: "https://github.com/msodiq19/marketing-platform-architecture",
        featured: true,
        metrics: ["5 architectural decisions", "12,000+ word case study", "Published ADRs"],
    },
    {
        id: 3,
        title: "4Runner Global Services",
        category: "Enterprise",
        description:
            "Internal operations dashboard and public landing page for 4Runner Global Services. Originally built in 2022, now being rebuilt in 2026 with a modern stack and improved UX.",
        longDescription:
            "Long-standing client relationship — first built the web platform in 2022–2023, then returned in 2026 to modernize the internal dashboard and redesign the landing page from scratch.",
        tags: ["Next.js", "TypeScript", "Dashboard", "Landing Page"],
        image: "/4Runner-Global-Services.png",
        github: "https://github.com/msodiq19",
        live: null,
        featured: true,
        metrics: ["Internal dashboard", "Landing page", "Active development"],
    },
    {
        id: 4,
        title: "Res3archSync Platform",
        category: "Hackathon · Real-time",
        description:
            "Real-time academic co-authoring platform built during a hackathon. Uses CRDTs (Yjs) and WebSockets for collaborative editing with JWT-secured multi-user sessions.",
        longDescription:
            "Collaborative research platform architected around CRDTs for conflict-free real-time editing. Balances consistency, latency, and complexity with a focus on practical offline-first patterns.",
        tags: ["React", "WebSockets", "CRDTs", "Yjs", "JWT"],
        image: "/research-sync.png",
        github: "https://github.com/msodiq19",
        live: null,
        featured: true,
        metrics: ["Real-time collaboration", "CRDT-based sync", "JWT sessions"],
    },
    {
        id: 5,
        title: "Last Message",
        category: "Web App",
        description:
            "A zero-knowledge privacy tool — a dead-man's-switch messaging system where the server never sees plaintext data. All encryption happens client-side using AES-GCM via the Web Crypto API.",
        longDescription:
            "Designed a trust model where the server acts purely as an encrypted storage layer with no access to message content. Features token-based identity (no accounts or sessions) and idempotent release logic to prevent duplicate delivery under failure conditions.",
        tags: ["Next.js", "TypeScript", "Web Crypto API", "AES-GCM", "Zero-Knowledge"],
        image: null,
        github: "https://github.com/msodiq19",
        live: "https://last-message.dmsodiq.xyz",
        featured: false,
        metrics: ["Client-side encryption", "No accounts needed", "Zero-knowledge server"],
    },
    {
        id: 6,
        title: "DailyBlueprints",
        category: "Web App",
        description:
            "A productivity and planning web app for daily goals and task management. Designed with simplicity and usability at the forefront.",
        longDescription:
            "A clean, focused productivity tool that helps users plan and track daily goals. Built and shipped as a live product accessible on the web.",
        tags: ["Next.js", "TypeScript", "Productivity", "Web App"],
        image: "/DailyBlueprints.png",
        github: "https://github.com/msodiq19",
        live: "https://dailybluprints.dmsodiq.xyz",
        featured: false,
        metrics: ["Live product", "Task management", "Deployed"],
    },
    {
        id: 7,
        title: "E-Learning Platform",
        category: "Education",
        description:
            "Full-featured e-learning platform for Excellent Link Academy. Optimized for low-bandwidth environments achieving 95 Lighthouse score on 3G connections.",
        longDescription:
            "Mobile-first e-learning platform with SSR for SEO, smart API caching reducing calls by ~40%, and performance optimization achieving near-perfect Lighthouse scores in constrained environments.",
        tags: ["Next.js", "TypeScript", "SSR", "Performance"],
        image: "/Home-Excellent-Link-Academy.png",
        github: "https://github.com/msodiq19",
        live: null,
        featured: false,
        metrics: ["95 Lighthouse score", "~40% fewer API calls", "Mobile-first"],
    },
];

export const education = {
    degree: "B.Sc. Computer Science",
    institution: "University of Lagos",
    period: "2018 – 2025",
    gpa: "3.50 / 5.00",
    country: "Nigeria",
};
