import { NextResponse } from "next/server"
import { db } from "@/firebase/Database/db"
import { ref, get, set } from "firebase/database"

const DEFAULT_CONFIG = {
    featuredProjects: [
        { id: "1", title: "CROWDER.AI", url: "https://res.cloudinary.com/di97k34d0/image/upload/v1768238803/Screenshot_2026-01-12_201642_sej9ra.png" },
        { id: "2", title: "FINTECH-X", url: "https://res.cloudinary.com/di97k34d0/image/upload/v1768238809/Screenshot_2026-01-12_222702_ck1dki.png" },
        { id: "3", title: "GENREAL.AI", url: "https://res.cloudinary.com/di97k34d0/image/upload/v1768238810/Screenshot_2026-01-12_203637_qj96vy.png" }
    ]
}

export async function GET() {
    try {
        const snapshot = await get(ref(db, "config/landing"))
        const val = snapshot.val()
        if (!val) {
            return NextResponse.json(DEFAULT_CONFIG)
        }
        return NextResponse.json(val)
    } catch (error) {
        console.error("Error fetching config:", error)
        return NextResponse.json(DEFAULT_CONFIG)
    }
}

export async function PATCH(request: Request) {
    try {
        const body = await request.json()
        await set(ref(db, "config/landing"), body)
        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Error updating config:", error)
        return NextResponse.json({ error: "Failed to update config" }, { status: 500 })
    }
}
