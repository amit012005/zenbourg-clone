import { query } from "../database"

export interface Payment {
  id: string
  paymentId: string
  userId?: string
  bookingId?: string
  serviceId?: string
  amount: number
  currency: string
  paymentType: "full" | "installment"
  paymentMethod: string
  status: "pending" | "paid" | "failed" | "refunded"
  gatewayTransactionId?: string
  gatewayResponse?: any
  paidAt?: Date
  createdAt: Date
  updatedAt: Date
}

export class PaymentModel {
  static async create(paymentData: {
    userId?: string
    bookingId?: string
    serviceId?: string
    amount: number
    currency?: string
    paymentType: "full" | "installment"
    paymentMethod: string
  }): Promise<Payment> {
    try {
      const paymentId = `PAY-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

      const result = await query(
        `INSERT INTO payments (
          payment_id, user_id, booking_id, service_id, amount, currency, payment_type, payment_method, status
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *`,
        [
          paymentId,
          paymentData.userId,
          paymentData.bookingId,
          paymentData.serviceId,
          paymentData.amount,
          paymentData.currency || "USD",
          paymentData.paymentType,
          paymentData.paymentMethod,
          "pending",
        ],
      )

      return this.mapRowToPayment(result.rows[0])
    } catch (error) {
      console.error("Error creating payment:", error)
      throw error
    }
  }

  static async findByUserId(
    userId: string,
    options: { status?: string; page?: number; limit?: number } = {},
  ): Promise<Payment[]> {
    try {
      const { status, page = 1, limit = 10 } = options
      const offset = (page - 1) * limit

      let queryText = "SELECT * FROM payments WHERE user_id = $1"
      const params: any[] = [userId]

      if (status) {
        queryText += " AND status = $2"
        params.push(status)
      }

      queryText += " ORDER BY created_at DESC LIMIT $" + (params.length + 1) + " OFFSET $" + (params.length + 2)
      params.push(limit, offset)

      const result = await query(queryText, params)
      return result.rows.map(this.mapRowToPayment)
    } catch (error) {
      console.error("Error finding payments by user ID:", error)
      throw error
    }
  }

  static async findAll(options: { status?: string; page?: number; limit?: number } = {}): Promise<Payment[]> {
    try {
      const { status, page = 1, limit = 10 } = options
      const offset = (page - 1) * limit

      let queryText = "SELECT * FROM payments"
      const params: any[] = []

      if (status) {
        queryText += " WHERE status = $1"
        params.push(status)
      }

      queryText += " ORDER BY created_at DESC LIMIT $" + (params.length + 1) + " OFFSET $" + (params.length + 2)
      params.push(limit, offset)

      const result = await query(queryText, params)
      return result.rows.map(this.mapRowToPayment)
    } catch (error) {
      console.error("Error finding all payments:", error)
      throw error
    }
  }

  static async updateStatus(
    paymentId: string,
    status: "pending" | "paid" | "failed" | "refunded",
    transactionId?: string,
  ): Promise<Payment | null> {
    try {
      const result = await query(
        `UPDATE payments SET 
          status = $1, 
          gateway_transaction_id = COALESCE($2, gateway_transaction_id),
          paid_at = CASE WHEN $1 = 'paid' THEN NOW() ELSE paid_at END,
          updated_at = NOW()
        WHERE payment_id = $3 RETURNING *`,
        [status, transactionId, paymentId],
      )

      if (result.rows.length === 0) return null

      return this.mapRowToPayment(result.rows[0])
    } catch (error) {
      console.error("Error updating payment status:", error)
      throw error
    }
  }

  static async getCount(status?: string): Promise<number> {
    try {
      let queryText = "SELECT COUNT(*) FROM payments"
      const params: any[] = []

      if (status) {
        queryText += " WHERE status = $1"
        params.push(status)
      }

      const result = await query(queryText, params)
      return Number.parseInt(result.rows[0].count)
    } catch (error) {
      console.error("Error getting payment count:", error)
      throw error
    }
  }

  static async getCountByUserId(userId: string, status?: string): Promise<number> {
    try {
      let queryText = "SELECT COUNT(*) FROM payments WHERE user_id = $1"
      const params: any[] = [userId]

      if (status) {
        queryText += " AND status = $2"
        params.push(status)
      }

      const result = await query(queryText, params)
      return Number.parseInt(result.rows[0].count)
    } catch (error) {
      console.error("Error getting payment count by user ID:", error)
      throw error
    }
  }

  private static mapRowToPayment(row: any): Payment {
    return {
      id: row.id,
      paymentId: row.payment_id,
      userId: row.user_id,
      bookingId: row.booking_id,
      serviceId: row.service_id,
      amount: Number.parseFloat(row.amount),
      currency: row.currency,
      paymentType: row.payment_type,
      paymentMethod: row.payment_method,
      status: row.status,
      gatewayTransactionId: row.gateway_transaction_id,
      gatewayResponse: row.gateway_response,
      paidAt: row.paid_at,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }
  }
}
