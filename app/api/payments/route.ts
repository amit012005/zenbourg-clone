import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import { PaymentModel } from "@/lib/models/payment"
import { BookingModel } from "@/lib/models/booking"
import { z } from "zod"

// Validation schema
const paymentSchema = z.object({
  serviceId: z.string().min(1, "Service ID is required"),
  bookingId: z.string().optional(),
  amount: z.number().positive("Amount must be positive"),
  paymentType: z.enum(["full", "installment"]),
  paymentMethod: z.string().min(1, "Payment method is required"),
  currency: z.string().default("USD"),
})

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const body = await request.json()

    // Validate input
    const validatedData = paymentSchema.parse(body)
    const { serviceId, bookingId, amount, paymentType, paymentMethod, currency } = validatedData

    // Verify booking exists if bookingId provided
    if (bookingId) {
      const booking = await BookingModel.findByBookingId(bookingId)
      if (!booking) {
        return NextResponse.json({ error: "Booking not found" }, { status: 404 })
      }

      // Check if user owns the booking (unless admin)
      if (session?.user?.role !== "admin" && booking.userId !== session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized to pay for this booking" }, { status: 403 })
      }
    }

    // Create payment using database model
    const payment = await PaymentModel.create({
      userId: session?.user?.id,
      bookingId,
      serviceId,
      amount,
      paymentType,
      paymentMethod,
      currency,
    })

    // Simulate payment processing
    const paymentResult = await processPayment(payment, paymentMethod)

    if (paymentResult.success) {
      // Update payment status
      await PaymentModel.updateStatus(payment.paymentId, "paid", paymentResult.transactionId)

      // Update booking status if applicable
      if (bookingId) {
        await BookingModel.updateStatus(bookingId, "confirmed")
      }

      // Send payment confirmation
      await sendPaymentConfirmationEmail(payment)

      return NextResponse.json({
        success: true,
        paymentId: payment.paymentId,
        transactionId: paymentResult.transactionId,
        clientSecret: `${payment.paymentId}_secret`,
        payment: {
          id: payment.paymentId,
          amount: payment.amount,
          status: "paid",
          method: payment.paymentMethod,
        },
      })
    } else {
      // Update payment status to failed
      await PaymentModel.updateStatus(payment.paymentId, "failed")

      return NextResponse.json(
        {
          success: false,
          error: paymentResult.error || "Payment processing failed",
          paymentId: payment.paymentId,
        },
        { status: 400 },
      )
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }
    console.error("Payment creation error:", error)
    return NextResponse.json({ error: "Failed to create payment" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    let payments
    let totalCount

    if (session.user.role !== "admin") {
      payments = await PaymentModel.findByUserId(session.user.id, { status, page, limit })
      totalCount = await PaymentModel.getCountByUserId(session.user.id, status)
    } else {
      payments = await PaymentModel.findAll({ status, page, limit })
      totalCount = await PaymentModel.getCount(status)
    }

    return NextResponse.json({
      payments,
      pagination: {
        page,
        limit,
        total: totalCount,
        pages: Math.ceil(totalCount / limit),
      },
    })
  } catch (error) {
    console.error("Fetch payments error:", error)
    return NextResponse.json({ error: "Failed to fetch payments" }, { status: 500 })
  }
}

// Helper functions
async function processPayment(payment: any, paymentMethod: string) {
  // Simulate payment gateway processing
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Simulate success/failure (90% success rate)
  const isSuccess = Math.random() > 0.1

  if (isSuccess) {
    return {
      success: true,
      transactionId: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    }
  } else {
    return {
      success: false,
      error: "Payment declined by bank",
    }
  }
}

async function sendPaymentConfirmationEmail(payment: any) {
  console.log(`💳 Payment confirmation email sent`)
  console.log(`Payment ID: ${payment.paymentId}`)
  console.log(`Amount: $${payment.amount}`)
  console.log(`Method: ${payment.paymentMethod}`)
}
