import { PDFDocument, rgb, StandardFonts } from "pdf-lib"
import type { ClientInvoice, ClientContract } from "@/types/client-portal" // Assuming types are defined here

export async function generateInvoicePdf(invoice: ClientInvoice): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create()
  const page = pdfDoc.addPage()
  const { width, height } = page.getSize()
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const fontSize = 12
  const smallFontSize = 10

  let y = height - 50

  page.drawText("INVOICE", { x: 50, y, size: 24, font })
  y -= 30

  page.drawText(`Invoice #: ${invoice.invoice_number}`, { x: 50, y, size: fontSize, font })
  page.drawText(`Issue Date: ${new Date(invoice.issue_date).toLocaleDateString()}`, {
    x: width - 200,
    y,
    size: fontSize,
    font,
  })
  y -= 20

  page.drawText(`Due Date: ${new Date(invoice.due_date).toLocaleDateString()}`, {
    x: width - 200,
    y,
    size: fontSize,
    font,
  })
  y -= 30

  // Add more details like client info, company info, line items etc.
  // This is a very basic example.

  page.drawText("Description", { x: 50, y, size: fontSize, font })
  page.drawText("Amount", { x: width - 150, y, size: fontSize, font })
  y -= 20
  page.drawLine({
    start: { x: 50, y },
    end: { x: width - 50, y },
    thickness: 1,
    color: rgb(0.5, 0.5, 0.5),
  })
  y -= 20

  // Example line item (you'd fetch this from related tables or invoice.service_details)
  const serviceName = invoice.client_service_id
    ? `Service ID: ${invoice.client_service_id}`
    : invoice.notes || "Service Rendered"
  page.drawText(serviceName, { x: 50, y, size: smallFontSize, font })
  page.drawText(`${invoice.currency} ${invoice.amount.toFixed(2)}`, {
    x: width - 150,
    y,
    size: smallFontSize,
    font,
    color: rgb(0.1, 0.1, 0.1),
  })
  y -= 30

  page.drawText(`Total: ${invoice.currency} ${invoice.amount.toFixed(2)}`, {
    x: width - 150,
    y,
    size: fontSize,
    font,
    color: rgb(0, 0, 0),
  })
  y -= 50

  page.drawText("Thank you for your business!", { x: 50, y, size: fontSize, font })

  return pdfDoc.save()
}

export async function generateContractPdf(contract: ClientContract): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create()
  let page = pdfDoc.addPage()
  const { width, height } = page.getSize()
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const fontSize = 12

  let y = height - 50

  page.drawText(`CONTRACT: ${contract.contract_title}`, { x: 50, y, size: 18, font })
  y -= 30
  page.drawText(`Contract #: ${contract.contract_number || "N/A"}`, { x: 50, y, size: fontSize, font })
  y -= 20
  page.drawText(`Effective Date: ${new Date(contract.effective_date).toLocaleDateString()}`, {
    x: 50,
    y,
    size: fontSize,
    font,
  })
  y -= 20
  if (contract.expiry_date) {
    page.drawText(`Expiry Date: ${new Date(contract.expiry_date).toLocaleDateString()}`, {
      x: 50,
      y,
      size: fontSize,
      font,
    })
    y -= 20
  }
  page.drawText(`Status: ${contract.status}`, { x: 50, y, size: fontSize, font })
  y -= 30

  // Placeholder for contract content
  page.drawText("Contract Terms and Conditions:", { x: 50, y, size: fontSize, font })
  y -= 20
  const terms =
    contract.notes ||
    "Detailed terms and conditions would be listed here. This document serves as a binding agreement between the parties involved..."

  // Simple text wrapping (basic example)
  const textWidth = width - 100
  const lines = []
  let currentLine = ""
  for (const word of terms.split(" ")) {
    const testLine = currentLine + (currentLine ? " " : "") + word
    if (font.widthOfTextAtSize(testLine, fontSize) > textWidth) {
      lines.push(currentLine)
      currentLine = word
    } else {
      currentLine = testLine
    }
  }
  lines.push(currentLine)

  for (const line of lines) {
    if (y < 50) {
      // Add new page if content overflows
      page = pdfDoc.addPage()
      y = height - 50
    }
    page.drawText(line, { x: 50, y, size: fontSize, font })
    y -= fontSize + 5
  }

  y -= 50
  page.drawText("Signatures:", { x: 50, y, size: fontSize, font })
  // Add signature lines etc.

  return pdfDoc.save()
}
