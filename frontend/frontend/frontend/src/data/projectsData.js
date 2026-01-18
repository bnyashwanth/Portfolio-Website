const projectsData = [
  {
    id: 1,
    title: "RFP AI Agent",
    description: "Automated RFP analysis system.", // Fallback
    problem: "Manual comparison of Request for Proposals (RFP) against extensive inventory datasets is error-prone and extremely time-consuming for procurement teams.",
    approach: "Built a RAG pipeline using LangChain and OpenAI to extract unstructured data from PDFs/Excel. Implemented semantic search with vector embeddings to match requirements against inventory items automatically.",
    impact: "Reduced RFP processing time by ~70% and enabled instant identification of inventory shortages, improving bid accuracy and response speed.",
    imageUrl: "/images/rfp-dashboard.png",
    technologies: ["React", "Node.js", "LangChain", "MongoDB", "OpenAI"],
    liveUrl: "https://rfp-ai-agent-theta.vercel.app/",
    githubUrl: "https://github.com/bnyashwanth/RFP-AI-agent"
  },
  {
    id: 2,
    title: "Cargo-Guard AI",
    description: "AI-powered cargo risk assessment.", // Fallback
    problem: "Logistics companies lack real-time, predictive insights into cargo theft and damage risks across dynamic shipping routes.",
    approach: "Developed a predictive risk scoring engine using Python and TensorFlow. Integrated OpenCV for visual cargo monitoring and Streamlit for a real-time analytics dashboard for logistics managers.",
    impact: "Provides proactive risk alerts and route optimization suggestions, potentially reducing cargo loss incidents and insurance liabilities.",
    imageUrl: "/images/cargo-guard.png",
    technologies: ["Python", "OpenCV", "TensorFlow", "Streamlit"],
    liveUrl: "https://cargoguard-ai-wyyeisb74bu7wsk38ygryo.streamlit.app/",
    githubUrl: "https://github.com/bnyashwanth/CargoGuard-AI"
  }
];

export default projectsData;
