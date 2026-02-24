import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

const DEFAULT_CONFIG = {
    featuredProjects: [
        { id: "1", title: "CROWDER.AI", url: "https://res.cloudinary.com/di97k34d0/image/upload/v1768238803/Screenshot_2026-01-12_201642_sej9ra.png" },
        { id: "2", title: "FINTECH-X", url: "https://res.cloudinary.com/di97k34d0/image/upload/v1768238809/Screenshot_2026-01-12_222702_ck1dki.png" },
        { id: "3", title: "GENREAL.AI", url: "https://res.cloudinary.com/di97k34d0/image/upload/v1768238810/Screenshot_2026-01-12_203637_qj96vy.png" }
    ]
}

export async function GET() {
    try {
        const config = await prisma.config.findUnique({
            where: { id: "landing" }
        })
        if (!config) {
            return NextResponse.json(DEFAULT_CONFIG)
        }
        return NextResponse.json(config.content)
    } catch (error) {
        console.error("Error fetching config:", error)
        return NextResponse.json(DEFAULT_CONFIG)
    }
}

export async function PATCH(request: Request) {
    try {
        const body = await request.json()
        await prisma.config.upsert({
            where: { id: "landing" },
            update: { content: body },
            create: { id: "landing", content: body }
        })
        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Error updating config:", error)
        return NextResponse.json({ error: "Failed to update config" }, { status: 500 })
    }
}
