const portfolioContext = {
  person: {
    name: "B N Yashwanth",
    shortName: "Yashwanth",
    role: "Software Engineering Intern",
    location: "Bengaluru, India",
    email: "bnyashwanth2006@gmail.com",
    linkedin: "https://www.linkedin.com/in/bn-yashwanth",
    github: "https://github.com/bnyashwanth",
    codolio: "https://codolio.com/profile/bnyashwanth",
  },
  summary:
    "Software Engineering Intern at YugaYatra, full-stack MERN developer, and AI builder exploring Agentic AI. Pursuing B.E in Robotics and Artificial Intelligence.",
  experience: [
    {
      title: "Software Engineer Intern",
      company: "YugaYatra Retail (OPC) Pvt Ltd",
      duration: "Dec 2025 – Feb 2026",
      highlights: [
        "Built LinkCab Admin Portal with MERN",
        "Implemented KYC verification queue",
        "Developed internal CRM workflows",
        "Built REST APIs with Node.js and Express.js",
      ],
    },
    {
      title: "Software Developer Intern",
      company: "FreshIn10 (A YugaYatra Startup)",
      duration: "Dec 2025 – Feb 2026",
      highlights: [
        "Led frontend development for hyperlocal delivery app",
        "Optimized UX for faster order placement and tracking",
        "Built inventory and order status modules",
      ],
    },
  ],
  education: {
    degree: "B.E | Robotics and Artificial Intelligence",
    institution: "Dayananda Sagar College of Engineering",
    year: "2024 - 2028",
    cgpa: "9.33 / 10.0",
  },
  projects: [
    {
      title: "RFP AI Agent",
      stack: ["React", "Node.js", "LangChain", "MongoDB", "OpenAI"],
      impact: "Reduced RFP processing time by approximately 70%.",
      liveUrl: "https://rfp-ai-agent-theta.vercel.app/",
      githubUrl: "https://github.com/bnyashwanth/RFP-AI-agent",
    },
    {
      title: "Cargo-Guard AI",
      stack: ["Python", "OpenCV", "TensorFlow", "Streamlit"],
      impact: "Enabled real-time cargo risk monitoring and predictive alerts.",
      liveUrl: "https://cargoguard-ai-wyyeisb74bu7wsk38ygryo.streamlit.app/",
      githubUrl: "https://github.com/bnyashwanth/CargoGuard-AI",
    },
    {
      title: "Linbkcab Platform",
      stack: ["React", "Node.js", "Express.js", "MongoDB", "JWT"],
      impact: "Improved workflow centralization and operational efficiency.",
      liveUrl: "https://linkcabin.vercel.app/",
      githubUrl: "https://github.com/bnyashwanth/linkCab.in",
    },
    {
      title: "PhazeGen",
      stack: ["React", "Node.js", "OpenAI", "MongoDB", "JWT"],
      impact: "Accelerated structured content generation with AI workflows.",
      liveUrl: "https://phazegen-ai.vercel.app/",
      githubUrl: "https://github.com/bnyashwanth/PhazeGEN",
    },
    {
      title: "Wanderlust",
      stack: ["Node.js", "Express.js", "MongoDB", "EJS", "JWT"],
      impact: "Built a centralized platform for travel rental listing management.",
      liveUrl: "#",
      githubUrl: "https://github.com/bnyashwanth/Wanderlust-travel-website",
    },
  ],
  certifications: [
    "Full-Stack Web Developer (Apna College)",
    "Data Structures and Algorithms (Apna College)",
    "InterShala Student Program(ISP) 2025 (internshala)",
  ],
  skills: {
    frontend: ["Next.js", "React", "TypeScript", "JavaScript", "Tailwind CSS", "HTML5", "CSS3"],
    backend: ["Node.js", "Express.js", "REST APIs", "JWT", "Prisma"],
    ai: ["Agentic AI", "Generative AI", "Python", "LLM APIs"],
    databases: ["MongoDB", "PostgreSQL"],
    tools: ["Docker", "Vercel", "Render", "Git", "GitHub", "Postman"],
  },
};

module.exports = portfolioContext;
