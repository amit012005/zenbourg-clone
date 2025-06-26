"use client"

import { useState, type FormEvent } from "react"

// This should match the URL where your Express backend is running,
// prefixed with NEXT_PUBLIC_ so it's available in the browser.
// You would set this in your Next.js project's .env.local file:
// NEXT_PUBLIC_EXPRESS_API_URL=http://localhost:5001/api
const API_URL = process.env.NEXT_PUBLIC_EXPRESS_API_URL

export default function ExpressAuthPage() {
  // State for form inputs
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [verificationCode, setVerificationCode] = useState("")

  // State for messages and tokens
  const [message, setMessage] = useState("")
  const [token, setToken] = useState<string | null>(null)
  const [currentUser, setCurrentUser] = useState<any>(null)

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault()
    setMessage("")
    if (!API_URL) {
      setMessage("API URL is not configured. Check NEXT_PUBLIC_EXPRESS_API_URL.")
      return
    }
    try {
      const res = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "Sign up failed")
      setMessage(data.message || "Sign up successful! Check email for verification (mocked in backend console).")
    } catch (error: any) {
      setMessage(`Sign up error: ${error.message}`)
    }
  }

  const handleVerifyEmail = async (e: FormEvent) => {
    e.preventDefault()
    setMessage("")
    if (!API_URL) {
      setMessage("API URL is not configured.")
      return
    }
    try {
      const res = await fetch(`${API_URL}/auth/verify-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code: verificationCode }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "Email verification failed")
      setMessage(data.message || "Email verified! You can now sign in.")
    } catch (error: any) {
      setMessage(`Verification error: ${error.message}`)
    }
  }

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault()
    setMessage("")
    setToken(null)
    setCurrentUser(null)
    if (!API_URL) {
      setMessage("API URL is not configured.")
      return
    }
    try {
      const res = await fetch(`${API_URL}/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "Sign in failed")
      setMessage("Sign in successful!")
      setToken(data.token)
      // In a real app, store token securely (e.g., in HttpOnly cookies managed by the backend,
      // or carefully in localStorage/sessionStorage if appropriate for your security model,
      // or in a state management solution like Zustand/Redux/Context API).
      localStorage.setItem("jwtToken", data.token) // For demo purposes
    } catch (error: any) {
      setMessage(`Sign in error: ${error.message}`)
    }
  }

  const handleGetMe = async () => {
    setMessage("")
    if (!API_URL) {
      setMessage("API URL is not configured.")
      return
    }
    const storedToken = localStorage.getItem("jwtToken") // For demo purposes
    if (!storedToken) {
      setMessage("No token found. Please sign in.")
      return
    }
    try {
      const res = await fetch(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      const data = await res.json()
      if (!res.ok) {
        // If token is invalid/expired, backend might send 401 or 403
        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem("jwtToken") // Clear invalid token
          setToken(null)
          setCurrentUser(null)
        }
        throw new Error(data.message || "Failed to fetch profile")
      }
      setCurrentUser(data.user) // Assuming backend sends { user: {...} }
      setMessage("Profile fetched successfully.")
    } catch (error: any) {
      setMessage(`Profile fetch error: ${error.message}`)
      setCurrentUser(null)
    }
  }

  // Basic styling for demonstration. You'd use Tailwind CSS or other styling solutions.
  const inputStyle = "border p-2 w-full rounded mb-2 text-black"
  const buttonStyle = "bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
  const sectionStyle = "p-4 border rounded-lg shadow mb-6 bg-gray-50 dark:bg-gray-800"

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">Express Backend Auth Demo</h1>

      {message && (
        <div
          className={`p-3 my-4 rounded-md text-sm ${
            message.toLowerCase().includes("error") || message.toLowerCase().includes("failed")
              ? "bg-red-100 text-red-700 border border-red-300 dark:bg-red-900 dark:text-red-200 dark:border-red-700"
              : "bg-green-100 text-green-700 border border-green-300 dark:bg-green-900 dark:text-green-200 dark:border-green-700"
          }`}
        >
          {message}
        </div>
      )}

      <section className={sectionStyle}>
        <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">Sign Up</h2>
        <form onSubmit={handleSignUp} className="space-y-3">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
            className={inputStyle}
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email for Sign Up/Verify/Sign In"
            required
            className={inputStyle}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className={inputStyle}
          />
          <button type="submit" className={`${buttonStyle} w-full`}>
            Sign Up
          </button>
        </form>
      </section>

      <section className={sectionStyle}>
        <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">Verify Email</h2>
        <form onSubmit={handleVerifyEmail} className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email used for sign up"
            required
            className={inputStyle}
          />
          <input
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder="Verification Code (check backend console)"
            required
            className={inputStyle}
          />
          <button type="submit" className={`${buttonStyle} bg-green-600 hover:bg-green-700 w-full`}>
            Verify Email
          </button>
        </form>
      </section>

      <section className={sectionStyle}>
        <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">Sign In</h2>
        <form onSubmit={handleSignIn} className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className={inputStyle}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className={inputStyle}
          />
          <button type="submit" className={`${buttonStyle} bg-purple-600 hover:bg-purple-700 w-full`}>
            Sign In
          </button>
        </form>
        {token && (
          <div className="mt-3 p-2 bg-gray-100 dark:bg-gray-700 rounded text-xs text-gray-600 dark:text-gray-300 overflow-x-auto">
            <strong>Token:</strong> {token.substring(0, 40)}...
          </div>
        )}
      </section>

      <section className={sectionStyle}>
        <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">My Profile (Protected Route)</h2>
        <button onClick={handleGetMe} className={`${buttonStyle} bg-teal-600 hover:bg-teal-700 w-full`}>
          Get My Profile
        </button>
        {currentUser && (
          <pre className="mt-3 p-3 bg-gray-100 dark:bg-gray-700 rounded text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
            {JSON.stringify(currentUser, null, 2)}
          </pre>
        )}
      </section>
    </div>
  )
}
