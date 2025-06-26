const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const db = require("../config/db")
const generateVerificationCode = require("../utils/generateVerificationCode")
const { sendVerificationEmail } = require("../services/emailService") // Mocked
require("dotenv").config()

// @desc    Register a new user
// @route   POST /api/auth/signup
// @access  Public
const signupUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    res.status(400)
    throw new Error("Please add all fields")
  }

  // Check if user exists
  const userExists = await db.query("SELECT * FROM users WHERE email = $1", [email])
  if (userExists.rows.length > 0) {
    res.status(400)
    throw new Error("User already exists")
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const password_hash = await bcrypt.hash(password, salt)

  // Generate verification code
  const verification_code = generateVerificationCode()
  const verification_code_expires_at = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

  // Create user
  const newUserQuery = `
    INSERT INTO users (name, email, password_hash, verification_code, verification_code_expires_at)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, name, email, email_verified, created_at
  `
  const newUser = await db.query(newUserQuery, [
    name,
    email,
    password_hash,
    verification_code,
    verification_code_expires_at,
  ])

  if (newUser.rows.length > 0) {
    // Send verification email (mocked)
    try {
      await sendVerificationEmail(email, verification_code)
    } catch (emailError) {
      console.error("Failed to send verification email:", emailError)
      // Decide if signup should fail or just log. For now, proceed.
    }

    res.status(201).json({
      message: "User registered successfully. Please check your email to verify your account.",
      user: newUser.rows[0],
    })
  } else {
    res.status(400)
    throw new Error("Invalid user data")
  }
})

// @desc    Verify user email
// @route   POST /api/auth/verify-email
// @access  Public
const verifyEmail = asyncHandler(async (req, res) => {
  const { email, code } = req.body

  if (!email || !code) {
    res.status(400)
    throw new Error("Email and verification code are required")
  }

  const userResult = await db.query("SELECT * FROM users WHERE email = $1", [email])

  if (userResult.rows.length === 0) {
    res.status(404)
    throw new Error("User not found")
  }

  const user = userResult.rows[0]

  if (user.email_verified) {
    res.status(400)
    throw new Error("Email already verified")
  }

  if (user.verification_code !== code) {
    res.status(400)
    throw new Error("Invalid verification code")
  }

  if (new Date() > new Date(user.verification_code_expires_at)) {
    res.status(400)
    throw new Error("Verification code expired")
    // Optionally, implement resend verification code logic here
  }

  // Update user to verified
  const updateQuery = `
    UPDATE users 
    SET email_verified = TRUE, verification_code = NULL, verification_code_expires_at = NULL, updated_at = CURRENT_TIMESTAMP
    WHERE id = $1
    RETURNING id, name, email, email_verified
  `
  const updatedUser = await db.query(updateQuery, [user.id])

  res.status(200).json({
    message: "Email verified successfully. You can now sign in.",
    user: updatedUser.rows[0],
  })
})

// @desc    Authenticate a user (Sign In)
// @route   POST /api/auth/signin
// @access  Public
const signinUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400)
    throw new Error("Please provide email and password")
  }

  const userResult = await db.query("SELECT * FROM users WHERE email = $1", [email])

  if (userResult.rows.length === 0) {
    res.status(401) // Unauthorized
    throw new Error("Invalid credentials") // Generic message for security
  }

  const user = userResult.rows[0]

  if (!user.email_verified) {
    res.status(403) // Forbidden
    throw new Error("Email not verified. Please check your email for verification instructions.")
  }

  const isMatch = await bcrypt.compare(password, user.password_hash)

  if (isMatch) {
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role /* if you add role */ },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "1d",
      },
    )

    res.json({
      message: "Signed in successfully",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        email_verified: user.email_verified,
        // role: user.role // if you add role
      },
    })
  } else {
    res.status(401)
    throw new Error("Invalid credentials")
  }
})

// @desc    Get current user data
// @route   GET /api/auth/me
// @access  Private (requires token)
const getMe = asyncHandler(async (req, res) => {
  // req.user is attached by the 'protect' middleware
  res.status(200).json(req.user)
})

module.exports = {
  signupUser,
  verifyEmail,
  signinUser,
  getMe,
}
