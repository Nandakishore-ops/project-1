# 🚀 Portify – AI-Powered Student Portfolio Builder

**Portify** is a modern, full-stack web application specially engineered for **B.Tech students and fresh engineering graduates** to craft professional, recruiter-ready portfolios, enhance technical descriptions with AI, generate scannable QR codes, and export ATS-friendly PDF resumes.

---

## 🌟 Key Features

1. **Secure Student Authentication & Onboarding**:
   - Registration and login with full name, email, phone number, address, and profile photo upload (file or URL).
   - Instant 1-click **"Fill Sample Student Info"** for effortless demo evaluation.
   - Demo credentials out of the box: `demo@portify.dev` / `Password123!`.

2. **B.Tech Focused Academic Details**:
   - Collects engineering college/university, degree (B.Tech, B.E., M.Tech, BCA, MCA), branch/specialization, CGPA/percentage, graduation year, and relevant coursework (DSA, DBMS, OS, Computer Networks, System Design).

3. **Categorized Skills Inventory**:
   - Categorized into:
     - **Programming Languages** (C++, Java, Python, TypeScript, Go, SQL)
     - **Frameworks & Web Tech** (React, Next.js, Node.js, Express, PostgreSQL, Prisma, Docker)
     - **Developer Tools & DevOps** (Git, GitHub, Linux, Postman, AWS)
     - **Soft Skills** (Problem Solving/DSA, Agile, Team Leadership, Communication)
   - 1-click quick-add chips for popular industry skills with proficiency levels.

4. **Projects Showcase & AI STAR-Method Enhancer**:
   - Document projects with titles, GitHub repository links, live demo URLs, tech stack tags, and featured badges.
   - **AI Project Description Enhancer**: Transforms rough drafts into structured STAR (Situation, Task, Action, Result) summaries with architectural engineering bullet points.

5. **AI Headline & "About Me" Generator**:
   - **Headlines**: Generates 3 punchy, targeted headlines combining your degree, branch, and technical stack.
   - **About Me**: Synthesizes 3 distinct tones:
     - *Technical & Impact-Driven*
     - *Creative & Passionate*
     - *Concise & Recruiter-First*
   - Strictly grounds content in the student's provided information without hallucinating fake jobs.
   - Works seamlessly with or without an `OPENAI_API_KEY` (features an advanced built-in contextual synthesis engine).

6. **Four Signature Portfolio Templates**:
   - **Modern Developer**: Sleek terminal-inspired aesthetic, interactive tech badges, GitHub repository cards, and dev command bar.
   - **Minimal Professional**: Editorial typography, generous whitespace, subtle borders, and distraction-free recruiter reading layout.
   - **Creative Developer**: Bold vibrant gradients, glowing glass cards, interactive pills, and expressive styling.
   - **Corporate Professional**: Formal executive slate/navy layout tailored for campus placement drives, MNC interviews, and consulting firms.
   - **Customizable Brand Accents**: Electric Indigo, Emerald Tech, Cyber Violet, Neon Cyan, Golden Amber, Rose Quartz.
   - **Dark / Light Modes**: Full contrast styling support.

7. **Interactive Live Preview & Device Viewports**:
   - Split device simulation: Desktop, Tablet (768px), and Mobile (390px) responsive viewports.
   - **Scannable QR Code Modal**: Generates high-resolution PNG QR codes linking to the student's public portfolio URL.
   - **Downloadable Resume / Portfolio PDF**: Clean `@media print` print engine exporting selectable vector text without blurry artifacts.
   - **Unique Public URL**: E.g., `/p/aarav-sharma` or `/p/[your-slug]`, accessible to recruiters without requiring login.

8. **Profile Readiness Indicator**:
   - Real-time score calculator (%) with interactive step checklists guiding students to a 100% complete portfolio.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS & Lucide Icons
- **Database & ORM**: Prisma ORM with SQLite (local development) / PostgreSQL (production ready)
- **Authentication**: JWT with HTTP-only cookies & bcryptjs password hashing
- **QR Generation**: QRCode SVG/Canvas generator
- **AI Engine**: OpenAI API (`gpt-4o-mini`) with specialized B.Tech algorithmic fallback synthesizer

---

## 🚀 Quick Start Guide

### 1. Clone & Install Dependencies
```bash
git clone <repo-url>
cd "project 1"
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Default `.env` configuration:
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="portify-super-secret-jwt-key-2026-secure-btech-portfolio"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
OPENAI_API_KEY="" # Optional: add your OpenAI key if desired
```

### 3. Initialize Database & Seed Sample Student
```bash
npx prisma generate
npx prisma db push
node prisma/seed.js
```
*Creates the demo account: `demo@portify.dev` with password `Password123!` and sample portfolio `/p/aarav-sharma`.*

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Run Automated End-to-End Tests
To test the complete user journey (landing page, public portfolio, auth, AI generation, registration, and templates):
```bash
node scripts/test-e2e.js
```

---

## 🌐 Public Demo Portfolio
- Sample student portfolio: [http://localhost:3000/p/aarav-sharma](http://localhost:3000/p/aarav-sharma)
- 1-Click Demo Login on [/login](http://localhost:3000/login) (`demo@portify.dev` / `Password123!`)

---

## 🚢 Deployment to Production (PostgreSQL / Supabase / Vercel)

To deploy to Vercel with a managed PostgreSQL database (e.g. Supabase or Neon):
1. In `prisma/schema.prisma`, update the datasource:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
2. Set `DATABASE_URL` in your hosting provider's environment variables to your PostgreSQL connection string:
   `postgresql://postgres:[PASSWORD]@[HOST]:5432/[DB_NAME]?schema=public`
3. Run `npx prisma db push` on deployment.
