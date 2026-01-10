import { NextResponse } from "next/server"

export async function GET() {
  const projects = [
    {
      id: "p1",
      createdAt: "2025-01-12",
      title: "Luxora Capital",
      description:
        "A full-stack finance management platform that helps users track spending, plan budgets, and analyze investments using real-time APIs.",
      gallery: [
        "/projects/luxora-1.png",
        "/projects/luxora-2.png",
        "/projects/luxora-3.png"
      ]
    },
    {
      id: "p2",
      createdAt: "2025-03-18",
      title: "FintechX",
      description:
        "A modern fintech web app featuring SIP & EMI calculators, live financial news, and AI-powered financial assistance.",
      gallery: [
        "/projects/fintechx-1.png",
        "/projects/fintechx-2.png",
        "/projects/fintechx-3.png"
      ]
    }
  ]

  return NextResponse.json(projects)
}
