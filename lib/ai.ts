/**
 * AI Engine for Portify - Student Portfolio Builder
 * Supports OpenAI API with privacy validation and fallback to specialized B.Tech context synthesizer.
 */

interface HeadlineInput {
  name: string;
  degree?: string;
  branch?: string;
  college?: string;
  skills?: string[];
  targetRole?: string;
}

interface SummaryInput {
  name: string;
  degree?: string;
  branch?: string;
  college?: string;
  cgpa?: string;
  graduationYear?: string;
  technicalSkills?: string[];
  programmingLanguages?: string[];
  softSkills?: string[];
  projects?: { title: string; technologies?: string }[];
  experiences?: { role: string; company: string }[];
  careerGoal?: string;
}

interface ProjectEnhanceInput {
  title: string;
  rawDescription: string;
  technologies?: string;
  highlights?: string;
}

// Clean and sanitize prompt text for safety & privacy
function sanitizeInput(text: string): string {
  if (!text) return "";
  return text
    .replace(/[<>]/g, "")
    .replace(/bearer\s+[a-zA-Z0-9_\-\.]+/gi, "")
    .trim();
}

/**
 * Call OpenAI API if key is present
 */
async function callOpenAI(systemPrompt: string, userPrompt: string): Promise<string | null> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey || apiKey.trim() === "" || apiKey === "your-openai-api-key") {
    return null;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey.trim()}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 600,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      console.warn("OpenAI API call failed with status", res.status);
      return null;
    }

    const data = await res.json();
    return data.choices?.[0]?.message?.content?.trim() || null;
  } catch (err) {
    console.warn("OpenAI fetch error, falling back to local B.Tech AI engine:", err);
    return null;
  }
}

/**
 * 1. AI Headline Generator
 */
export async function generateHeadlines(input: HeadlineInput): Promise<string[]> {
  const degree = sanitizeInput(input.degree || "B.Tech");
  const branch = sanitizeInput(input.branch || "Computer Science");
  const skills = (input.skills || []).slice(0, 5).join(", ");
  const college = sanitizeInput(input.college || "");
  const role = sanitizeInput(input.targetRole || "Software Engineer");

  const systemPrompt = `You are an elite tech recruiter and resume strategist for top tier engineering students. Generate 3 short, punchy, high-impact portfolio headlines (one line each, separated by newlines). Use ONLY the candidate's actual branch, skills, and degree. Avoid cheesy buzzwords like 'rockstar' or 'ninja'. Return exactly 3 numbered lines.`;

  const userPrompt = `Generate 3 professional portfolio headlines for:
Candidate: ${input.name}
Degree & Branch: ${degree} in ${branch}
College: ${college || "Engineering College"}
Key Skills: ${skills || "Modern Web Development, Algorithms"}
Target Role: ${role}
Format: Numbered 1, 2, 3. No other text.`;

  const aiResult = await callOpenAI(systemPrompt, userPrompt);
  if (aiResult) {
    const lines = aiResult
      .split("\n")
      .map((l) => l.replace(/^\d+[\.\)]\s*/, "").replace(/^"/, "").replace(/"$/, "").trim())
      .filter(Boolean);
    if (lines.length >= 2) return lines.slice(0, 3);
  }

  // Smart Contextual Engine Fallback
  const topSkillStr = skills ? ` | Proficient in ${skills}` : " | Full Stack Development";
  return [
    `${degree} in ${branch} | Aspiring ${role}${topSkillStr}`,
    `Software Engineering Enthusiast | ${branch} Undergraduate | Building scalable systems with ${skills || "modern tech"}`,
    `${branch} Graduate | Problem Solver | Passionate about engineering high-quality software solutions`,
  ];
}

/**
 * 2. AI Professional Summary / About Me Generator
 */
