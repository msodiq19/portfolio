export const personalInfo = {
    name: "Muhammed Sodiq",
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
            "Led frontend development of an internal admin dashboard for Monietracka, a fintech platform, integrating multiple backend services and stabilizing API contracts.",
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
        image: "/projects/simestra.png",
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
        image: "/projects/architecture.png",
        github: "https://github.com/msodiq19/marketing-platform-architecture",
        live: "https://github.com/msodiq19/marketing-platform-architecture",
        featured: true,
        metrics: ["5 architectural decisions", "12,000+ word case study", "Published ADRs"],
    },
    {
        id: 3,
        title: "Res3archSync Platform",
        category: "Hackathon · Real-time",
        description:
            "Real-time academic co-authoring platform built during a hackathon. Uses CRDTs (Yjs) and WebSockets for collaborative editing with JWT-secured multi-user sessions.",
        longDescription:
            "Collaborative research platform architected around CRDTs for conflict-free real-time editing. Balances consistency, latency, and complexity with a focus on practical offline-first patterns.",
        tags: ["React", "WebSockets", "CRDTs", "Yjs", "JWT"],
        image: "/projects/researchsync.png",
        github: "https://github.com/msodiq19",
        live: null,
        featured: true,
        metrics: ["Real-time collaboration", "CRDT-based sync", "JWT sessions"],
    },
    {
        id: 4,
        title: "Monietracka Admin Dashboard",
        category: "Fintech",
        description:
            "Internal admin dashboard for a fintech platform integrating multiple backend services. Set up CI/CD pipelines and stable API contracts with cross-team collaboration.",
        longDescription:
            "Led the frontend engineering of a mission-critical admin interface for a Nigerian fintech, with a focus on reliability, API contract stability, and seamless deployment processes.",
        tags: ["React", "REST APIs", "CI/CD", "TypeScript"],
        image: "/projects/monietracka.png",
        github: "https://github.com/msodiq19",
        live: null,
        featured: false,
        metrics: ["Multiple API integrations", "Automated CI/CD", "Production-ready"],
    },
    {
        id: 5,
        title: "E-Learning Platform",
        category: "Education",
        description:
            "Full-featured e-learning platform for Excellent Link Academy. Optimized for low-bandwidth environments achieving 95 Lighthouse score on 3G connections.",
        longDescription:
            "Mobile-first e-learning platform with SSR for SEO, smart API caching reducing calls by ~40%, and performance optimization achieving near-perfect Lighthouse scores in constrained environments.",
        tags: ["Next.js", "TypeScript", "SSR", "Performance"],
        image: "/projects/elearning.png",
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
