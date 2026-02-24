import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
    try {
        const items = await prisma.timelineItem.findMany({
            orderBy: { order: 'asc' }
        })
        return NextResponse.json(items)
    } catch (error: any) {
        console.error("Error fetching timeline:", error)
        return NextResponse.json({ error: "Failed to fetch timeline" }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const item = await prisma.timelineItem.create({
            data: body
        })
        return NextResponse.json(item)
    } catch (error) {
        console.error("Error creating timeline item:", error)
        return NextResponse.json({ error: "Failed to create timeline item" }, { status: 500 })
    }
}

export async function PATCH(request: Request) {
    try {
        const body = await request.json()
        const { id, ...data } = body

        if (!id) {
            return NextResponse.json({ error: "ID is required" }, { status: 400 })
        }

        const item = await prisma.timelineItem.update({
            where: { id },
            data
        })
        return NextResponse.json(item)
    } catch (error) {
        console.error("Error updating timeline item:", error)
        return NextResponse.json({ error: "Failed to update timeline item" }, { status: 500 })
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get("id")

        if (!id) {
            return NextResponse.json({ error: "ID is required" }, { status: 400 })
        }

        await prisma.timelineItem.delete({
            where: { id }
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Error deleting timeline item:", error)
        return NextResponse.json({ error: "Failed to delete timeline item" }, { status: 500 })
    }
}
