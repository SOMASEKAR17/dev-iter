import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const page = await prisma.customPage.findUnique({ where: { slug } })

  if (!page) return { title: "Not Found" }

  return {
    title: page.title,
  }
}

export default async function CustomHtmlPage({ params }: PageProps) {
  const { slug } = await params
  const page = await prisma.customPage.findUnique({ where: { slug } })

  if (!page) notFound()

  return <div dangerouslySetInnerHTML={{ __html: page.html }} />
}
