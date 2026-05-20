export const projects = [
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
    demo: "#",
    stats: { filters: "5+", features: "AI-Powered", alerts: "Email/SMS" },
    image: "/student-saarthi-1.png",
    gallery: [
      "/student-saarthi-2.png",
      "/student-saarthi-3.png",
      "/student-saarthi-4.png",
      "/student-saarthi-5.png"
    ],
  }
];
