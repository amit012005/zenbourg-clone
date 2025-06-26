const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")
const db = require("../config/db")
require("dotenv").config()

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // Get user from the token (excluding password)
      const userResult = await db.query("SELECT id, name, email, email_verified, role FROM users WHERE id = $1", [
        decoded.id,
      ])

      if (userResult.rows.length === 0) {
        res.status(401)
        throw new Error("Not authorized, user not found")
      }
      req.user = userResult.rows[0] // Add user object to request
      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error("Not authorized, token failed")
    }
  }

  if (!token) {
    res.status(401)
    throw new Error("Not authorized, no token")
  }
})

// Middleware to check if user is an admin (example)
const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    // Assuming you add a 'role' field to your user model/JWT
    next()
  } else {
    res.status(403) // Forbidden
    throw new Error("Not authorized as an admin")
  }
}

module.exports = { protect, admin }
