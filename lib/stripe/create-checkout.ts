import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
})

interface CreateCheckoutSessionParams {
  email: string
  name: string
  amount: number
  metadata?: Record<string, string>
}

export async function createStripeCheckoutSession({
  email,
  name,
  amount,
  metadata = {},
}: CreateCheckoutSessionParams): Promise<string> {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name,
          },
          unit_amount: Math.round(amount * 100),
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.NEXTAUTH_URL}/thank-you`,
    cancel_url: `${process.env.NEXTAUTH_URL}/cancel`,
    customer_email: email,
    metadata,
  })

  return session.url!
}
