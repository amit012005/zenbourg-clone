import { neon } from "@neondatabase/serverless"
import type { PageTextContent } from "@/types/page-data"

const sql = neon(process.env.DATABASE_URL!)

export async function getPageTextContent(pageKey: string): Promise<PageTextContent> {
  try {
    const contentItems = await sql`
      SELECT element_key, content_value FROM page_content WHERE page_key = ${pageKey}
    `

    const contentMap: PageTextContent = {}
    for (const item of contentItems) {
      contentMap[item.element_key] = item.content_value
    }
    return contentMap
  } catch (error) {
    console.error(`Failed to fetch page content for ${pageKey}:`, error)
    return {} // Return empty object on error
  }
}
