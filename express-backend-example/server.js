const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const errorHandler = require("./middleware/errorHandler")
// const db = require('./config/db'); // Not directly used here, but ensures pool is initialized

// Load env vars
dotenv.config()

const app = express()

// CORS Middleware - Allow requests from your Next.js frontend
// In production, restrict this to your actual frontend domain
app.use(
  cors({
    origin: process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://your-production-frontend.com",
  }),
)

// Body Parser Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// API Routes
const apiBaseUrl = process.env.API_BASE_URL || "/api"
app.use(`${apiBaseUrl}/auth`, require("./routes/authRoutes"))
app.use(`${apiBaseUrl}/bookings`, require("./routes/bookingRoutes"))
app.use(`${apiBaseUrl}/leads`, require("./routes/leadRoutes"))
// Add other routes here (e.g., services, payments)

// Test Route
app.get(apiBaseUrl, (req, res) => {
  res.json({ message: "Welcome to the Zenbourg Express API!" })
})

// Centralized Error Handler
app.use(errorHandler)

const PORT = process.env.PORT || 5001
app.listen(PORT, () => console.log(`Express server running on port ${PORT}`))
