export type Project = {
  id: string
  createdAt: string
  title: string
  link:
    | string
    | {
        linkedIn?: string
        Github?: string
      }
  description: string
  techstack: Record<string, string>
  gallery: string[]
}

export type Projects = Project[]
