import projectsData from "../data/projectsData";
import experienceData from "../data/experienceData";
import educationData from "../data/educationData";
import certificationsData from "../data/certificationsData";
import chatbotProfileData from "../data/chatbotProfileData";

const INTENT_KEYWORDS = {
  greeting: ["hi", "hello", "hey", "yo", "good morning", "good evening"],
  about: ["about", "who are you", "introduce", "summary", "profile", "background"],
  experience: ["experience", "intern", "work", "job", "company", "yugayatra", "freshin10"],
  projects: ["project", "portfolio", "built", "build", "work", "github"],
  skills: ["skills", "tech stack", "technology", "frontend", "backend", "ai", "tools", "database"],
  education: ["education", "college", "degree", "cgpa", "study", "university"],
  contact: ["contact", "email", "linkedin", "reach", "hire", "connect"],
  certifications: ["certification", "certificate", "course"],
  coding: ["leetcode", "codolio", "dsa", "problem solving", "streak", "coding"],
};

const normalize = (text = "") => text.toLowerCase().trim();

const includesAny = (text, keywords) =>
  keywords.some((keyword) => text.includes(keyword));

const scoreIntent = (text, keywords) => {
  let score = 0;
  keywords.forEach((keyword) => {
    if (text.includes(keyword)) score += 1;
  });
  return score;
};

const findTopProjects = (count = 3) => projectsData.slice(0, count);

const findMatchingProject = (text) => {
  const normalized = normalize(text);

  let bestProject = null;
  let bestScore = 0;

  projectsData.forEach((project) => {
    let score = 0;
    const title = normalize(project.title);
    const description = normalize(project.description);
    const technologies = project.technologies.map((t) => normalize(t));

    title.split(/\s+/).forEach((token) => {
      if (token.length > 2 && normalized.includes(token)) score += 2;
    });

    technologies.forEach((tech) => {
      if (normalized.includes(tech)) score += 1;
    });

    if (normalized.includes(title)) score += 3;
    if (normalized.includes(description.slice(0, 25))) score += 1;

    if (score > bestScore) {
      bestScore = score;
      bestProject = project;
    }
  });

  return bestScore >= 2 ? bestProject : null;
};

const formatSkills = () => {
  const { skills } = chatbotProfileData;
  return [
    `Frontend: ${skills.frontend.join(", ")}`,
    `Backend: ${skills.backend.join(", ")}`,
    `AI: ${skills.ai.join(", ")}`,
    `Databases: ${skills.databases.join(", ")}`,
    `Tools: ${skills.tools.join(", ")}`,
  ].join("\n");
};

const buildReply = (message, confidence) => ({
  response: message,
  confidence,
  source: "portfolio-data",
});

export const getPortfolioReply = (userMessage) => {
  const text = normalize(userMessage);

  if (!text) {
    return buildReply("Please ask me anything about my work, projects, skills, or contact details.", 0.4);
  }

  const projectMatch = findMatchingProject(text);
  if (projectMatch) {
    return buildReply(
      `Great question. ${projectMatch.title} is one of my key projects. ${projectMatch.description} My approach was: ${projectMatch.approach} Impact: ${projectMatch.impact} You can explore it here: ${projectMatch.liveUrl} and code here: ${projectMatch.githubUrl}`,
      0.95
    );
  }

  const intentScores = Object.entries(INTENT_KEYWORDS).map(([intent, keywords]) => ({
    intent,
    score: scoreIntent(text, keywords),
  }));

  intentScores.sort((a, b) => b.score - a.score);
  const bestIntent = intentScores[0];

  if (!bestIntent || bestIntent.score === 0) {
    return buildReply(
      "I can help with my projects, internship experience, tech stack, education, certifications, coding profile, or contact details. Ask me one of those and I will answer with specifics.",
      0.35
    );
  }

  switch (bestIntent.intent) {
    case "greeting":
      return buildReply(
        `Hey, I am ${chatbotProfileData.shortName}. ${chatbotProfileData.headline} Ask me about my projects, internships, or how to reach me.`,
        0.9
      );

    case "about":
      return buildReply(
        `I am ${chatbotProfileData.name}, currently a ${chatbotProfileData.role}. I am pursuing ${chatbotProfileData.educationFocus} and I focus on building production-ready web apps with MERN plus AI-powered workflows.`,
        0.9
      );

    case "experience": {
      const experienceSummary = experienceData
        .map((exp) => `${exp.title} at ${exp.company} (${exp.duration})`)
        .join("; ");

      return buildReply(
        `My recent experience includes: ${experienceSummary}. I mainly worked on MERN products, API integration, admin systems, and workflow automation.`,
        0.95
      );
    }

    case "projects": {
      const top = findTopProjects(3);
      const list = top
        .map((p) => `${p.title} (${p.technologies.slice(0, 3).join(", ")})`)
        .join(", ");

      return buildReply(
        `Some projects I am most proud of are ${list}. If you want, ask me about any one project and I will break down the problem, approach, and impact.`,
        0.92
      );
    }

    case "skills":
      return buildReply(
        `My core tech stack is:\n${formatSkills()}\nIf you share a role, I can map my strongest matching skills to it.`,
        0.94
      );

    case "education": {
      const edu = educationData[0];
      if (!edu) {
        return buildReply("I can share my education details once they are added to the portfolio data.", 0.65);
      }
      return buildReply(
        `I am studying ${edu.degree} at ${edu.institution} (${edu.year}) with a CGPA of ${edu.cgpa}.`,
        0.96
      );
    }

    case "contact":
      return buildReply(
        `You can reach me at ${chatbotProfileData.email}. I am also active on LinkedIn: ${chatbotProfileData.links.linkedin} and GitHub: ${chatbotProfileData.links.github}.`,
        0.98
      );

    case "certifications": {
      const certs = certificationsData
        .map((cert) => `${cert.name} (${cert.authority})`)
        .join(", ");
      return buildReply(`My certifications include: ${certs}.`, 0.9);
    }

    case "coding":
      return buildReply(
        `I track my coding and problem-solving activity on Codolio: ${chatbotProfileData.links.codolio}. My portfolio is configured to show this live profile and daily changes.`,
        0.95
      );

    default:
      return buildReply(
        "I can answer about my projects, experience, skills, education, certifications, coding profile, and contact details.",
        0.5
      );
  }
};

export const shouldUseLocalFirst = (result) => (result?.confidence || 0) >= 0.55;
