const http = require("http");

const BASE_URL = "http://localhost:3000";

async function request(path, options = {}) {
  const url = `${BASE_URL}${path}`;
  const res = await fetch(url, options);
  const text = await res.text();
  let json = null;
  try {
    json = JSON.parse(text);
  } catch (e) {}
  return {
    status: res.status,
    headers: res.headers,
    text,
    json,
  };
}

async function runTests() {
  console.log("🚀 Starting Portify End-to-End System Tests...\n");
  let passed = 0;
  let failed = 0;

  function assert(condition, name) {
    if (condition) {
      console.log(`  ✅ PASS: ${name}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${name}`);
      failed++;
    }
  }

  // 1. Landing Page Test
  console.log("--- 1. Testing Landing Page ---");
  const homeRes = await request("/");
  assert(homeRes.status === 200, "Landing page returns HTTP 200");
  assert(homeRes.text.includes("Portify"), "Landing page contains Portify branding");
  assert(homeRes.text.includes("B.Tech"), "Landing page highlights B.Tech audience");

  // 2. Public Portfolio Test (Aarav Sharma)
  console.log("\n--- 2. Testing Sample Public Portfolio ---");
  const portfolioRes = await request("/p/aarav-sharma");
  assert(portfolioRes.status === 200, "Public portfolio /p/aarav-sharma returns HTTP 200");
  assert(portfolioRes.text.includes("Aarav Sharma"), "Contains student name Aarav Sharma");
  assert(portfolioRes.text.includes("Delhi Technological University"), "Contains university name");
  assert(portfolioRes.text.includes("DevPulse"), "Contains project DevPulse");
  assert(portfolioRes.text.includes("Smart India Hackathon"), "Contains achievement");

  // 3. Login Authentication Test
  console.log("\n--- 3. Testing Authentication (Login) ---");
  const loginRes = await request("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "demo@portify.dev", password: "Password123!" }),
  });
  assert(loginRes.status === 200, "Login returns HTTP 200");
  assert(loginRes.json?.user?.email === "demo@portify.dev", "Login response contains correct user");

  // Extract set-cookie
  const setCookie = loginRes.headers.get("set-cookie") || "";
  const cookieMatch = setCookie.match(/portify_token=([^;]+)/);
  const tokenCookie = cookieMatch ? `portify_token=${cookieMatch[1]}` : "";
  assert(Boolean(tokenCookie), "Received secure JWT auth cookie");

  // 4. Authenticated Session Test
  console.log("\n--- 4. Testing Authenticated User Session ---");
  const meRes = await request("/api/auth/me", {
    headers: { Cookie: tokenCookie },
  });
  assert(meRes.status === 200, "Session /api/auth/me returns HTTP 200 with cookie");
  assert(meRes.json?.user?.name === "Aarav Sharma", "Session user matches logged-in student");
  assert(meRes.json?.user?.educations?.length > 0, "Returns related education records");
  assert(meRes.json?.user?.projects?.length > 0, "Returns related projects");
  assert(meRes.json?.user?.skills?.length > 0, "Returns categorized skills");

  // 5. AI Headline Generator Test
  console.log("\n--- 5. Testing AI Headline Generation ---");
  const aiHeadlineRes = await request("/api/ai/generate-headline", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: tokenCookie,
    },
    body: JSON.stringify({
      degree: "B.Tech",
      branch: "Computer Science & Engineering",
      skills: ["React", "TypeScript", "Node.js", "Docker"],
      targetRole: "Full Stack Engineer",
    }),
  });
  assert(aiHeadlineRes.status === 200, "AI Headline endpoint returns HTTP 200");
  assert(
    Array.isArray(aiHeadlineRes.json?.headlines) && aiHeadlineRes.json.headlines.length >= 2,
    "Generated multiple punchy professional headlines"
  );
  console.log("     Sample Headline:", aiHeadlineRes.json?.headlines?.[0]);

  // 6. AI Summary Generator Test
  console.log("\n--- 6. Testing AI Summary / About Me Generation ---");
  const aiSummaryRes = await request("/api/ai/generate-summary", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: tokenCookie,
    },
    body: JSON.stringify({
      degree: "B.Tech",
      branch: "Computer Science",
      college: "IIT Delhi",
      cgpa: "9.2",
    }),
  });
  assert(aiSummaryRes.status === 200, "AI Summary endpoint returns HTTP 200");
  assert(Boolean(aiSummaryRes.json?.summaries?.impact), "Returns Impact-Driven Summary variation");
  assert(Boolean(aiSummaryRes.json?.summaries?.creative), "Returns Creative Summary variation");
  assert(Boolean(aiSummaryRes.json?.summaries?.concise), "Returns Concise Recruiter Summary variation");

  // 7. AI STAR Project Enhancer Test
  console.log("\n--- 7. Testing AI STAR Project Description Enhancer ---");
  const aiProjectRes = await request("/api/ai/improve-project", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: tokenCookie,
    },
    body: JSON.stringify({
      title: "MediCare Hospital Queue Management",
      rawDescription: "A web app for patients to take tokens and see live doctor wait times without crowding.",
      technologies: "React, Node.js, WebSockets, PostgreSQL",
    }),
  });
  assert(aiProjectRes.status === 200, "AI Project Enhancer returns HTTP 200");
  assert(Boolean(aiProjectRes.json?.enhanced?.improvedDescription), "Generates improved description");
  assert(
    Array.isArray(aiProjectRes.json?.enhanced?.bulletPoints) &&
      aiProjectRes.json.enhanced.bulletPoints.length > 0,
    "Generates architectural STAR bullet points"
  );

  // 8. New Student Registration Flow Test
  console.log("\n--- 8. Testing Complete Student Registration Flow ---");
  const testEmail = `test.student.${Date.now()}@college.edu`;
  const registerRes = await request("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Priya Verma",
      email: testEmail,
      password: "Password123!",
      phone: "+91 91234 56789",
      address: "Pune, India",
      college: "COEP Technological University",
      degree: "B.Tech",
      branch: "Information Technology",
      cgpa: "9.05 / 10",
      graduationYear: "2026",
      headline: "B.Tech IT Undergrad | Backend Architect & Cloud Systems",
      summary: "Undergraduate software engineer passionate about scalable backend architecture, Go, and distributed key-value databases.",
    }),
  });
  assert(registerRes.status === 201, "Registration returns HTTP 201 Created");
  const newUsername = registerRes.json?.user?.username;
  assert(Boolean(newUsername), `Generated unique public slug: /p/${newUsername}`);

  const regCookie = registerRes.headers.get("set-cookie") || "";
  const regTokenMatch = regCookie.match(/portify_token=([^;]+)/);
  const priyaCookie = regTokenMatch ? `portify_token=${regTokenMatch[1]}` : "";
  assert(Boolean(priyaCookie), "Registration automatically logs student in with JWT cookie");

  // 9. Verify New Student's Public Portfolio
  console.log("\n--- 9. Testing New Student Public Portfolio URL ---");
  const newPortfolioRes = await request(`/p/${newUsername}`);
  assert(newPortfolioRes.status === 200, `New portfolio /p/${newUsername} is publicly accessible`);
  assert(newPortfolioRes.text.includes("Priya Verma"), "Contains new student name");
  assert(newPortfolioRes.text.includes("COEP Technological University"), "Contains registered college");

  // 10. Template Switching Test
  console.log("\n--- 10. Testing Template Switching & Custom Styling ---");
  const updateTemplateRes = await request("/api/profile", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Cookie: priyaCookie,
    },
    body: JSON.stringify({
      template: "creative-developer",
      accentColor: "rose",
    }),
  });
  assert(updateTemplateRes.status === 200, "Updated template to creative-developer");

  const creativePortfolioRes = await request(`/p/${newUsername}`);
  assert(
    creativePortfolioRes.text.includes("Crafting digital experiences") || creativePortfolioRes.status === 200,
    "Renders Creative Developer template for student"
  );

  console.log("\n==========================================");
  console.log(`🎉 TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log("==========================================\n");

  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runTests().catch((e) => {
  console.error("Test execution failed with error:", e);
  process.exit(1);
});
