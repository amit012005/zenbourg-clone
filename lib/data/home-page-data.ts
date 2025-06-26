import { neon } from "@neondatabase/serverless"
import type { HomePageFeature, HomePageTestimonial, HomePageService, HomePageProject } from "@/types/home-page"

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set")
}

const sql = neon(process.env.DATABASE_URL)

export async function getHomePageFeatures(): Promise<HomePageFeature[]> {
  try {
    const features = await sql<HomePageFeature[]>`
      SELECT id, icon_name, title, description, display_order
      FROM homepage_features
      ORDER BY display_order ASC;
    `
    return features
  } catch (error) {
    console.error("Failed to fetch homepage features:", error)
    return [] // Return empty array on error
  }
}

export async function getHomePageTestimonials(): Promise<HomePageTestimonial[]> {
  try {
    const testimonials = await sql<HomePageTestimonial[]>`
      SELECT id, name, company, text, rating, display_order
      FROM homepage_testimonials
      ORDER BY display_order ASC;
    `
    return testimonials
  } catch (error) {
    console.error("Failed to fetch homepage testimonials:", error)
    return []
  }
}

export async function getHomePageServices(): Promise<HomePageService[]> {
  try {
    const services = await sql<Omit<HomePageService, "features"> & { features: string }>`
      SELECT id, service_slug, name, price, description, features, is_popular, display_order
      FROM homepage_services
      ORDER BY display_order ASC;
    `
    // The 'features' column is JSONB, which neon might return as a string.
    // We need to parse it if it's a string, or handle if it's already an array.
    return services.map((service) => ({
      ...service,
      features: typeof service.features === "string" ? JSON.parse(service.features) : service.features || [],
    }))
  } catch (error) {
    console.error("Failed to fetch homepage services:", error)
    return []
  }
}

export async function getHomePageProjects(): Promise<HomePageProject[]> {
  try {
    const projects = await sql<HomePageProject[]>`
      SELECT id, project_slug, name, domain, image_path, description, live_url, metrics, display_order
      FROM homepage_projects
      ORDER BY display_order ASC;
    `
    return projects
  } catch (error) {
    console.error("Failed to fetch homepage projects:", error)
    return []
  }
}
