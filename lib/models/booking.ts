import { query } from "../database"

export interface Booking {
  id: string
  bookingId: string
  userId?: string
  fullName: string
  email: string
  phone?: string
  serviceId?: string
  serviceName?: string
  bookingDate: Date
  timeSlot: string
  timezone?: string
  notes?: string
  status: "confirmed" | "cancelled" | "completed" | "pending"
  createdAt: Date
  updatedAt: Date
}

export class BookingModel {
  static async create(bookingData: {
    userId?: string
    fullName: string
    email: string
    phone?: string
    serviceId?: string
    serviceName?: string
    bookingDate: Date
    timeSlot: string
    timezone?: string
    notes?: string
  }): Promise<Booking> {
    try {
      const bookingId = `BK-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

      console.log("Creating booking with data:", { ...bookingData, bookingId })

      const result = await query(
        `INSERT INTO bookings (
          booking_id, user_id, full_name, email, phone, service_id, service_name,
          booking_date, time_slot, timezone, notes, status, created_at, updated_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, NOW(), NOW())
        RETURNING *`,
        [
          bookingId,
          bookingData.userId,
          bookingData.fullName,
          bookingData.email,
          bookingData.phone,
          bookingData.serviceId,
          bookingData.serviceName,
          bookingData.bookingDate,
          bookingData.timeSlot,
          bookingData.timezone,
          bookingData.notes,
          "confirmed", // Changed from "pending" to "confirmed"
        ],
      )

      if (result.rows.length === 0) {
        throw new Error("Failed to create booking - no rows returned")
      }

      console.log("Booking created successfully:", result.rows[0])
      return this.mapRowToBooking(result.rows[0])
    } catch (error) {
      console.error("Error creating booking:", error)
      throw new Error(`Failed to create booking: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }

  static async findByUserId(
    userId: string,
    options: { status?: string; page?: number; limit?: number } = {},
  ): Promise<Booking[]> {
    try {
      const { status, page = 1, limit = 10 } = options
      const offset = (page - 1) * limit

      let queryText = "SELECT * FROM bookings WHERE user_id = $1"
      const params: any[] = [userId]

      if (status) {
        queryText += " AND status = $2"
        params.push(status)
      }

      queryText += " ORDER BY created_at DESC LIMIT $" + (params.length + 1) + " OFFSET $" + (params.length + 2)
      params.push(limit, offset)

      const result = await query(queryText, params)
      return result.rows.map(this.mapRowToBooking)
    } catch (error) {
      console.error("Error finding bookings by user ID:", error)
      throw error
    }
  }

  static async findAll(options: { status?: string; page?: number; limit?: number } = {}): Promise<Booking[]> {
    try {
      const { status, page = 1, limit = 10 } = options
      const offset = (page - 1) * limit

      let queryText = "SELECT * FROM bookings"
      const params: any[] = []

      if (status) {
        queryText += " WHERE status = $1"
        params.push(status)
      }

      queryText += " ORDER BY created_at DESC LIMIT $" + (params.length + 1) + " OFFSET $" + (params.length + 2)
      params.push(limit, offset)

      const result = await query(queryText, params)
      return result.rows.map(this.mapRowToBooking)
    } catch (error) {
      console.error("Error finding all bookings:", error)
      throw error
    }
  }

  static async findByBookingId(bookingId: string): Promise<Booking | null> {
    try {
      const result = await query("SELECT * FROM bookings WHERE booking_id = $1", [bookingId])

      if (result.rows.length === 0) return null

      return this.mapRowToBooking(result.rows[0])
    } catch (error) {
      console.error("Error finding booking by ID:", error)
      throw error
    }
  }

  static async findByDateAndTime(date: Date, timeSlot: string): Promise<Booking | null> {
    try {
      const result = await query(
        "SELECT * FROM bookings WHERE DATE(booking_date) = DATE($1) AND time_slot = $2 AND status != 'cancelled'",
        [date, timeSlot],
      )

      if (result.rows.length === 0) return null

      return this.mapRowToBooking(result.rows[0])
    } catch (error) {
      console.error("Error finding booking by date and time:", error)
      throw error
    }
  }

  static async updateStatus(
    bookingId: string,
    status: "confirmed" | "cancelled" | "completed" | "pending",
    notes?: string,
  ): Promise<Booking | null> {
    try {
      const result = await query(
        "UPDATE bookings SET status = $1, notes = COALESCE($2, notes), updated_at = NOW() WHERE booking_id = $3 RETURNING *",
        [status, notes, bookingId],
      )

      if (result.rows.length === 0) return null

      return this.mapRowToBooking(result.rows[0])
    } catch (error) {
      console.error("Error updating booking status:", error)
      throw error
    }
  }

  static async getCount(options: { userId?: string; status?: string } = {}): Promise<number> {
    try {
      const { userId, status } = options
      let queryText = "SELECT COUNT(*) FROM bookings"
      const params: any[] = []

      const conditions: string[] = []

      if (userId) {
        conditions.push(`user_id = $${params.length + 1}`)
        params.push(userId)
      }

      if (status) {
        conditions.push(`status = $${params.length + 1}`)
        params.push(status)
      }

      if (conditions.length > 0) {
        queryText += " WHERE " + conditions.join(" AND ")
      }

      const result = await query(queryText, params)
      return Number.parseInt(result.rows[0].count)
    } catch (error) {
      console.error("Error getting booking count:", error)
      throw error
    }
  }

  private static mapRowToBooking(row: any): Booking {
    return {
      id: row.id,
      bookingId: row.booking_id,
      userId: row.user_id,
      fullName: row.full_name,
      email: row.email,
      phone: row.phone,
      serviceId: row.service_id,
      serviceName: row.service_name,
      bookingDate: row.booking_date,
      timeSlot: row.time_slot,
      timezone: row.timezone,
      notes: row.notes,
      status: row.status,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }
  }
}
