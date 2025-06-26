// API client utility functions for consistent API calls

class ApiClient {
  private baseUrl: string

  constructor(baseUrl = "") {
    this.baseUrl = baseUrl
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}/api${endpoint}`

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error)
      throw error
    }
  }

  // Bookings
  async createBooking(data: any) {
    return this.request("/bookings", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async getBookings(userId?: string) {
    const params = userId ? `?userId=${userId}` : ""
    return this.request(`/bookings${params}`)
  }

  // Payments
  async createPayment(data: any) {
    return this.request("/payments", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async verifyPayment(paymentId: string) {
    return this.request("/payments/verify", {
      method: "POST",
      body: JSON.stringify({ paymentId }),
    })
  }

  async getPayments() {
    return this.request("/payments")
  }

  // Custom Requests
  async createCustomRequest(data: any) {
    return this.request("/custom-requests", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async getCustomRequests() {
    return this.request("/custom-requests")
  }

  // Contacts
  async createContact(data: any) {
    
    return this.request("/contacts", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async getContacts() {
    return this.request("/contacts")
  }

  // Services
  async getServices(popular?: boolean) {
    const params = popular ? "?popular=true" : ""
    return this.request(`/services${params}`)
  }

  async getService(id: string) {
    return this.request(`/services/${id}`)
  }

  // Dashboard
  async getDashboardStats() {
    return this.request("/dashboard/stats")
  }

  // Chatbot
  async sendChatMessage(message: string) {
    return this.request("/chatbot", {
      method: "POST",
      body: JSON.stringify({ message }),
    })
  }
}

export const apiClient = new ApiClient()
