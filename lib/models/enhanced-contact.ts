import { query } from "../database"

export interface EnhancedContact {
  id: number
  contactUuid: string
  userId?: number
  fullName: string
  email: string
  phone?: string
  company?: string
  subject?: string
  message: string
  source: string
  status: "unread" | "read" | "replied" | "resolved" | "spam"
  priority: "low" | "normal" | "high" | "urgent"
  adminResponse?: string
  adminUserId?: number
  respondedAt?: Date
  ipAddress?: string
  userAgent?: string
  referrer?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  metadata: any
  createdAt: Date
  updatedAt: Date
}

export class EnhancedContactModel {
  static async create(contactData: {
    userId?: number
    fullName: string
    email: string
    phone?: string
    company?: string
    subject?: string
    message: string
    source?: string
    ipAddress?: string
    userAgent?: string
    referrer?: string
    utmSource?: string
    utmMedium?: string
    utmCampaign?: string
    metadata?: any
  }): Promise<EnhancedContact> {
    try {
      const result = await query(
        `INSERT INTO contact_submissions (
          user_id, full_name, email, phone, company, subject, message, source,
          ip_address, user_agent, referrer, utm_source, utm_medium, utm_campaign, metadata
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) 
        RETURNING *`,
        [
          contactData.userId,
          contactData.fullName,
          contactData.email,
          contactData.phone,
          contactData.company,
          contactData.subject,
          contactData.message,
          contactData.source || "contact_form",
          contactData.ipAddress,
          contactData.userAgent,
          contactData.referrer,
          contactData.utmSource,
          contactData.utmMedium,
          contactData.utmCampaign,
          JSON.stringify(contactData.metadata || {}),
        ],
      )

      return this.mapRowToContact(result.rows[0])
    } catch (error) {
      console.error("Error creating contact:", error)
      throw error
    }
  }

  static async findAll(filters?: {
    status?: string
    priority?: string
    source?: string
    limit?: number
    offset?: number
  }): Promise<{ contacts: EnhancedContact[]; total: number }> {
    try {
      let whereClause = "WHERE 1=1"
      const params: any[] = []
      let paramIndex = 1

      if (filters?.status) {
        whereClause += ` AND status = $${paramIndex}`
        params.push(filters.status)
        paramIndex++
      }

      if (filters?.priority) {
        whereClause += ` AND priority = $${paramIndex}`
        params.push(filters.priority)
        paramIndex++
      }

      if (filters?.source) {
        whereClause += ` AND source = $${paramIndex}`
        params.push(filters.source)
        paramIndex++
      }

      // Get total count
      const countResult = await query(`SELECT COUNT(*) FROM contact_submissions ${whereClause}`, params)
      const total = Number.parseInt(countResult.rows[0].count)

      // Get paginated results
      let limitClause = ""
      if (filters?.limit) {
        limitClause += ` LIMIT $${paramIndex}`
        params.push(filters.limit)
        paramIndex++
      }
      if (filters?.offset) {
        limitClause += ` OFFSET $${paramIndex}`
        params.push(filters.offset)
      }

      const result = await query(
        `SELECT * FROM contact_submissions ${whereClause} ORDER BY created_at DESC ${limitClause}`,
        params,
      )

      return {
        contacts: result.rows.map(this.mapRowToContact),
        total,
      }
    } catch (error) {
      console.error("Error finding contacts:", error)
      throw error
    }
  }

  static async updateStatus(
    contactUuid: string,
    status: "unread" | "read" | "replied" | "resolved" | "spam",
    adminUserId?: number,
    adminResponse?: string,
  ): Promise<EnhancedContact | null> {
    try {
      const result = await query(
        `UPDATE contact_submissions 
         SET status = $1, admin_user_id = $2, admin_response = $3, responded_at = CASE WHEN $1 = 'replied' THEN NOW() ELSE responded_at END
         WHERE contact_uuid = $4 
         RETURNING *`,
        [status, adminUserId, adminResponse, contactUuid],
      )

      if (result.rows.length === 0) return null
      return this.mapRowToContact(result.rows[0])
    } catch (error) {
      console.error("Error updating contact status:", error)
      throw error
    }
  }

  private static mapRowToContact(row: any): EnhancedContact {
    return {
      id: row.id,
      contactUuid: row.contact_uuid,
      userId: row.user_id,
      fullName: row.full_name,
      email: row.email,
      phone: row.phone,
      company: row.company,
      subject: row.subject,
      message: row.message,
      source: row.source,
      status: row.status,
      priority: row.priority,
      adminResponse: row.admin_response,
      adminUserId: row.admin_user_id,
      respondedAt: row.responded_at,
      ipAddress: row.ip_address,
      userAgent: row.user_agent,
      referrer: row.referrer,
      utmSource: row.utm_source,
      utmMedium: row.utm_medium,
      utmCampaign: row.utm_campaign,
      metadata: row.metadata,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }
  }
}
