const projectsData = [
  {
    id: 1,
    title: "RFP AI Agent",
    description: "AI-powered RFP analysis system using retrieval-augmented generation to match proposals with inventory data.",
    problem:
      "Manual comparison of Request for Proposals (RFP) against large inventory datasets is error-prone and extremely time-consuming for procurement teams.",
    approach:
      "Built a retrieval-augmented generation (RAG) pipeline using LangChain and OpenAI to extract and process unstructured data from PDFs and Excel files. Implemented semantic search with vector embeddings to automatically match RFP requirements against inventory items through backend API workflows.",
    impact:
      "Reduced RFP processing time by approximately 70% and enabled faster identification of inventory gaps, improving bid accuracy and response speed.",
    imageUrl: "/images/rfp-dashboard.png",
    technologies: ["React", "Node.js", "LangChain", "MongoDB", "OpenAI"],
    liveUrl: "https://rfp-ai-agent-theta.vercel.app/",
    githubUrl: "https://github.com/bnyashwanth/RFP-AI-agent",
  },
  {
    id: 2,
    title: "Cargo-Guard AI",
    description: "Predictive AI system for cargo risk monitoring and route intelligence in logistics operations.",
    problem:
      "Logistics companies lack real-time, predictive insights into cargo theft and damage risks across dynamic shipping routes.",
    approach:
      "Developed a predictive risk scoring engine using Python and TensorFlow. Integrated OpenCV for visual cargo monitoring and built a real-time analytics dashboard using Streamlit to surface risk scores and operational insights.",
    impact:
      "Enabled real-time cargo risk monitoring with predictive alerts and analytics dashboards, supporting proactive decision-making and improved risk mitigation.",
    imageUrl: "/images/cargo-guard.png",
    technologies: ["Python", "OpenCV", "TensorFlow", "Streamlit"],
    liveUrl: "https://cargoguard-ai-wyyeisb74bu7wsk38ygryo.streamlit.app/",
    githubUrl: "https://github.com/bnyashwanth/CargoGuard-AI",
  },
  {
    id: 3,
    title: "Linbkcab Platform",
    description: "Full-stack web platform for managing digital workflows and data-driven operations.",
    problem:
      "Businesses often rely on fragmented tools and manual processes to manage operational workflows, leading to inefficiencies, poor visibility, and data inconsistencies.",
    approach:
      "Designed and developed a full-stack web application using React and Node.js with a modular backend architecture. Implemented RESTful APIs for data handling, authentication, and business logic, along with a responsive frontend for streamlined user interactions.",
    impact:
      "Enabled centralized workflow management and improved operational efficiency by reducing manual effort and improving data accessibility across the platform.",
    imageUrl: "/images/linkcab-dashboard.png",
    technologies: ["React", "Node.js", "Express.js", "MongoDB", "JWT"],
    liveUrl: "https://linkcabin.vercel.app/",
    githubUrl: "https://github.com/bnyashwanth/linkCab.in",
  },

  {
    id: 4,
    title: "PhazeGen",
    description: "AI-powered content and workflow generation platform using large language models.",
    problem:
      "Creating structured content and automating repetitive workflows is time-consuming and inconsistent when done manually, especially for developers and content creators.",
    approach:
      "Developed an AI-driven platform integrating large language model APIs to generate contextual content and assist with workflow automation. Built a scalable backend using Node.js to handle prompt orchestration, API communication, and response management, with a responsive frontend for user interaction.",
    impact:
      "Accelerated content creation and reduced manual effort by providing fast, consistent AI-generated outputs tailored to user inputs and use cases.",
    imageUrl: "/images/phazegen-dashboard.png",
    technologies: ["React", "Node.js", "OpenAI", "MongoDB", "JWT"],
    liveUrl: "https://phazegen-ai.vercel.app/",
    githubUrl: "https://github.com/bnyashwanth/PhazeGEN",
  },
  {
    id: 5,
    title: "Wanderlust",
    description: "Full-stack travel listing platform for discovering and managing rental stays.",
    problem:
      "Travelers often struggle to find reliable accommodation listings with clear details, while property owners lack simple platforms to manage and showcase their rentals effectively.",
    approach:
      "Built a full-stack web application using Node.js, Express.js, and MongoDB, enabling users to create, browse, and manage travel listings. Implemented RESTful APIs for listings and reviews, integrated user authentication using JWT, and designed a responsive UI for seamless browsing across devices.",
    impact:
      "Enabled users to discover and manage travel accommodations through a centralized platform, improving accessibility and usability for both travelers and property owners.",
    imageUrl: "/images/wanderlust-dashboard.png",
    technologies: ["Node.js", "Express.js", "MongoDB", "EJS", "JWT"],
    liveUrl: "#",
    githubUrl: "https://github.com/bnyashwanth/Wanderlust-travel-website",
  }


  // {
  //   id: 3,
  //   title: "Smart Inventory Tracker",
  //   description: "IoT-enabled real-time inventory management dashboard with predictive analytics.",
  //   problem: "Warehouses struggle with real-time stock visibility, leading to overstocking or stockouts.",
  //   approach: "Designed a dashboard consuming MQTT data streams from IoT sensors. Used Recharts for visualization and a Node.js backend to predict restocking needs.",
  //   impact: "Improved inventory accuracy by 40% and reduced stockout incidents by 25%.",
  //   imageUrl: "https://placehold.co/600x400/1e1e24/ffffff?text=Inventory+Tracker",
  //   technologies: ["React", "Node.js", "Socket.io", "Chart.js"],
  //   liveUrl: "#",
  //   githubUrl: "#",
  // },
  // {
  //   id: 4,
  //   title: "HealthConnect",
  //   description: "Telemedicine platform connecting patients with specialists for secure video consultations.",
  //   problem: "Patients in remote areas lack access to specialized healthcare professionals.",
  //   approach: "Built a secure WebRTC video chat application with Next.js and Tailwind CSS. Implemented appointment scheduling and secure medical record storage.",
  //   impact: "Facilitated over 500 remote consultations in the first pilot month.",
  //   imageUrl: "https://placehold.co/600x400/1e1e24/ffffff?text=HealthConnect",
  //   technologies: ["Next.js", "WebRTC", "Firebase", "Tailwind CSS"],
  //   liveUrl: "#",
  //   githubUrl: "#",
  // },
  // {
  //   id: 5,
  //   title: "EcoTrack",
  //   description: "Carbon footprint calculator and sustainability goal tracker for small businesses.",
  //   problem: "Small businesses lack easy-to-use tools to measure and reduce their environmental impact.",
  //   approach: "Developed a gamified React application that calculates carbon emissions based on utility inputs and suggests actionable reduction steps.",
  //   impact: "Adopted by 50+ local businesses to track and reduce their carbon footprint.",
  //   imageUrl: "https://placehold.co/600x400/1e1e24/ffffff?text=EcoTrack",
  //   technologies: ["React", "Redux", "Node.js", "PostgreSQL"],
  //   liveUrl: "#",
  //   githubUrl: "#",
  // },
  // {
  //   id: 6,
  //   title: "CryptoView",
  //   description: "Real-time cryptocurrency market analysis and portfolio tracking application.",
  //   problem: "Traders need a unified view of their assets across multiple exchanges with real-time price alerts.",
  //   approach: "Integrated CoinGecko API for live data and used Redux Toolkit for state management. Implemented local storage for portfolio persistence.",
  //   impact: "Provided users with a sub-second updated market dashboard.",
  //   imageUrl: "https://placehold.co/600x400/1e1e24/ffffff?text=CryptoView",
  //   technologies: ["React", "TypeScript", "Redux Toolkit", "API"],
  //   liveUrl: "#",
  //   githubUrl: "#",
  // },
  // {
  //   id: 7,
  //   title: "TaskMaster AI",
  //   description: "Productivity app that uses AI to prioritize and categorize daily tasks automatically.",
  //   problem: "Users get overwhelmed by unorganized to-do lists and struggle with prioritization.",
  //   approach: "Integrated OpenAI API to analyze task sentiment and urgency. Built a drag-and-drop interface using React DnD.",
  //   impact: "Helped users complete high-priority tasks 30% faster according to beta feedback.",
  //   imageUrl: "https://placehold.co/600x400/1e1e24/ffffff?text=TaskMaster+AI",
  //   technologies: ["React", "OpenAI API", "Firebase", "Material UI"],
  //   liveUrl: "#",
  //   githubUrl: "#",
  // },
  // {
  //   id: 8,
  //   title: "UrbanPulse",
  //   description: "Community-driven event discovery platform for local city events.",
  //   problem: "Locals miss out on community events due to fragmented information across social media.",
  //   approach: "Created a map-based event discovery tool using Mapbox GL and a MERN stack backend for user-submitted events.",
  //   impact: "Centralized detailed info for over 200 monthly local events.",
  //   imageUrl: "https://placehold.co/600x400/1e1e24/ffffff?text=UrbanPulse",
  //   technologies: ["MERN Stack", "Mapbox", "Redux"],
  //   liveUrl: "#",
  //   githubUrl: "#",
  // },
];

export default projectsData;
