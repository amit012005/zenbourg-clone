// ✅ 3. /lib/stripe/create-checkout.ts
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16"
})

interface CheckoutParams {
  email: string
  name: string
  amount: number
  metadata: Record<string, string>
}

export async function createStripeCheckoutSession({
  email,
  name,
  amount,
  metadata
}: CheckoutParams): Promise<string> {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    customer_email: email,
    metadata,
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: metadata.service_name || "Enterprise Service"
          },
          unit_amount: Math.round(amount * 100)
        },
        quantity: 1
      }
    ],
success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/enterprise-consultation?canceled=true`,

  })

  return session.url!
}
