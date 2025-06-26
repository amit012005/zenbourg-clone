import { query } from "../database"

export interface EnhancedChatbotLead {
  id: number
  leadUuid: string
  userId?: number
  sessionId: string
  name: string
  email: string
  phone?: string
  country?: string
  address?: string
  serviceInterest?: string
  budgetRange?: string
  timeline?: string
  projectDescription?: string
  leadSource: string
  actionTaken: "book_call" | "request_quote" | "more_info" | "general_inquiry"
  leadScore: number
  status: "new" | "contacted" | "qualified" | "proposal_sent" | "negotiating" | "won" | "lost" | "nurturing"
  assignedTo?: number
  followUpDate?: Date
  notes?: string
  conversionValue?: number
  ipAddress?: string
  userAgent?: string
  referrer?: string
  utmData: any
  conversationData: any
  createdAt: Date
  updatedAt: Date
}

export class EnhancedChatbotLeadModel {
  static async create(leadData: {
    userId?: number
    sessionId: string
    name: string
    email: string
    phone?: string
    country?: string
    address?: string
    serviceInterest?: string
    budgetRange?: string
    timeline?: string
    projectDescription?: string
    actionTaken: "book_call" | "request_quote" | "more_info" | "general_inquiry"
    ipAddress?: string
    userAgent?: string
    referrer?: string
    utmData?: any
    conversationData?: any
  }): Promise<EnhancedChatbotLead> {
    try {
      // Calculate lead score based on provided data
      let leadScore = 0
      if (leadData.phone) leadScore += 15
      if (leadData.budgetRange && !leadData.budgetRange.includes("Under")) leadScore += 20
      if (leadData.timeline && (leadData.timeline.includes("ASAP") || leadData.timeline.includes("1 month")))
        leadScore += 25
      if (leadData.projectDescription && leadData.projectDescription.length > 50) leadScore += 15
      if (leadData.actionTaken === "book_call") leadScore += 25

      const result = await query(
        `INSERT INTO chatbot_leads (
          user_id, session_id, name, email, phone, country, address, service_interest,
          budget_range, timeline, project_description, action_taken, lead_score,
          ip_address, user_agent, referrer, utm_data, conversation_data
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18) 
        RETURNING *`,
        [
          leadData.userId,
          leadData.sessionId,
          leadData.name,
          leadData.email,
          leadData.phone,
          leadData.country,
          leadData.address,
          leadData.serviceInterest,
          leadData.budgetRange,
          leadData.timeline,
          leadData.projectDescription,
          leadData.actionTaken,
          leadScore,
          leadData.ipAddress,
          leadData.userAgent,
          leadData.referrer,
          JSON.stringify(leadData.utmData || {}),
          JSON.stringify(leadData.conversationData || {}),
        ],
      )

      return this.mapRowToLead(result.rows[0])
    } catch (error) {
      console.error("Error creating chatbot lead:", error)
      throw error
    }
  }

  static async findAll(filters?: {
    status?: string
    assignedTo?: number
    leadScore?: { min?: number; max?: number }
    dateRange?: { start: Date; end: Date }
    limit?: number
    offset?: number
  }): Promise<{ leads: EnhancedChatbotLead[]; total: number }> {
    try {
      let whereClause = "WHERE 1=1"
      const params: any[] = []
      let paramIndex = 1

      if (filters?.status) {
        whereClause += ` AND status = $${paramIndex}`
        params.push(filters.status)
        paramIndex++
      }

      if (filters?.assignedTo) {
        whereClause += ` AND assigned_to = $${paramIndex}`
        params.push(filters.assignedTo)
        paramIndex++
      }

      if (filters?.leadScore?.min) {
        whereClause += ` AND lead_score >= $${paramIndex}`
        params.push(filters.leadScore.min)
        paramIndex++
      }

      if (filters?.leadScore?.max) {
        whereClause += ` AND lead_score <= $${paramIndex}`
        params.push(filters.leadScore.max)
        paramIndex++
      }

      if (filters?.dateRange) {
        whereClause += ` AND created_at BETWEEN $${paramIndex} AND $${paramIndex + 1}`
        params.push(filters.dateRange.start, filters.dateRange.end)
        paramIndex += 2
      }

      // Get total count
      const countResult = await query(`SELECT COUNT(*) FROM chatbot_leads ${whereClause}`, params)
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
        `SELECT * FROM chatbot_leads ${whereClause} ORDER BY created_at DESC ${limitClause}`,
        params,
      )

      return {
        leads: result.rows.map(this.mapRowToLead),
        total,
      }
    } catch (error) {
      console.error("Error finding chatbot leads:", error)
      throw error
    }
  }

  static async updateStatus(
    leadUuid: string,
    status: "new" | "contacted" | "qualified" | "proposal_sent" | "negotiating" | "won" | "lost" | "nurturing",
    assignedTo?: number,
    notes?: string,
    conversionValue?: number,
  ): Promise<EnhancedChatbotLead | null> {
    try {
      const result = await query(
        `UPDATE chatbot_leads 
         SET status = $1, assigned_to = $2, notes = $3, conversion_value = $4
         WHERE lead_uuid = $5 
         RETURNING *`,
        [status, assignedTo, notes, conversionValue, leadUuid],
      )

      if (result.rows.length === 0) return null
      return this.mapRowToLead(result.rows[0])
    } catch (error) {
      console.error("Error updating chatbot lead status:", error)
      throw error
    }
  }

  private static mapRowToLead(row: any): EnhancedChatbotLead {
    return {
      id: row.id,
      leadUuid: row.lead_uuid,
      userId: row.user_id,
      sessionId: row.session_id,
      name: row.name,
      email: row.email,
      phone: row.phone,
      country: row.country,
      address: row.address,
      serviceInterest: row.service_interest,
      budgetRange: row.budget_range,
      timeline: row.timeline,
      projectDescription: row.project_description,
      leadSource: row.lead_source,
      actionTaken: row.action_taken,
      leadScore: row.lead_score,
      status: row.status,
      assignedTo: row.assigned_to,
      followUpDate: row.follow_up_date,
      notes: row.notes,
      conversionValue: row.conversion_value,
      ipAddress: row.ip_address,
      userAgent: row.user_agent,
      referrer: row.referrer,
      utmData: row.utm_data,
      conversationData: row.conversation_data,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }
  }
}
