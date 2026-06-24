<div align="center">

# 🌌 Vivek Chaurasiya — Personal Portfolio

**A sleek, fully responsive, and highly interactive personal portfolio built with cutting-edge web technologies.**

[![React](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

<img src="https://capsule-render.vercel.app/api?type=waving&color=0e7490&height=150&section=header&text=Welcome%20to%20My%20Portfolio&fontSize=28&fontColor=ffffff&fontAlign=50&fontAlignY=42" width="100%" />

🔗 **Live Demo:** [vivek-portfolio.vercel.app](https://github.com/VivekChaurasiya95/Portfolio)  
📧 **Contact:** vivekchaurasiya943@gmail.com  
💼 **LinkedIn:** [vivek-chaurasiya](https://www.linkedin.com/in/vivek-chaurasiya-722037315)

</div>

---

## ✨ Features

| Feature | Description |
|---|---|
| 🎨 **Dark / Light Mode** | Fully theme-aware design using `next-themes` with smooth transitions |
| 🌊 **Framer Motion Animations** | Spring physics, stagger animations, scroll-triggered reveals throughout |
| 🤖 **3D Spline Scene** | Interactive 3D robot model embedded in the footer via Spline |
| 📱 **Fully Responsive** | Pixel-perfect layouts from mobile to ultrawide displays |
| 🧭 **Smooth Navigation** | Navbar with active section detection, scroll spy, and LinkedIn-linked "Open to Work" badge |
| 📜 **Projects Showcase** | Full-screen project cards with image previews, tech stack pills, and live/GitHub links |
| 🏅 **Certifications Gallery** | Responsive grid with click-to-expand detail modals and credential verification links |
| 💼 **Experience Timeline** | Animated horizontal scroller for professional experience and education |
| 🛠️ **Skills Section** | Categorised tech stack grid with official devicon logos and hover glow animations |
| 📬 **Contact Form** | Functional email form powered by Web3Forms API with success/error toasts |
| 🔗 **Social Sidebar** | Fixed social links sidebar (Desktop) with contextual icons |
| ⬆️ **Back to Top Button** | Smooth-scroll back-to-top button in the footer |
| 🗺️ **Footer Navigation** | Professional footer with nav shortcuts and social links columns |
| ⚡ **Optimised Build** | ~46% image compression via `vite-plugin-image-optimizer`, production-ready |

---

## 🚀 Tech Stack

<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" title="HTML5" width="40" height="40" style="margin: 6px;"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" title="CSS3" width="40" height="40" style="margin: 6px;"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" title="TypeScript" width="40" height="40" style="margin: 6px;"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" title="React" width="40" height="40" style="margin: 6px;"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" title="Vite" width="40" height="40" style="margin: 6px;"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" title="Tailwind CSS" width="40" height="40" style="margin: 6px;"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" title="Node.js" width="40" height="40" style="margin: 6px;"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" title="Express.js" width="40" height="40" style="margin: 6px;"/>
</p>

### Core Libraries

| Category | Libraries / Tools |
|---|---|
| **Framework** | React 18, TypeScript, Vite 5 |
| **Styling** | Tailwind CSS, `tailwindcss-animate`, CSS Variables |
| **Animations** | Framer Motion 11 |
| **3D / Graphics** | Spline (`@splinetool/react-spline`), Three.js, React Three Fiber |
| **UI Components** | Radix UI (full suite), shadcn/ui, Lucide React |
| **Routing** | React Router DOM v6 |
| **Forms & Validation** | React Hook Form, Zod |
| **Theming** | next-themes |
| **Email** | Web3Forms API, Nodemailer (server), Express.js |
| **State / Data** | TanStack Query |
| **Testing** | Vitest, Testing Library |
| **Build Optimisation** | vite-plugin-image-optimizer, Sharp |

---

## 📁 Project Structure

```
portfolio/
├── public/                  # Static assets (images, resume, certificates)
│   ├── certificates/        # Certificate images
│   ├── experience-logos/    # Company logos
│   └── experience-proofs/   # Proof documents
├── server/                  # Express.js backend (email API)
│   └── index.js
├── src/
│   ├── assets/
│   │   └── icons/           # Social media icons (png)
│   ├── components/          # All React components
│   │   ├── Navigation.tsx
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── ExperienceSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── CertificationsSection.tsx
│   │   ├── JourneySection.tsx
│   │   ├── ContactSection.tsx
│   │   ├── Footer.tsx
│   │   ├── SocialSidebar.tsx
│   │   ├── StatusWidget.tsx
│   │   ├── FreelanceWidget.tsx
│   │   └── ThemeToggle.tsx
│   ├── data/                # Static content & configuration
│   │   ├── siteLinks.ts     # All social/email links — edit here
│   │   ├── projects.ts      # Projects data
│   │   └── certifications.ts
│   ├── pages/               # Page-level components (React Router)
│   ├── index.css            # Global styles, CSS variables (light & dark themes)
│   └── App.tsx              # Root app with routing
├── .env.example             # Environment variable template
├── vite.config.ts
├── tailwind.config.ts
└── package.json
```

---

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+ and `npm` (or `bun`)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/VivekChaurasiya95/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Environment Variables**

   Copy the example file and fill in your keys:
   ```bash
   cp .env.example .env
   ```

   ```env
   # Web3Forms API key for the contact form (get yours free at web3forms.com)
   VITE_WEB3FORMS_KEY=your_access_key

   # (Optional) Nodemailer config for the Express email server
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

5. **(Optional) Run the full stack** (frontend + email server concurrently)
   ```bash
   npm run dev:full
   ```

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite dev server |
| `npm run dev:server` | Start the Express email server only |
| `npm run dev:full` | Start both frontend and backend concurrently |
| `npm run build` | Production build with image optimisation |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm run test` | Run Vitest unit tests |
| `npm run test:watch` | Run Vitest in watch mode |

---

## 🎨 Customisation

All content is data-driven for easy updates:

| What to Change | Where to Edit |
|---|---|
| Your name, email, social links | `src/data/siteLinks.ts` |
| Projects | `src/data/projects.ts` |
| Certifications | `src/data/certifications.ts` |
| Skills & tech stack | `src/components/SkillsSection.tsx` |
| Experience & education | `src/components/ExperienceSection.tsx` |
| Colours / theme tokens | `src/index.css` (CSS variables) |
| Resume file | Replace `public/Vivek_Chaurasiya_Resume.pdf` |

---

## 📬 Contact

Feel free to reach out via any of the channels below:

- 📧 **Email:** [vivekchaurasiya943@gmail.com](mailto:vivekchaurasiya943@gmail.com)
- 💼 **LinkedIn:** [vivek-chaurasiya-722037315](https://www.linkedin.com/in/vivek-chaurasiya-722037315)
- 🐦 **X (Twitter):** [@Vivek9589](https://x.com/Vivek9589)
- 🏆 **LeetCode:** [Vivek-Chaurasiya](https://leetcode.com/u/Vivek-Chaurasiya/)
- 📸 **Instagram:** [@v.i.v.e.k_chaurasiya](https://www.instagram.com/v.i.v.e.k_chaurasiya/)
- 💻 **GitHub:** [VivekChaurasiya95](https://github.com/VivekChaurasiya95)

---

<div align="center">

⭐ **If you found this project helpful or inspiring, consider giving it a star!**

<img src="https://capsule-render.vercel.app/api?type=waving&color=0e7490&height=100&section=footer" width="100%" />

</div>
