const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const db = require("../config/db")
const generateVerificationCode = require("../utils/generateVerificationCode")
const { sendEmail } = require("../services/emailService")
require("dotenv").config()

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })
}

// @desc    Register a new user
// @route   POST /api/auth/signup
// @access  Public
const signupUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    res.status(400)
    throw new Error("Please add all fields")
  }

  const userExists = await db.query("SELECT * FROM users WHERE email = $1", [email])
  if (userExists.rows.length > 0) {
    res.status(400)
    throw new Error("User already exists")
  }

  const salt = await bcrypt.genSalt(10)
  const passwordHash = await bcrypt.hash(password, salt)
  const verificationCode = generateVerificationCode()
  const verificationCodeExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

  const newUserResult = await db.query(
    "INSERT INTO users (name, email, password_hash, verification_code, verification_code_expires_at) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, email_verified",
    [name, email, passwordHash, verificationCode, verificationCodeExpiresAt],
  )
  const newUser = newUserResult.rows[0]

  if (newUser) {
    // Send verification email (mocked)
    const verificationUrl = `http://localhost:3000/verify-email?code=${verificationCode}&email=${email}` // Adjust frontend URL
    await sendEmail({
      to: email,
      subject: "Verify Your Email Address for Zenbourg",
      text: `Hello ${name},\n\nPlease verify your email by clicking the following link: ${verificationUrl}\n\nThis code will expire in 24 hours.\n\nIf you did not request this, please ignore this email.\n\nThanks,\nThe Zenbourg Team`,
      html: `<p>Hello ${name},</p><p>Please verify your email by clicking the following link: <a href="${verificationUrl}">${verificationUrl}</a></p><p>This code will expire in 24 hours.</p><p>If you did not request this, please ignore this email.</p><p>Thanks,<br/>The Zenbourg Team</p>`,
    })

    res.status(201).json({
      message: "User registered successfully. Please check your email to verify your account.",
      userId: newUser.id,
      email: newUser.email,
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
    throw new Error("Email and verification code are required.")
  }

  const userResult = await db.query(
    "SELECT * FROM users WHERE email = $1 AND verification_code = $2 AND verification_code_expires_at > NOW()",
    [email, code],
  )

  if (userResult.rows.length === 0) {
    res.status(400)
    throw new Error("Invalid or expired verification code.")
  }

  await db.query(
    "UPDATE users SET email_verified = TRUE, verification_code = NULL, verification_code_expires_at = NULL WHERE email = $1",
    [email],
  )

  res.status(200).json({ message: "Email verified successfully. You can now sign in." })
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
    throw new Error("Invalid credentials")
  }
  const user = userResult.rows[0]

  if (!user.email_verified) {
    res.status(401)
    throw new Error("Email not verified. Please check your email for verification link.")
  }

  const isMatch = await bcrypt.compare(password, user.password_hash)
  if (isMatch) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role, // Assuming you add a role column to users table
      token: generateToken(user.id),
    })
  } else {
    res.status(401)
    throw new Error("Invalid credentials")
  }
})

// @desc    Get user profile
// @route   GET /api/auth/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  // req.user is set by the protect middleware
  res.status(200).json(req.user)
})

module.exports = { signupUser, verifyEmail, signinUser, getMe }
