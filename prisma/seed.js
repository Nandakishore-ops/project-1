const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Portify sample student data...");

  const existing = await prisma.user.findUnique({
    where: { email: "demo@portify.dev" },
  });

  if (existing) {
    console.log("Demo user already exists. Cleaning up...");
    await prisma.user.delete({ where: { email: "demo@portify.dev" } });
  }

  const hashedPassword = await bcrypt.hash("Password123!", 10);

  const demoUser = await prisma.user.create({
    data: {
      name: "Aarav Sharma",
      email: "demo@portify.dev",
      password: hashedPassword,
      phone: "+91 98765 43210",
      address: "New Delhi, India",
      headline: "Final Year B.Tech CSE | Full Stack Developer | Distributed Systems & Cloud",
      summary: "I am a high-performing Final Year B.Tech Computer Science and Engineering student passionate about distributed systems, cloud computing, and modern full-stack web applications. With rigorous foundations in data structures, algorithms, and system design, I have built real-time scalable platforms and spearheaded engineering teams in national hackathons. Constantly exploring modern web frameworks and high-concurrency architectures.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
      username: "aarav-sharma",
      template: "modern-developer",
      accentColor: "indigo",
      theme: "dark",
      isPublic: true,
      github: "https://github.com/aaravsharma-dev",
      linkedin: "https://linkedin.com/in/aaravsharma-btech",
      twitter: "https://twitter.com/aarav_codes",
      leetcode: "https://leetcode.com/aaravsharma",
      portfolioUrl: "https://portify.dev/p/aarav-sharma",

      educations: {
        create: [
          {
            college: "Delhi Technological University (DTU)",
            degree: "Bachelor of Technology (B.Tech)",
            branch: "Computer Science & Engineering",
            cgpa: "9.18 / 10.0",
            startYear: "2022",
            endYear: "2026",
            coursework: "Data Structures & Algorithms, Operating Systems, Database Management Systems, Object Oriented Programming, Computer Networks, Distributed Computing",
          },
          {
            college: "Delhi Public School, R.K. Puram",
            degree: "Senior Secondary (Class XII - CBSE)",
            branch: "Science (PCM with Computer Science)",
            cgpa: "96.4%",
            startYear: "2020",
            endYear: "2022",
            coursework: "Physics, Chemistry, Mathematics, Computer Science (Python & SQL)",
          },
        ],
      },

      skills: {
        create: [
          // Programming Languages
          { name: "C++", category: "languages", level: "Expert" },
          { name: "Java", category: "languages", level: "Proficient" },
          { name: "Python", category: "languages", level: "Proficient" },
          { name: "TypeScript", category: "languages", level: "Expert" },
          { name: "JavaScript (ES6+)", category: "languages", level: "Expert" },
          { name: "SQL", category: "languages", level: "Proficient" },
          // Technical Skills
          { name: "React.js", category: "technical", level: "Expert" },
          { name: "Next.js (App Router)", category: "technical", level: "Expert" },
          { name: "Node.js & Express", category: "technical", level: "Proficient" },
          { name: "PostgreSQL & Prisma", category: "technical", level: "Proficient" },
          { name: "Tailwind CSS", category: "technical", level: "Expert" },
          { name: "RESTful APIs", category: "technical", level: "Expert" },
          { name: "Redis Caching", category: "technical", level: "Intermediate" },
          // Tools & DevOps
          { name: "Git & GitHub", category: "tools", level: "Expert" },
          { name: "Docker", category: "tools", level: "Intermediate" },
          { name: "Linux / Bash", category: "tools", level: "Proficient" },
          { name: "Postman", category: "tools", level: "Proficient" },
          { name: "AWS (S3, EC2)", category: "tools", level: "Intermediate" },
          // Soft Skills
          { name: "Problem Solving (DSA)", category: "soft", level: "Expert" },
          { name: "Agile & Team Leadership", category: "soft", level: "Proficient" },
          { name: "Technical Communication", category: "soft", level: "Expert" },
          { name: "Adaptability & Fast Learner", category: "soft", level: "Expert" },
        ],
      },

      projects: {
        create: [
          {
            title: "DevPulse – Real-Time Cloud Infrastructure Monitor",
            description: "A full-stack DevOps telemetry dashboard enabling developers to monitor microservice health, container CPU/memory usage, and response latencies with live WebSockets alerts.",
            technologies: "Next.js, TypeScript, Tailwind CSS, PostgreSQL, Prisma, Redis, Docker, WebSockets",
            githubUrl: "https://github.com/aaravsharma-dev/devpulse",
            liveUrl: "https://devpulse.preview.app",
            featured: true,
            highlights: "Engineered real-time polling with Redis pub/sub handling 1,500+ events/sec; Reduced telemetry dashboard render time by 42% with server components; Integrated JWT auth with role-based access control.",
          },
          {
            title: "SmartCampus – Automated Attendance & QR Verification",
            description: "College campus mobile-friendly web app featuring time-expiring encrypted dynamic QR codes for student attendance, automated proxy detection, and teacher analytics dashboards.",
            technologies: "React, Node.js, Express, MongoDB, Tailwind CSS, JWT, Canvas QR",
            githubUrl: "https://github.com/aaravsharma-dev/smart-campus-qr",
            liveUrl: "https://smartcampus-dtu.vercel.app",
            featured: true,
            highlights: "Adopted by 3 engineering departments across 450+ students during technical fest; Generated dynamic crypto-salted QR codes refreshing every 8 seconds to prevent proxy attendance; Built exportable CSV/PDF attendance grade reports.",
          },
          {
            title: "AlgoVision 3D – Interactive Algorithm Visualizer",
            description: "An educational interactive visualizer for complex graph algorithms, tree traversals, and dynamic programming with step-by-step state playback and time complexity comparisons.",
            technologies: "TypeScript, Three.js, React, CSS Animations, Canvas API",
            githubUrl: "https://github.com/aaravsharma-dev/algovision-3d",
            liveUrl: "https://algovision-3d.web.app",
            featured: false,
            highlights: "Visualized Dijkstra, A*, Prim's, and Red-Black tree rebalancing in 3D canvas space; Reached 5,000+ organic views from GitHub and competitive programming forums.",
          },
        ],
      },

      experiences: {
        create: [
          {
            role: "Software Engineering Intern",
            company: "Razorpay / HyperGro Tech",
            location: "Bengaluru, India (Hybrid)",
            type: "Internship",
            startDate: "May 2025",
            endDate: "Aug 2025",
            description: "Engineered scalable REST APIs and internal workflow tooling. Optimized database queries and index schemas, reducing API response latency from 320ms to 145ms across high-throughput endpoints.",
            technologies: "TypeScript, Node.js, PostgreSQL, Docker, AWS",
          },
          {
            role: "Full Stack Web Development Intern",
            company: "CodersLab Solutions",
            location: "New Delhi, India (Remote)",
            type: "Internship",
            startDate: "Dec 2024",
            endDate: "Feb 2025",
            description: "Collaborated in an agile sprint team to refactor client-side state management into React Query and Tailwind CSS, increasing Lighthouse accessibility score from 68 to 98.",
            technologies: "React, Tailwind CSS, REST APIs, Git",
          },
        ],
      },

      certifications: {
        create: [
          {
            name: "AWS Certified Cloud Practitioner (CLF-C02)",
            issuer: "Amazon Web Services (AWS)",
            issueDate: "July 2024",
            credentialUrl: "https://aws.amazon.com/verification/CLF-C02-AARAV",
          },
          {
            name: "Meta Front-End Developer Professional Certificate",
            issuer: "Meta / Coursera",
            issueDate: "March 2024",
            credentialUrl: "https://coursera.org/verify/professional-cert/meta-aarav",
          },
          {
            name: "Problem Solving (Advanced) Skills Certificate",
            issuer: "HackerRank",
            issueDate: "November 2024",
            credentialUrl: "https://www.hackerrank.com/certificates/ps-advanced-aarav",
          },
        ],
      },

      achievements: {
        create: [
          {
            title: "First Runner-Up – Smart India Hackathon 2025",
            description: "Built an AI-assisted disaster management resource allocation system for government agencies amongst 1,200+ competing teams.",
            date: "Sept 2025",
            category: "Hackathon",
            link: "https://sih.gov.in/winners-2025",
          },
          {
            title: "Knight on LeetCode (Max Rating: 1948)",
            description: "Solved over 650+ algorithmic problems across Data Structures, Dynamic Programming, and Graph Theory; Top 4.5% globally.",
            date: "2024 - 2025",
            category: "Coding",
            link: "https://leetcode.com/aaravsharma",
          },
          {
            title: "Technical Lead – Google Developer Student Clubs (GDSC)",
            description: "Organized 8 hands-on bootcamps on Web Development, Cloud Foundations, and Open Source for 300+ junior engineering students.",
            date: "2024 - 2025",
            category: "Leadership",
            link: "https://gdsc.community.dev/dtu",
          },
        ],
      },
    },
  });

  console.log(`✅ Demo user seeded successfully: ${demoUser.email} / Password123!`);
  console.log(`🌐 Public portfolio slug: /p/${demoUser.username}`);
}

main()
  .catch((e) => {
    console.error("Error during seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
