import { query } from "../database"
import bcrypt from "bcryptjs"

export interface User {
  id: string
  email: string
  name: string
  role: "user" | "admin"
  emailVerified: boolean
  avatarUrl?: string
  createdAt: Date
  updatedAt: Date
}

export class UserModel {
  static async findByEmail(email: string): Promise<User | null> {
    try {
      const result = await query(
        "SELECT id, email, name, role, email_verified, avatar_url, created_at, updated_at FROM users WHERE email = $1",
        [email],
      )

      if (result.rows.length === 0) return null

      const row = result.rows[0]
      return {
        id: row.id,
        email: row.email,
        name: row.name,
        role: row.role,
        emailVerified: row.email_verified,
        avatarUrl: row.avatar_url,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
      }
    } catch (error) {
      console.error("Error finding user by email:", error)
      throw error
    }
  }

  static async findById(id: string): Promise<User | null> {
    try {
      const result = await query(
        "SELECT id, email, name, role, email_verified, avatar_url, created_at, updated_at FROM users WHERE id = $1",
        [id],
      )

      if (result.rows.length === 0) return null

      const row = result.rows[0]
      return {
        id: row.id,
        email: row.email,
        name: row.name,
        role: row.role,
        emailVerified: row.email_verified,
        avatarUrl: row.avatar_url,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
      }
    } catch (error) {
      console.error("Error finding user by ID:", error)
      throw error
    }
  }

  static async create(userData: {
    email: string
    password: string
    name: string
    role?: "user" | "admin"
  }): Promise<User> {
    try {
      const hashedPassword = await bcrypt.hash(userData.password, 12)

      const result = await query(
        `INSERT INTO users (email, password_hash, name, role) 
         VALUES ($1, $2, $3, $4) 
         RETURNING id, email, name, role, email_verified, avatar_url, created_at, updated_at`,
        [userData.email, hashedPassword, userData.name, userData.role || "user"],
      )

      const row = result.rows[0]
      return {
        id: row.id,
        email: row.email,
        name: row.name,
        role: row.role,
        emailVerified: row.email_verified,
        avatarUrl: row.avatar_url,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
      }
    } catch (error) {
      console.error("Error creating user:", error)
      throw error
    }
  }

  static async verifyPassword(email: string, password: string): Promise<User | null> {
    try {
      const result = await query(
        "SELECT id, email, password_hash, name, role, email_verified, avatar_url, created_at, updated_at FROM users WHERE email = $1",
        [email],
      )

      if (result.rows.length === 0) return null

      const row = result.rows[0]
      const isValid = await bcrypt.compare(password, row.password_hash)

      if (!isValid) return null

      return {
        id: row.id,
        email: row.email,
        name: row.name,
        role: row.role,
        emailVerified: row.email_verified,
        avatarUrl: row.avatar_url,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
      }
    } catch (error) {
      console.error("Error verifying password:", error)
      throw error
    }
  }
}
