"use server"

interface CustomRequestParams {
  fullName: string
  email: string
  phone: string
  businessName: string
  projectDescription: string
  budgetRange: string
  timeline: string
  file: File | null
}

export async function submitCustomRequest(params: CustomRequestParams) {
  try {
    // For demo purposes, we'll ignore the file upload
    const { file, ...requestData } = params

    const response = await fetch("/api/custom-requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })

    if (!response.ok) {
      throw new Error("Failed to submit request")
    }

    const result = await response.json()
    return result
  } catch (error) {
    console.error("Custom request submission error:", error)
    return {
      success: false,
      error: "Failed to submit custom request",
    }
  }
}
