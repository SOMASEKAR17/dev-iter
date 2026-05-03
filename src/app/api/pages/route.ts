import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const pages = await prisma.customPage.findMany({
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(pages)
  } catch (error) {
    console.error("Error fetching pages:", error)
    return NextResponse.json({ error: "Failed to fetch pages" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { slug, title, html } = body

    if (!slug || !title || !html) {
      return NextResponse.json({ error: "slug, title, and html are required" }, { status: 400 })
    }

    const sanitizedSlug = slug
      .toLowerCase()
      .replace(/^\/+/, "")
      .replace(/[^a-z0-9-_/]/g, "")

    const existing = await prisma.customPage.findUnique({ where: { slug: sanitizedSlug } })
    if (existing) {
      return NextResponse.json({ error: "A page with this endpoint already exists" }, { status: 409 })
    }

    const page = await prisma.customPage.create({
      data: { slug: sanitizedSlug, title, html },
    })

    return NextResponse.json(page, { status: 201 })
  } catch (error) {
    console.error("Error creating page:", error)
    return NextResponse.json({ error: "Failed to create page" }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const { id, slug, title, html } = body

    if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 })

    const sanitizedSlug = slug
      ?.toLowerCase()
      .replace(/^\/+/, "")
      .replace(/[^a-z0-9-_/]/g, "")

    const data: Record<string, string> = {}
    if (sanitizedSlug) data.slug = sanitizedSlug
    if (title) data.title = title
    if (html !== undefined) data.html = html

    const page = await prisma.customPage.update({
      where: { id },
      data,
    })

    return NextResponse.json(page)
  } catch (error) {
    console.error("Error updating page:", error)
    return NextResponse.json({ error: "Failed to update page" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 })

    await prisma.customPage.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting page:", error)
    return NextResponse.json({ error: "Failed to delete page" }, { status: 500 })
  }
}
