import { query } from "../database"

export interface Service {
  id: string
  name: string
  slug: string
  description?: string
  price: number
  features?: string[]
  isPopular: boolean
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export class ServiceModel {
  static async findAll(): Promise<Service[]> {
    try {
      const result = await query("SELECT * FROM services WHERE is_active = true ORDER BY price ASC")

      return result.rows.map(this.mapRowToService)
    } catch (error) {
      console.error("Error finding all services:", error)
      throw error
    }
  }

  static async findBySlug(slug: string): Promise<Service | null> {
    try {
      const result = await query("SELECT * FROM services WHERE slug = $1 AND is_active = true", [slug])

      if (result.rows.length === 0) return null

      return this.mapRowToService(result.rows[0])
    } catch (error) {
      console.error("Error finding service by slug:", error)
      throw error
    }
  }

  static async findById(id: string): Promise<Service | null> {
    try {
      const result = await query("SELECT * FROM services WHERE id = $1", [id])

      if (result.rows.length === 0) return null

      return this.mapRowToService(result.rows[0])
    } catch (error) {
      console.error("Error finding service by ID:", error)
      throw error
    }
  }

  private static mapRowToService(row: any): Service {
    return {
      id: row.id,
      name: row.name,
      slug: row.slug,
      description: row.description,
      price: Number.parseFloat(row.price),
      features: row.features || [],
      isPopular: row.is_popular || false,
      isActive: row.is_active,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }
  }
}
