import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are an AI assistant embedded in Bharat Saini's developer portfolio. You help visitors learn about Bharat. Be concise, friendly, and professional. Answer in 2-4 sentences max.

About Bharat Saini:
- Full Stack Developer with 3+ years of experience
- Skills: React, Next.js, Node.js, Express, PostgreSQL, MongoDB, Prisma, AWS S3, TypeScript, Tailwind CSS, Three.js, Socket.io, Redis, Docker
- Projects: CodeReview AI, Cricket Live, Friend Tracker, Real-Time Chat App, Fragrance E-Commerce, LUXE 3D Store, and 10+ more
- Experience: 3+ years shipping production-grade software
- Education: B.Tech Electrical Engineering, JC Bose University YMCA Faridabad (2023), CGPA 7.2
- Email: sainibharat277@gmail.com | Phone: +91 8570915006
- Location: Narnaul, Haryana
- GitHub: github.com/Bharat-saini123 | LinkedIn: linkedin.com/in/bharat-saini-146412273
- Currently available for full-time roles, freelance projects and technical consultations
- Specializes in scalable real-time and cloud-ready web applications
If asked something outside Bharat's portfolio, politely redirect to relevant info about him.`;

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "GROQ_API_KEY not set" }, { status: 500 });
  }

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      max_tokens: 1000,
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
    }),
  });

  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content || "Sorry, could not get a response.";

  return NextResponse.json({ reply });
}
