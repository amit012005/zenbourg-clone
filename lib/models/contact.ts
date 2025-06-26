import { query } from "../database"

export interface Contact {
  id: string
  contactId: string
  fullName: string
  email: string
  subject?: string
  message: string
  status: "unread" | "read" | "replied"
  adminResponse?: string
  createdAt: Date
  updatedAt: Date
}

export class ContactModel {
  static async create(contactData: {
    fullName: string
    email: string
    subject?: string
    message: string
  }): Promise<Contact> {
    try {
      const contactId = `CONT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

      const result = await query(
        `INSERT INTO contacts (contact_id, full_name, email, subject, message) 
         VALUES ($1, $2, $3, $4, $5) 
         RETURNING *`,
        [contactId, contactData.fullName, contactData.email, contactData.subject, contactData.message],
      )

      return this.mapRowToContact(result.rows[0])
    } catch (error) {
      console.error("Error creating contact:", error)
      throw error
    }
  }

  static async findAll(): Promise<Contact[]> {
    try {
      const result = await query("SELECT * FROM contacts ORDER BY created_at DESC")

      return result.rows.map(this.mapRowToContact)
    } catch (error) {
      console.error("Error finding all contacts:", error)
      throw error
    }
  }

  static async updateStatus(
    contactId: string,
    status: "unread" | "read" | "replied",
    adminResponse?: string,
  ): Promise<Contact | null> {
    try {
      const result = await query(
        "UPDATE contacts SET status = $1, admin_response = $2 WHERE contact_id = $3 RETURNING *",
        [status, adminResponse, contactId],
      )

      if (result.rows.length === 0) return null

      return this.mapRowToContact(result.rows[0])
    } catch (error) {
      console.error("Error updating contact status:", error)
      throw error
    }
  }

  private static mapRowToContact(row: any): Contact {
    return {
      id: row.id,
      contactId: row.contact_id,
      fullName: row.full_name,
      email: row.email,
      subject: row.subject,
      message: row.message,
      status: row.status,
      adminResponse: row.admin_response,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }
  }
}
