"use server"

import { apiClient } from "./api-client"

interface PaymentIntentParams {
  serviceId: string
  amount: number
  paymentType: string
  paymentMethod: string
}

export async function createPaymentIntent(params: PaymentIntentParams) {
  try {
    const result = await apiClient.createPayment(params)
    return result
  } catch (error) {
    console.error("Payment intent creation error:", error)
    return {
      success: false,
      error: "Failed to create payment intent",
    }
  }
}

export async function verifyPayment(paymentId: string) {
  try {
    const result = await apiClient.verifyPayment(paymentId)
    return result
  } catch (error) {
    console.error("Payment verification error:", error)
    return {
      success: false,
      error: "Failed to verify payment",
    }
  }
}
