import { type NextRequest, NextResponse } from "next/server"

// Import the payments array from the main payments route
const payments: any[] = []

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { paymentId } = body

    if (!paymentId) {
      return NextResponse.json({ error: "Payment ID is required" }, { status: 400 })
    }

    // Find and update payment status
    const paymentIndex = payments.findIndex((p) => p.id === paymentId)

    if (paymentIndex === -1) {
      return NextResponse.json({ error: "Payment not found" }, { status: 404 })
    }

    // Update payment status to paid
    payments[paymentIndex] = {
      ...payments[paymentIndex],
      status: "paid",
      paidAt: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      status: "paid",
      payment: payments[paymentIndex],
    })
  } catch (error) {
    console.error("Payment verification error:", error)
    return NextResponse.json({ error: "Failed to verify payment" }, { status: 500 })
  }
}
