import { NextResponse } from "next/server"
import { db } from "@/firebase/Database/db"
import { ref, get, set } from "firebase/database"

const DEFAULT_SKILLS = {
    languages: [
        { link: "#", text: "JavaScript", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
        { link: "#", text: "TypeScript", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
        { link: "#", text: "Python", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
        { link: "#", text: "C++", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
    ],
    webDev: [
        { link: "#", text: "React", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
        { link: "#", text: "Next.js", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
    ],
    aiMl: [
        { link: "#", text: "Python", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
        { link: "#", text: "NumPy", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" },
    ]
}

export async function GET() {
    try {
        const snapshot = await get(ref(db, "skills"))
        const val = snapshot.val()

        if (!val) {
            return NextResponse.json(DEFAULT_SKILLS)
        }

        const skills: any = {}
        Object.entries(val).forEach(([id, data]: [string, any]) => {
            skills[id] = data.items
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

        await set(ref(db, `skills/${category}`), { items })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Error updating skills:", error)
        return NextResponse.json({ error: "Failed to update skills" }, { status: 500 })
    }
}
