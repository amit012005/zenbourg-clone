import { query } from "../database"
import bcrypt from "bcryptjs"

export interface EnhancedUser {
  id: number
  userUuid: string
  name: string
  email: string
  phone?: string
  country?: string
  address?: string
  role: "user" | "admin" | "moderator"
  emailVerified: boolean
  avatarUrl?: string
  provider: string
  providerId?: string
  lastLogin?: Date
  loginCount: number
  status: "active" | "inactive" | "suspended"
  metadata: any
  createdAt: Date
  updatedAt: Date
}

export class EnhancedUserModel {
  static async create(userData: {
    name: string
    email: string
    password?: string
    phone?: string
    country?: string
    address?: string
    provider?: string
    providerId?: string
    role?: "user" | "admin" | "moderator"
  }): Promise<EnhancedUser> {
    try {
      let passwordHash = null
      if (userData.password) {
        passwordHash = await bcrypt.hash(userData.password, 12)
      }

      const result = await query(
        `INSERT INTO users (name, email, password_hash, phone, country, address, provider, provider_id, role) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
         RETURNING *`,
        [
          userData.name,
          userData.email,
          passwordHash,
          userData.phone,
          userData.country,
          userData.address,
          userData.provider || "credentials",
          userData.providerId,
          userData.role || "user",
        ],
      )

      return this.mapRowToUser(result.rows[0])
    } catch (error) {
      console.error("Error creating user:", error)
      throw error
    }
  }

  static async findByEmail(email: string): Promise<EnhancedUser | null> {
    try {
      const result = await query("SELECT * FROM users WHERE email = $1", [email])
      if (result.rows.length === 0) return null
      return this.mapRowToUser(result.rows[0])
    } catch (error) {
      console.error("Error finding user by email:", error)
      throw error
    }
  }

  static async findById(id: number): Promise<EnhancedUser | null> {
    try {
      const result = await query("SELECT * FROM users WHERE id = $1", [id])
      if (result.rows.length === 0) return null
      return this.mapRowToUser(result.rows[0])
    } catch (error) {
      console.error("Error finding user by ID:", error)
      throw error
    }
  }

  static async updateLoginInfo(userId: number): Promise<void> {
    try {
      await query("UPDATE users SET last_login = NOW(), login_count = login_count + 1 WHERE id = $1", [userId])
    } catch (error) {
      console.error("Error updating login info:", error)
      throw error
    }
  }

  static async verifyPassword(email: string, password: string): Promise<EnhancedUser | null> {
    try {
      const result = await query("SELECT * FROM users WHERE email = $1", [email])
      if (result.rows.length === 0) return null

      const user = result.rows[0]
      if (!user.password_hash) return null

      const isValid = await bcrypt.compare(password, user.password_hash)
      if (!isValid) return null

      // Update login info
      await this.updateLoginInfo(user.id)

      return this.mapRowToUser(user)
    } catch (error) {
      console.error("Error verifying password:", error)
      throw error
    }
  }

  private static mapRowToUser(row: any): EnhancedUser {
    return {
      id: row.id,
      userUuid: row.user_uuid,
      name: row.name,
      email: row.email,
      phone: row.phone,
      country: row.country,
      address: row.address,
      role: row.role,
      emailVerified: row.email_verified,
      avatarUrl: row.avatar_url,
      provider: row.provider,
      providerId: row.provider_id,
      lastLogin: row.last_login,
      loginCount: row.login_count,
      status: row.status,
      metadata: row.metadata,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }
  }
}
