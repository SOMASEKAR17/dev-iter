import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

const DEFAULT_SKILLS = {
    languages: [
        { link: "#", text: "JavaScript", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
        { link: "#", text: "TypeScript", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
        { link: "#", text: "Python", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
        { link: "#", text: "C++", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
        { link: "#", text: "C", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
        { link: "#", text: "Java", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
        { link: "#", text: "Go", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg" },
    ],
    webDev: [
        { link: "#", text: "React", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
        { link: "#", text: "Next.js", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
        { link: "#", text: "Tailwind CSS", image: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
        { link: "#", text: "Node.js", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
        { link: "#", text: "Express", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
        { link: "#", text: "MongoDB", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
        { link: "#", text: "Docker", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
        { link: "#", text: "Git", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    ],
    aiMl: [
        { link: "#", text: "Python", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
        { link: "#", text: "NumPy", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" },
        { link: "#", text: "Pandas", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
        { link: "#", text: "Scikit-learn", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg" },
        { link: "#", text: "TensorFlow", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
        { link: "#", text: "PyTorch", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" },
        { link: "#", text: "OpenAI APIs", image: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg" },
        { link: "#", text: "LangChain", image: "https://avatars.githubusercontent.com/u/126733545?s=200&v=4" },
    ],
    cloud: [
        { link: "#", text: "Docker", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
        { link: "#", text: "Vercel", image: "https://cdn.simpleicons.org/vercel/FFFFFF" },
        { link: "#", text: "AWS", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" },
        { link: "#", text: "Google Cloud", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" },
        { link: "#", text: "Firebase", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-original.svg" },
        { link: "#", text: "GitHub Actions", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
    ]
}

export async function GET() {
    try {
        const categories = await prisma.skillCategory.findMany()

        if (categories.length === 0) {
            return NextResponse.json(DEFAULT_SKILLS)
        }

        const skills: any = {}
        categories.forEach((cat: any) => {
            skills[cat.id] = (cat.items as any).items || cat.items
        })

        return NextResponse.json({ ...DEFAULT_SKILLS, ...skills })
    } catch (error) {
        console.error("Error fetching skills:", error)
        return NextResponse.json(DEFAULT_SKILLS)
    }
}

export async function PATCH(request: Request) {
    try {
        const body = await request.json()
        const { category, items } = body

        if (!category || !items) {
            return NextResponse.json({ error: "Category and items are required" }, { status: 400 })
        }

        await prisma.skillCategory.upsert({
            where: { id: category },
            update: { items: { items } },
            create: { id: category, items: { items } }
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Error updating skills:", error)
        return NextResponse.json({ error: "Failed to update skills" }, { status: 500 })
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const category = searchParams.get("category")

        if (!category) {
            return NextResponse.json({ error: "Category is required" }, { status: 400 })
        }

        await prisma.skillCategory.delete({
            where: { id: category }
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Error deleting category:", error)
        return NextResponse.json({ error: "Failed to delete category" }, { status: 500 })
    }
}
