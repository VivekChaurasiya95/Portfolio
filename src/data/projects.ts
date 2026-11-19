export const projects = [
  {
    id: "algofight",
    title: "AlgoFight – Real-Time Competitive Coding Arena",
    category: "Full-Stack",
    color: "from-rose-500 to-red-600",
    accentColor: "rose",
    problem:
      "Competitive programmers had no esports-style arena for real-time head-to-head algorithmic duels with fair skill-based matchmaking and cheat-resistant live battles.",
    solution:
      "A production-grade distributed platform for 1v1 ELO-ranked coding duels — Redis-powered matchmaking, synchronized live battle rooms, sandboxed multi-language judging, a curated practice lab, and gamified rewards vaults.",
    impact:
      "Live in production serving real duels with sub-second judging, adaptive AI sparring via AlgoBot, custom tournament lobbies for up to 100 players, and anti-cheat match integrity with tab-switch and focus monitoring.",
    tech: ["React 19", "TypeScript", "Node.js", "WebSocket", "Redis", "PostgreSQL", "Prisma", "BullMQ", "Docker"],
    architecture:
      "Distributed monorepo: React 19 frontend with Monaco editor and cyberpunk battle HUD, Node.js + TypeScript backend with WebSocket gateways, Redis Sorted-Set matchmaking pool with atomic Lua pairing and Pub/Sub fan-out, BullMQ judging queue over Piston sandboxes, and PostgreSQL via Prisma for ratings, ladders, and vaults.",
    challenges:
      "Eliminating race conditions in cross-instance matchmaking, keeping duel timers and editor state synchronized over WebSockets, and enforcing hard resource quotas on untrusted code in isolated sandboxes.",
    codeHighlights: [
      "Redis SBMM Matchmaking Engine",
      "Atomic Lua Room Pairing",
      "Live Battle Arena + Monaco Editor",
      "Piston Sandbox Judging Pipeline",
      "Anti-Cheat Integrity Monitor",
    ],
    story:
      "AlgoFight started as a vision to make DSA practice feel like esports — live opponents, ticking clocks, roaring ranks — instead of lonely grinding on static problem lists.",
    funFact:
      "Impatient duelists can skip the queue entirely and instantly spar against AlgoBot, a 1200-ELO adaptive AI opponent!",
    lessonsLearned:
      "Real-time fairness is a systems problem: atomic pairing, synchronized clocks, and strict sandboxing matter as much as the problems themselves.",
    github: "https://github.com/VivekChaurasiya95/AlgoFight",
    demo: "https://algo.mitsgwalior.in",
    stats: { duels: "1v1 ELO", judge: "Sub-Second", languages: "5" },
    image: "/algofight-1.jpeg",
    gallery: [
      "/algofight-2.jpeg",
      "/algofight-3.jpeg",
      "/algofight-4.jpeg",
      "/algofight-5.jpeg"
    ],
  },
  {
    id: "skillflare",
    title: "MITS SkillFlare – Student Talent Marketplace",
    category: "Full-Stack",
    color: "from-emerald-500 to-teal-600",
    accentColor: "emerald",
    problem:
      "Students, mentors, and teachers lacked a unified platform for task collaboration, mentorship discovery, portfolio growth, and guided communication.",
    solution:
      "Built a role-based full-stack platform where teachers post tasks, students complete them for credits, mentors guide learners, and Buddy AI (Ollama-powered) assists users contextually.",
    impact:
      "Enabled a campus-ready ecosystem with real-time chat, leaderboard gamification, mentorship workflows, and safer AI-guided navigation for student growth.",
    tech: ["React 18", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "Socket.IO", "JWT"],
    architecture:
      "Two-part architecture: Vite + React frontend with Socket.IO client and role-based routes, Express + MongoDB backend with modular controllers/services, JWT auth, and AI service integration via Ollama endpoints.",
    challenges:
      "Designing secure role-based flows, handling real-time messaging state, and building a moderated AI assistant that remains useful while staying educational and safe.",
    codeHighlights: [
      "JWT + RBAC Auth Layer",
      "Socket.IO Real-Time Messaging",
      "Buddy AI (Ollama) Integration",
      "Task Lifecycle APIs",
    ],
    story:
      "MITS SkillFlare was built as a students-for-students initiative to make talent development measurable through real tasks, mentorship, and collaborative learning.",
    funFact:
      "The platform includes a dedicated Developer Hub to showcase the student team behind the product.",
    lessonsLearned:
      "Role clarity, real-time feedback loops, and transparent progression mechanics dramatically improve learner engagement.",
    github: "https://github.com/VivekChaurasiya95/SkillFlare-Vivek",
    demo: "https://skillflare-delta.vercel.app",
    stats: { roles: "3 Core", realtime: "Socket.IO", ai: "Buddy AI" },
    image: "/skillflare.png",
    gallery: [
      "/skillflare-2.png", 
      "/skillflare-3.png", 
      "/skillflare-4.png", 
      "/skillflare-5.png"
    ],
  },
  {
    id: "dime",
    title: "DIME – Data-Driven Idea Exploration & Market Evaluation",
    category: "Full-Stack",
    color: "from-orange-500 to-amber-600",
    accentColor: "orange",
    problem:
      "Startups and developers often build products without validating if there's actual market demand, leading to wasted effort and resources.",
    solution:
      "DIME is an AI-powered analytics platform that validates software ideas using market insights, feasibility analysis, competitor research, and data-driven scoring before development begins.",
    impact:
      "Enables founders and developers to make data-backed decisions, reducing the risk of building unwanted products by providing clear, actionable market intelligence.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "OpenAI API"],
    architecture:
      "Modern Next.js application leveraging Server Components for performance, Supabase for backend database and auth, and OpenAI for generating market insights and opportunity scoring.",
    challenges:
      "Aggregating diverse data signals into a unified, easy-to-understand 'Opportunity Score' without overwhelming the user.",
    codeHighlights: [
      "AI Validation Engine",
      "Dynamic Opportunity Matrix",
      "Cross-Domain Signal Processing",
    ],
    story:
      "The idea for DIME came after seeing too many brilliant developers build technically perfect products that nobody actually wanted to use.",
    funFact:
      "The platform uses actual App Store and Play Store review data to identify pain points for competitor analysis!",
    lessonsLearned:
      "Market pain is a much stronger indicator of startup success than technological novelty.",
    github: "https://github.com/VivekChaurasiya95",
    demo: "https://dime-rishabh.vercel.app",
    stats: { users: "100+", analysis: "AI-Powered", data: "Real-time" },
    image: "/dime-1.png",
    gallery: [
      "/dime-2.png",
      "/dime-3.png",
      "/dime-4.png",
      "/dime-5.png"
    ],
  },
  {
    id: "student-saarthi",
    title: "Student Saarthi – AI Scholarship Portal",
    category: "Full-Stack",
    color: "from-violet-500 to-purple-600",
    accentColor: "violet",
    problem:
      "Students struggle to find relevant scholarships matching their profile across multiple criteria.",
    solution:
      "Developed a web portal with AI-based scholarship recommendations using OpenAI API, with filters for GPA, degree, income, category, and skills.",
    impact:
      "Integrated admin dashboard, external scholarship redirection, and notification system with Email/SMS alerts and Google Calendar tracking.",
    tech: ["React.js", "HTML", "CSS", "JavaScript", "Python (Flask)", "MySQL"],
    architecture:
      "Flask backend with MySQL database. React.js frontend with OpenAI API integration for intelligent recommendations.",
    challenges:
      "Integrating AI recommendations with multiple filter criteria while maintaining fast response times.",
    codeHighlights: [
      "AI Recommendation System",
      "Admin Dashboard",
      "Notification System",
    ],
    story:
      "Many students miss out on scholarships simply because they don't know about them. This portal bridges that gap.",
    funFact: "The first prototype was built during a 36-hour hackathon sprint!",
    lessonsLearned:
      "A good recommendation system needs both AI intelligence and human-curated data.",
    github: "https://github.com/VivekChaurasiya95",
    demo: "https://student-saarthi.antideploy.app",
    stats: { filters: "5+", features: "AI-Powered", alerts: "Email/SMS" },
    image: "/student-saarthi-1.png",
    gallery: [
      "/student-saarthi-2.png",
      "/student-saarthi-3.png",
      "/student-saarthi-4.png",
      "/student-saarthi-5.png"
    ],
  },
  {
    id: "sitelabs",
    title: "Vivek's SiteLabs – Engineering Project Showcase Hub",
    category: "Full-Stack",
    color: "from-amber-500 to-yellow-600",
    accentColor: "amber",
    problem:
      "Engineers and recruiters needed a high-performance, distraction-free architectural hub to inspect, benchmark, and clone all 29 production open-source repositories without heavyweight framework overhead.",
    solution:
      "Engineered an authentic Graphite-specification showcase running on a custom Vanilla ES6+ motion engine, live coffee steam SVG shaders, mechanical odometer metrics, interactive CLI sandbox, and Vercel Edge delivery.",
    impact:
      "Catalogs 29 repositories across Autonomous AI, Distributed Systems, and Full-Stack with zero runtime dependencies, instant dual theme switching, live coordinate HUD telemetry, and sub-second global edge response.",
    tech: ["HTML5", "CSS3", "JavaScript (ES6+)", "SVG Shaders", "Vercel Edge", "Shell"],
    architecture:
      "Zero-dependency static client architecture: Semantic HTML5 with JSON-LD @graph schemas, modular 13-engine ES6+ motion & CLI runtime in app.js, precision Graphite CSS token system, and procedural SVG turbulence shaders deployed on Vercel's global edge network.",
    challenges:
      "Building 13 interactive modules — including a monospaced terminal sandbox, 10-slot mechanical odometer, and crosshair blueprint HUD — using pure vanilla JavaScript with zero third-party dependencies.",
    codeHighlights: [
      "13-Module Vanilla ES6+ Motion Engine",
      "Live Developer Terminal CLI Sandbox",
      "Procedural SVG Coffee Steam Shader",
      "10-Slot Mechanical Rolling Odometer",
      "Graphite Blueprint Crosshair HUD",
    ],
    story:
      "SiteLabs was created to move away from generic template portfolios and build an editorial, blueprint-grade architectural showcase that treats software projects with the rigor of engineering schematics.",
    funFact:
      "SiteLabs achieves 100/100 Lighthouse performance and accessibility scores with exactly 0 npm packages or external framework runtimes!",
    lessonsLearned:
      "Modern browsers have incredible native capabilities: with clean mathematical models and modern CSS, you can build mesmerizing interactive experiences without thousands of dependencies.",
    github: "https://github.com/VivekChaurasiya95/Vivek-SiteLabs",
    demo: "https://vivek-sitelabs.vercel.app",
    stats: { repos: "29 Repos", stack: "Zero-Deps", performance: "100/100" },
    image: "/sitelabs-1.png",
    gallery: [
      "/sitelabs-2.png",
      "/sitelabs-3.png",
      "/sitelabs-4.png"
    ],
  },
  {
    id: "hser",
    title: "HSER – Human Skill Extinction Radar",
    category: "Full-Stack",
    color: "from-cyan-500 to-blue-600",
    accentColor: "cyan",
    problem:
      "No tool existed to predict which software/IT skills are at risk of extinction due to AI and automation.",
    solution:
      "Built a predictive intelligence platform with a risk analysis engine calculating Extinction Risk %, Replacement Force, and Skill Half-Life.",
    impact:
      "Interactive web dashboard deployed on Vercel enabling users to explore, compare, and analyze extinction risk across multiple software skills.",
    tech: ["Python", "React.js", "FastAPI", "Data Analysis"],
    architecture:
      "Full-stack application with Python backend (FastAPI) serving risk analysis engine. React.js frontend with interactive data visualizations.",
    challenges:
      "Designing a meaningful risk calculation model using skill attributes like automation level and tool growth rate.",
    codeHighlights: [
      "Risk Analysis Engine",
      "Interactive Dashboard",
      "Skill Comparison Tool",
    ],
    story:
      "Inspired by the rapid pace of AI replacing traditional skills, I wanted to quantify which skills are most at risk.",
    funFact:
      "The extinction risk formula went through 12 iterations before producing meaningful results!",
    lessonsLearned:
      "Data-driven insights are only as good as the model behind them.",
    github: "https://github.com/VivekChaurasiya95",
    demo: "https://hser-project.vercel.app/",
    stats: { skills: "50+", metrics: "3 Key", status: "Live" },
    image: "/hser-1.png",
    gallery: [
      "/hser-2.png",
      "/hser-3.png",
      "/hser-4.png",
      "/hser-5.png"
    ],
  }
];
