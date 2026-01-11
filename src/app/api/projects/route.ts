import { NextResponse } from "next/server"

export async function GET() {
  const projects = [
    {
      id: "p1",
      createdAt: "2025-01-12",
      title: "Luxora Capital",
      description:
        "A full-stack finance management platform that helps users track spending, plan budgets, and analyze investments using real-time APIs.",
      techstack: {
        "Next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
        "React": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        "TypeScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
        "Tailwind CSS": "https://cdn.simpleicons.org/tailwindcss/06B6D4",
        "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
        "PostgreSQL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"
      },
      gallery: [
        "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1556155092-8707de31f9c4?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop"
      ]
    },
    {
      id: "p6",
      createdAt: "2025-03-18",
      title: "FintechX",
      description:
        "A modern fintech web app featuring SIP & EMI calculators, live financial news, and AI-powered financial assistance.",
      techstack: {
        "Next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
        "React": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        "Tailwind CSS": "https://cdn.simpleicons.org/tailwindcss/06B6D4",
        "Firebase": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
        "OpenAI": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/openal/openal-original.svg"
      },
      gallery: [
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1581091870627-3f8a41c6f17a?q=80&w=1200&auto=format&fit=crop"
      ]
    },
    {
      id: "p2",
      createdAt: "2025-01-12",
      title: "Luxora Capital",
      description:
        "A full-stack finance management platform that helps users track spending, plan budgets, and analyze investments using real-time APIs.",
      techstack: {
        "Next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
        "React": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        "TypeScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
        "Tailwind CSS": "https://cdn.simpleicons.org/tailwindcss/06B6D4",
        "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
        "PostgreSQL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"
      },
      gallery: [
        "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1556742400-b5f7c5121f35?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1556742031-c6961e8560b0?q=80&w=1200&auto=format&fit=crop"
      ]
    },
    {
      id: "p3",
      createdAt: "2025-01-12",
      title: "Luxora Capital",
      description:
        "A full-stack finance management platform that helps users track spending, plan budgets, and analyze investments using real-time APIs.",
      techstack: {
        "Next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
        "React": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        "TypeScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
        "Tailwind CSS": "https://cdn.simpleicons.org/tailwindcss/06B6D4",
        "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
        "PostgreSQL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"
      },
      gallery: [
        "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop"
      ]
    },
    {
      id: "p4",
      createdAt: "2025-01-12",
      title: "Luxora Capital",
      description:
        "A full-stack finance management platform that helps users track spending, plan budgets, and analyze investments using real-time APIs.",
      techstack: {
        "Next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
        "React": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        "TypeScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
        "Tailwind CSS": "https://cdn.simpleicons.org/tailwindcss/06B6D4",
        "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
        "PostgreSQL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"
      },
      gallery: [
        "https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=1200&auto=format&fit=crop"
      ]
    },
    {
      id: "p5",
      createdAt: "2025-03-18",
      title: "FintechX",
      description:
        "A modern fintech web app featuring SIP & EMI calculators, live financial news, and AI-powered financial assistance.",
      techstack: {
        "Next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
        "React": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        "Tailwind CSS": "https://cdn.simpleicons.org/tailwindcss/06B6D4",
        "Firebase": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
        "OpenAI": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/openal/openal-original.svg"
      },
      gallery: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1581091870627-3f8a41c6f17a?q=80&w=1200&auto=format&fit=crop"
      ]
    }
  ]

  return NextResponse.json(projects)
}
