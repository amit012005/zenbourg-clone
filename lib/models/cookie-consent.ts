import { query } from "../database"

export interface CookieConsent {
  id: number
  consentUuid: string
  userId?: number
  sessionId?: string
  ipAddress?: string
  userAgent?: string
  necessary: boolean
  functional: boolean
  analytics: boolean
  marketing: boolean
  preferences: any
  consentDate: Date
  updatedAt: Date
  expiresAt: Date
}

export class CookieConsentModel {
  static async create(consentData: {
    userId?: number
    sessionId?: string
    ipAddress?: string
    userAgent?: string
    necessary: boolean
    functional: boolean
    analytics: boolean
    marketing: boolean
    preferences?: any
  }): Promise<CookieConsent> {
    try {
      const result = await query(
        `INSERT INTO cookie_consents (user_id, session_id, ip_address, user_agent, necessary, functional, analytics, marketing, preferences) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
         RETURNING *`,
        [
          consentData.userId,
          consentData.sessionId,
          consentData.ipAddress,
          consentData.userAgent,
          consentData.necessary,
          consentData.functional,
          consentData.analytics,
          consentData.marketing,
          JSON.stringify(consentData.preferences || {}),
        ],
      )

      return this.mapRowToConsent(result.rows[0])
    } catch (error) {
      console.error("Error creating cookie consent:", error)
      throw error
    }
  }

  static async findBySessionId(sessionId: string): Promise<CookieConsent | null> {
    try {
      const result = await query(
        "SELECT * FROM cookie_consents WHERE session_id = $1 ORDER BY consent_date DESC LIMIT 1",
        [sessionId],
      )
      if (result.rows.length === 0) return null
      return this.mapRowToConsent(result.rows[0])
    } catch (error) {
      console.error("Error finding cookie consent by session:", error)
      throw error
    }
  }

  static async updateConsent(consentUuid: string, updates: Partial<CookieConsent>): Promise<CookieConsent | null> {
    try {
      const setClause = Object.keys(updates)
        .map((key, index) => `${key} = $${index + 2}`)
        .join(", ")

      const values = [consentUuid, ...Object.values(updates)]

      const result = await query(`UPDATE cookie_consents SET ${setClause} WHERE consent_uuid = $1 RETURNING *`, values)

      if (result.rows.length === 0) return null
      return this.mapRowToConsent(result.rows[0])
    } catch (error) {
      console.error("Error updating cookie consent:", error)
      throw error
    }
  }

  private static mapRowToConsent(row: any): CookieConsent {
    return {
      id: row.id,
      consentUuid: row.consent_uuid,
      userId: row.user_id,
      sessionId: row.session_id,
      ipAddress: row.ip_address,
      userAgent: row.user_agent,
      necessary: row.necessary,
      functional: row.functional,
      analytics: row.analytics,
      marketing: row.marketing,
      preferences: row.preferences,
      consentDate: row.consent_date,
      updatedAt: row.updated_at,
      expiresAt: row.expires_at,
    }
  }
}
