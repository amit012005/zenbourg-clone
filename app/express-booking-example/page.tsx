"use client"

import { useState, type FormEvent } from "react"

const API_URL = process.env.NEXT_PUBLIC_EXPRESS_API_URL

export default function ExpressBookingPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [projectDetails, setProjectDetails] = useState("")
  const [preferredDate, setPreferredDate] = useState("") // Expects YYYY-MM-DDTHH:MM
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setMessage("")
    try {
      const res = await fetch(`${API_URL}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, companyName, projectDetails, preferredDate }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "Booking failed")
      setMessage(`Booking successful! ID: ${data.id}. Check console for mock emails/Meet link.`)
      // Clear form or redirect
    } catch (error: any) {
      setMessage(`Booking error: ${error.message}`)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Book Consultation (via Express)</h1>
      {message && (
        <p
          className={`p-2 my-2 ${message.includes("error") ? "bg-red-200 text-red-800" : "bg-green-200 text-green-800"}`}
        >
          {message}
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Full Name*
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full border p-2"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email*
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full border p-2"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 block w-full border p-2"
          />
        </div>
        <div>
          <label htmlFor="companyName" className="block text-sm font-medium">
            Company Name
          </label>
          <input
            type="text"
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="mt-1 block w-full border p-2"
          />
        </div>
        <div>
          <label htmlFor="projectDetails" className="block text-sm font-medium">
            Project Details*
          </label>
          <textarea
            id="projectDetails"
            value={projectDetails}
            onChange={(e) => setProjectDetails(e.target.value)}
            rows={4}
            required
            className="mt-1 block w-full border p-2"
          ></textarea>
        </div>
        <div>
          <label htmlFor="preferredDate" className="block text-sm font-medium">
            Preferred Date & Time*
          </label>
          <input
            type="datetime-local"
            id="preferredDate"
            value={preferredDate}
            onChange={(e) => setPreferredDate(e.target.value)}
            required
            className="mt-1 block w-full border p-2"
          />
        </div>
        <button type="submit" className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">
          Book Now
        </button>
      </form>
    </div>
  )
}
