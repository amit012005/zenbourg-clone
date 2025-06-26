const asyncHandler = require("express-async-handler")
const db = require("../config/db")
// Assuming you have a 'contacts' table similar to your Next.js app
// And a 'chatbot_leads' table

// @desc    Create a new contact lead
// @route   POST /api/leads/contact
// @access  Public
const createContactLead = asyncHandler(async (req, res) => {
  const { fullName, email, subject, message } = req.body // Adjust fields as per your form

  if (!fullName || !email || !message) {
    res.status(400)
    throw new Error("Full name, email, and message are required.")
  }

  // Example: Save to a 'contacts' table
  // Ensure your 'contacts' table schema matches these fields
  const result = await db.query(
    "INSERT INTO contacts (full_name, email, subject, message, source) VALUES ($1, $2, $3, $4, $5) RETURNING id",
    [fullName, email, subject, message, "contact_form"],
  )

  if (result.rows[0]) {
    res.status(201).json({ message: "Contact lead received.", id: result.rows[0].id })
  } else {
    res.status(500)
    throw new Error("Failed to save contact lead.")
  }
})

// @desc    Create a new chatbot lead
// @route   POST /api/leads/chatbot
// @access  Public
const createChatbotLead = asyncHandler(async (req, res) => {
  const { name, email, query, transcript } = req.body // Adjust fields as per your chatbot data

  if (!email || !query) {
    res.status(400)
    throw new Error("Email and query are required for chatbot lead.")
  }

  // Example: Save to a 'chatbot_leads' table
  // Ensure your 'chatbot_leads' table schema matches these fields
  const result = await db.query(
    "INSERT INTO chatbot_leads (name, email, initial_query, full_transcript, status) VALUES ($1, $2, $3, $4, $5) RETURNING id",
    [name, email, query, transcript, "new"],
  )

  if (result.rows[0]) {
    res.status(201).json({ message: "Chatbot lead received.", id: result.rows[0].id })
  } else {
    res.status(500)
    throw new Error("Failed to save chatbot lead.")
  }
})

module.exports = { createContactLead, createChatbotLead }