export async function generateSummary(input: SummaryInput): Promise<{
  impact: string;
  creative: string;
  concise: string;
}> {
  const degree = sanitizeInput(input.degree || "B.Tech");
  const branch = sanitizeInput(input.branch || "Computer Science & Engineering");
  const college = sanitizeInput(input.college || "Engineering University");
  const cgpa = sanitizeInput(input.cgpa || "");
  const gradYear = sanitizeInput(input.graduationYear || "");
  const techSkills = (input.technicalSkills || []).slice(0, 8).join(", ");
  const progLangs = (input.programmingLanguages || []).slice(0, 6).join(", ");
  const softSkills = (input.softSkills || []).slice(0, 4).join(", ");
  const projectNames = (input.projects || []).map((p) => p.title).join(", ");
  const expNames = (input.experiences || []).map((e) => `${e.role} at ${e.company}`).join(", ");

  const systemPrompt = `You are a career mentor for graduating engineers. Write a compelling, highly professional first-person ("I am...") About Me / Summary section for a student's portfolio. Ground the summary STRICTLY in the provided details (degree, college, skills, projects, experience). Never invent past employers or unlisted achievements. Provide a cohesive 2-3 paragraph summary.`;

  const userPrompt = `Candidate Details:
Name: ${input.name}
Education: ${degree} in ${branch} at ${college} ${cgpa ? `(CGPA: ${cgpa})` : ""} ${gradYear ? `Graduating ${gradYear}` : ""}
Programming Languages: ${progLangs || "Java, Python, C++, JavaScript"}
Technical Stack: ${techSkills || "React, Node.js, Next.js, SQL"}
Soft Skills: ${softSkills || "Analytical Thinking, Team Collaboration"}
Key Projects: ${projectNames || "Full-stack web applications"}
Internships/Experience: ${expNames || "Academic projects and practical coursework"}

Write a stellar 150-200 word professional About Me section in an engaging, confident tone.`;

  const aiResult = await callOpenAI(systemPrompt, userPrompt);

  if (aiResult && aiResult.length > 50) {
    const raw = aiResult.trim();
    return {
      impact: raw,
      creative: `I am a forward-thinking ${degree} candidate in ${branch} at ${college}. With hands-on experience in ${progLangs || "core programming"} and ${techSkills || "modern frameworks"}, I turn complex algorithmic problems into responsive, user-centric web applications. Driven by curiosity and rigorous academic training${cgpa ? ` (CGPA: ${cgpa})` : ""}, I thrive at the intersection of creative frontend engineering and resilient backend architecture.`,
      concise: `Results-driven ${degree} student in ${branch} at ${college} with strong foundations in ${progLangs || "software engineering"} and ${techSkills || "web technologies"}. Experienced in developing end-to-end applications${projectNames ? ` such as ${projectNames}` : ""}. Eager to leverage analytical skills and agile problem-solving to contribute to high-impact engineering teams.`,
    };
  }

  // High-fidelity fallback engine crafted for Indian & Global B.Tech freshers
  const impactSummary = `I am a dedicated ${degree} student specializing in ${branch} at ${college}${gradYear ? `, graduating class of ${gradYear}` : ""}${cgpa ? ` with a strong academic standing of ${cgpa} CGPA` : ""}. Passionate about computer systems, software architecture, and modern application development, I have developed technical proficiency across ${progLangs || "C++, Java, Python, and JavaScript"} along with frameworks including ${techSkills || "React, Next.js, and Node.js"}.

Throughout my engineering curriculum, I have focused on translating theoretical concepts into robust real-world projects${projectNames ? `, including ${projectNames}` : ""}. I take pride in writing clean, well-tested, and maintainable code with a strong emphasis on data structures and algorithms.

I am actively seeking software engineering opportunities where I can apply my analytical acumen, collaborative team spirit, and technical skills to build scalable products that make a tangible difference.`;

  const creativeSummary = `Hello! I am ${input.name}, a passionate technologist pursuing my ${degree} in ${branch} at ${college}. I love building software that lives at the sweet spot between crisp design and rock-solid engineering. 

My toolkit spans ${techSkills || "modern full-stack web technologies"} and core languages like ${progLangs || "TypeScript, Python, and C++"}. Whether architecting database schemas, optimizing API endpoints, or crafting fluid user interfaces${projectNames ? ` for projects like ${projectNames}` : ""}, I enjoy tackling challenging technical puzzles with curiosity and perseverance.

When I am not coding, you will find me participating in hackathons, exploring new open-source libraries, and continuously refining my engineering craft.`;

  const conciseSummary = `Detail-oriented ${degree} in ${branch} graduate from ${college}${cgpa ? ` (CGPA: ${cgpa})` : ""}. Solid grounding in data structures, algorithms, and system design, with practical experience in ${progLangs || "modern programming languages"} and ${techSkills || "cloud/web technologies"}. Proven track record through projects like ${projectNames || "full-stack applications"}. Seeking entry-level software engineering roles to contribute to innovative product teams.`;

  return {
    impact: impactSummary,
    creative: creativeSummary,
    concise: conciseSummary,
  };
}

