import { NextResponse } from "next/server"
import { put } from "@vercel/blob"
import { neon } from "@neondatabase/serverless"
import { generateInvoicePdf } from "@/lib/pdf-utils"
import { auth } from "@/lib/auth" // Your NextAuth auth function
import type { ClientInvoice } from "@/types/client-portal"

const sql = neon(process.env.DATABASE_URL!)

export async function POST(request: Request, { params }: { params: { invoiceId: string } }) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  // Add role-based access if needed (e.g., only admin can generate)

  const invoiceId = Number.parseInt(params.invoiceId, 10)
  if (isNaN(invoiceId)) {
    return NextResponse.json({ error: "Invalid invoice ID" }, { status: 400 })
  }

  try {
    const invoices = await sql<ClientInvoice[]>`
      SELECT id, user_id, client_service_id, invoice_number, issue_date, due_date, amount, currency, status, notes
      FROM client_invoices 
      WHERE id = ${invoiceId} AND user_id = ${session.user.id}; 
    ` // Or remove user_id check if admin generates for any user

    if (invoices.length === 0) {
      return NextResponse.json({ error: "Invoice not found or access denied" }, { status: 404 })
    }
    const invoice = invoices[0]

    const pdfBytes = await generateInvoicePdf(invoice)
    const blobFileName = `invoices/${invoice.invoice_number}-${Date.now()}.pdf`

    const blob = await put(blobFileName, pdfBytes, {
      access: "public", // Publicly accessible URL, but unguessable
      contentType: "application/pdf",
    })

    // Update database with blob URL
    await sql`
      UPDATE client_invoices 
      SET pdf_url = ${blob.url}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${invoiceId};
    `

    return NextResponse.json({ success: true, pdfUrl: blob.url })
  } catch (error) {
    console.error("Error generating invoice PDF:", error)
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 })
  }
}
