import { neon } from "@neondatabase/serverless"
import type { ProjectData, ProjectReviewData } from "@/types/page-data"

const sql = neon(process.env.DATABASE_URL!)

function mapDbRowToProjectData(row: any, reviews: ProjectReviewData[] = []): ProjectData {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    domain: row.domain || "",
    category: row.category || "",
    description: row.description || "",
    image_url: row.image_url || "/placeholder.svg?height=400&width=600",
    live_url: row.live_url || "#",
    case_study_content: row.case_study_content || "",
    completed_date_text: row.completed_date_text || "",
    duration_text: row.duration_text || "",
    technologies: row.technologies || [],
    features: row.features || [],
    metrics: row.metrics || {},
    reviews: reviews, // Reviews will be joined
  }
}

function mapDbRowToProjectReviewData(row: any): ProjectReviewData {
  return {
    id: row.id,
    reviewer_name: row.reviewer_name || "Anonymous",
    reviewer_role: row.reviewer_role || "Client",
    reviewer_avatar_url: row.reviewer_avatar_url || "/placeholder.svg?height=40&width=40",
    rating: row.rating || 5,
    review_text: row.review_text || "",
    review_date_text: row.review_date_text || "",
  }
}

export async function getAllPublishedProjects(): Promise<ProjectData[]> {
  try {
    const projectsResult = await sql`
      SELECT * FROM projects WHERE is_published = TRUE ORDER BY created_at DESC
    `

    const projectsData: ProjectData[] = []

    for (const projectRow of projectsResult) {
      const reviewsResult = await sql`
        SELECT * FROM project_reviews WHERE project_id = ${projectRow.id} ORDER BY created_at DESC
      `
      const reviews = reviewsResult.map(mapDbRowToProjectReviewData)
      projectsData.push(mapDbRowToProjectData(projectRow, reviews))
    }

    return projectsData
  } catch (error) {
    console.error("Failed to fetch all projects:", error)
    return []
  }
}

export async function getProjectBySlug(slug: string): Promise<ProjectData | null> {
  try {
    const projectResult = await sql`
      SELECT * FROM projects WHERE slug = ${slug} AND is_published = TRUE
    `

    if (projectResult.length === 0) return null
    const projectRow = projectResult[0]

    const reviewsResult = await sql`
      SELECT * FROM project_reviews WHERE project_id = ${projectRow.id} ORDER BY created_at DESC
    `
    const reviews = reviewsResult.map(mapDbRowToProjectReviewData)

    return mapDbRowToProjectData(projectRow, reviews)
  } catch (error) {
    console.error(`Failed to fetch project by slug ${slug}:`, error)
    return null
  }
}
