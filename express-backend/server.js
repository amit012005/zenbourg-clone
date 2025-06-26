const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const errorHandler = require("./middleware/errorHandler")

// Load env vars
dotenv.config()

// Route files
const authRoutes = require("./routes/authRoutes")
const bookingRoutes = require("./routes/bookingRoutes")
const leadRoutes = require("./routes/leadRoutes")
// Import other route files as you create them (e.g., services, payments)

const app = express()

// CORS Middleware
// Configure CORS more restrictively for production
app.use(
  cors({
    origin: process.env.NODE_ENV === "production" ? "https://your-frontend-domain.com" : "http://localhost:3000", // Frontend URL
    credentials: true, // If you need to send cookies or authorization headers
  }),
)

// Body Parser Middleware
app.use(express.json()) // To parse JSON bodies
app.use(express.urlencoded({ extended: false })) // To parse URL-encoded bodies

// Mount routers
const API_BASE_URL = process.env.API_BASE_URL || "/api"
app.use(`${API_BASE_URL}/auth`, authRoutes)
app.use(`${API_BASE_URL}/bookings`, bookingRoutes)
app.use(`${API_BASE_URL}/leads`, leadRoutes)
// app.use(`${API_BASE_URL}/services`, serviceRoutes); // Example for services
// app.use(`${API_BASE_URL}/payments`, paymentRoutes); // Example for payments

// Centralized Error Handler Middleware (should be last middleware)
app.use(errorHandler)

const PORT = process.env.PORT || 5001

app.listen(PORT, () => {
  console.log(`Express server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`)
})