/**
 * 3. AI Project Description Enhancer (STAR / Action-Oriented Method)
 */
export async function improveProjectDescription(input: ProjectEnhanceInput): Promise<{
  improvedDescription: string;
  bulletPoints: string[];
}> {
  const title = sanitizeInput(input.title);
  const rawDesc = sanitizeInput(input.rawDescription);
  const tech = sanitizeInput(input.technologies || "");

  const systemPrompt = `You are a senior tech lead reviewing a college student's project on GitHub and their portfolio. Transform their draft description into a powerful, professional STAR-format (Situation, Task, Action, Result) summary.
Strict Rules:
- Only describe what the student built, the tech used, and its functionality.
- Do NOT fabricate artificial percentages like "reduced latency by 99%" unless present in their text.
- Highlight clean architecture, core features, responsive UI, database design, and security.
- Return a JSON object with:
  "description": "2-3 sentence overview",
  "bulletPoints": ["Key engineering highlight 1", "Key feature/architecture highlight 2", "Key performance/UX highlight 3"]`;

  const userPrompt = `Project Title: ${title}
Technologies Used: ${tech}
Student's Draft Description: ${rawDesc}
Existing Highlights: ${input.highlights || "None"}`;

  const aiResult = await callOpenAI(systemPrompt, userPrompt);
  if (aiResult) {
    try {
      const parsed = JSON.parse(aiResult);
      if (parsed.description && Array.isArray(parsed.bulletPoints)) {
        return {
          improvedDescription: parsed.description,
          bulletPoints: parsed.bulletPoints.slice(0, 4),
        };
      }
    } catch {
      // If output wasn't pure JSON, check if it contains text
      if (aiResult.length > 40) {
        return {
          improvedDescription: aiResult.split("\n\n")[0] || aiResult,
          bulletPoints: [
            `Architected and implemented end-to-end full-stack capabilities using ${tech || "modern web frameworks"}.`,
            `Engineered clean data flows, secure API endpoints, and optimized database queries.`,
            `Designed responsive, user-friendly interface with rigorous error-handling and validations.`,
          ],
        };
      }
    }
  }

  // Specialized B.Tech project enhancer fallback
  const techList = tech ? tech.split(",").map((t) => t.trim()).join(", ") : "modern web technologies";
  const desc = rawDesc && rawDesc.length > 15
    ? `A robust, full-featured application designed and developed using ${techList}. ${rawDesc.replace(/\.$/, "")}, engineered with an emphasis on clean modular architecture, intuitive user experience, and resilient data handling.`
    : `Designed and engineered ${title}, an interactive software application powered by ${techList}. Built from the ground up to solve practical challenges through clean code architecture, modular design, and efficient client-server interactions.`;

  const bulletPoints = [
    `Developed the full core workflow leveraging ${techList}, ensuring type safety, modularity, and maintainability.`,
    `Implemented secure data validations, responsive UI layouts, and asynchronous state management.`,
    `Integrated RESTful API communication with robust error boundaries and graceful user feedback.`,
  ];

  return {
    improvedDescription: desc,
    bulletPoints,
  };
}
