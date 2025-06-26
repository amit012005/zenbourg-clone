"use server"

import { apiClient } from "./api-client"

interface ContactFormData {
  fullName: string
  email: string
  subject: string
  message: string
}

export async function submitContactForm(data: ContactFormData) {
  try {
    const result = await apiClient.createContact(data)
    return result
  } catch (error) {
    console.error("Contact form submission error:", error)
    return {
      success: false,
      error: "Failed to submit contact form",
    }
  }
}
