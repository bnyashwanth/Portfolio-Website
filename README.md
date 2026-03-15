# B N Yashwanth — Portfolio Website

A modern, responsive developer portfolio built with **React**, **Vite**, and **Tailwind CSS**, featuring smooth animations, dark/light theme toggling, and an AI-powered chat widget.

🔗 **Live**: [bnyashwanth.dev](https://bnyashwanth.dev) _(update with your real URL)_

---

## ✨ Features

- **Hero Section** with typewriter effect and animated particles
- **About, Experience, Education** — structured personal info
- **Projects** — filterable project cards with modal detail views
- **Skills** — categorized tech stack visualization
- **Problem Solving** — LeetCode / competitive programming stats
- **Certifications** — certificate gallery
- **Contact Form** — powered by EmailJS
- **AI Chat Widget** — portfolio assistant via Gemini API with portfolio grounding
- **Dark / Light Theme** — system-aware with manual toggle
- **Smooth Animations** — AOS scroll animations + Framer Motion

---

## 🛠 Tech Stack

| Layer     | Technology                                 |
| --------- | ------------------------------------------ |
| Framework | React 19 + Vite 5                          |
| Styling   | Tailwind CSS 3                             |
| Animation | Framer Motion, AOS, tsparticles            |
| 3D        | Three.js + React Three Fiber               |
| Backend   | Express.js + MongoDB (optional, `/server`) |

---

## 📁 Project Structure

```
Portfolio-Website/
├── index.html              # Vite entry point
├── package.json            # Dependencies & scripts
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind theme & tokens
├── postcss.config.js       # PostCSS plugins
├── .env                    # Environment variables (gitignored)
├── public/
│   ├── favicon.png
│   ├── Resume.pdf
│   ├── images/             # Project screenshots
│   └── certificates/       # Certification images
├── src/
│   ├── main.jsx            # React entry point
│   ├── App.jsx             # App layout & section composition
│   ├── index.css           # Global styles & CSS variables
│   ├── assets/             # Static images (profile, etc.)
│   ├── components/         # All UI components
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Experience.jsx
│   │   ├── Projects.jsx
│   │   ├── ProjectCard.jsx
│   │   ├── ProjectModal.jsx
│   │   ├── Skills.jsx
│   │   ├── ProblemSolving.jsx
│   │   ├── Education.jsx
│   │   ├── Certifications.jsx
│   │   ├── Contact.jsx
│   │   ├── ChatWidget.jsx
│   │   ├── Footer.jsx
│   │   ├── GithubStats.jsx
│   │   ├── BackgroundEffects.jsx
│   │   ├── ParticleBackground.jsx
│   │   ├── Blog.jsx
│   │   └── Testimonials.jsx
│   ├── context/
│   │   └── ThemeContext.jsx
│   ├── data/               # Static data (projects, education, etc.)
│   └── hooks/
│       └── useTypewriter.js
└── server/                 # Optional Express backend
    ├── server.js
    ├── package.json
    ├── models/
    └── routes/
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### Setup

```bash
# Clone the repo
git clone https://github.com/bnyashwanth/Portfolio-Website.git
cd Portfolio-Website

# Install dependencies
npm install

# Create .env (optional — for API integrations)
cp .env.example .env

# Start dev server
npm run dev
```

The site will be running at **http://localhost:5173**.

### Optional: Run Backend Chat API (Gemini)

```bash
# in a second terminal
cd server
npm install
cp .env.example .env

# add GEMINI_API_KEY in server/.env
node server.js
```

If running frontend and backend locally, set `VITE_CHAT_API_BASE_URL=http://localhost:5000` in root `.env`.

### Production Build

```bash
npm run build
npm run preview
```

---

## 📄 License

MIT © B N Yashwanth
