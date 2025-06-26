import { neon } from "@neondatabase/serverless"
import type { ServiceData } from "@/types/page-data" // Assuming ServiceData is defined here or imported from models
import type { Service } from "@/lib/models/service" // Using existing model type

const sql = neon(process.env.DATABASE_URL!)

// Re-using the ServiceModel's mapRowToService if possible, or define mapping here
function mapDbRowToServiceData(row: any): ServiceData {
  return {
    id: row.id.toString(), // Ensure ID is string if needed by frontend
    slug: row.slug,
    name: row.name,
    price: Number.parseFloat(row.price),
    description: row.description || "",
    features: row.features || [],
    is_popular: row.is_popular || false,
  }
}

export async function getAllServices(): Promise<ServiceData[]> {
  try {
    // Assuming your services table has 'is_active' and you want to order them
    const dbServices = await sql<Service[]>`
      SELECT id, slug, name, price, description, features, is_popular 
      FROM services 
      WHERE is_active = TRUE 
      ORDER BY price ASC
    `
    return dbServices.map(mapDbRowToServiceData)
  } catch (error) {
    console.error("Failed to fetch services:", error)
    return []
  }
}

export async function getServiceBySlug(slug: string): Promise<ServiceData | null> {
  try {
    const result = await sql<Service[]>`
      SELECT id, slug, name, price, description, features, is_popular
      FROM services
      WHERE slug = ${slug} AND is_active = TRUE
    `
    if (result.length === 0) return null
    return mapDbRowToServiceData(result[0])
  } catch (error) {
    console.error(`Failed to fetch service by slug ${slug}:`, error)
    return null
  }
}
