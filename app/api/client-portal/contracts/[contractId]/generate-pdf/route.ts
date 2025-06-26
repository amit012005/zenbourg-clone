import { NextResponse } from "next/server"
import { put } from "@vercel/blob"
import { neon } from "@neondatabase/serverless"
import { generateContractPdf } from "@/lib/pdf-utils"
import { auth } from "@/lib/auth" // Your NextAuth auth function
import type { ClientContract } from "@/types/client-portal"

const sql = neon(process.env.DATABASE_URL!)

export async function POST(request: Request, { params }: { params: { contractId: string } }) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  // Add role-based access if needed

  const contractId = Number.parseInt(params.contractId, 10)
  if (isNaN(contractId)) {
    return NextResponse.json({ error: "Invalid contract ID" }, { status: 400 })
  }

  try {
    const contracts = await sql<ClientContract[]>`
      SELECT id, user_id, client_service_id, contract_title, contract_number, effective_date, expiry_date, status, document_url, version, notes
      FROM client_contracts 
      WHERE id = ${contractId} AND user_id = ${session.user.id};
    ` // Or remove user_id check if admin generates

    if (contracts.length === 0) {
      return NextResponse.json({ error: "Contract not found or access denied" }, { status: 404 })
    }
    const contract = contracts[0]

    const pdfBytes = await generateContractPdf(contract)
    const blobFileName = `contracts/${contract.contract_number || contract.id}-${Date.now()}.pdf`

    const blob = await put(blobFileName, pdfBytes, {
      access: "public",
      contentType: "application/pdf",
    })

    await sql`
      UPDATE client_contracts 
      SET document_url = ${blob.url}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${contractId};
    `

    return NextResponse.json({ success: true, pdfUrl: blob.url })
  } catch (error) {
    console.error("Error generating contract PDF:", error)
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 })
  }
}
