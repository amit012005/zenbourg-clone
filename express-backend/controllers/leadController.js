const asyncHandler = require("express-async-handler")
const db = require("../config/db")

// @desc    Save a contact form submission
// @route   POST /api/leads/contact
// @access  Public
const saveContactLead = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body

  if (!name || !email || !message) {
    res.status(400)
    throw new Error("Name, email, and message are required for contact form.")
  }

  // Assuming 'contacts' table exists with columns: name, email, subject, message
  const query = `
    INSERT INTO contacts (name, email, subject, message) 
    VALUES ($1, $2, $3, $4) 
    RETURNING id, name, email, subject, created_at
  `
  const result = await db.query(query, [name, email, subject, message])

  if (result.rows.length > 0) {
    res.status(201).json({
      message: "Contact message received. We will get back to you soon.",
      lead: result.rows[0],
    })
  } else {
    res.status(500)
    throw new Error("Failed to save contact message.")
  }
})

// @desc    Save a chatbot lead
// @route   POST /api/leads/chatbot
// @access  Public
const saveChatbotLead = asyncHandler(async (req, res) => {
  const { sessionId, name, email, phone, inquiryDetails } = req.body // Adjust fields as per your chatbot data

  if (!email && !phone && !inquiryDetails) {
    // Basic validation
    res.status(400)
    throw new Error("Some contact information or inquiry details are required for chatbot lead.")
  }

  // Assuming 'chatbot_leads' table exists with relevant columns
  const query = `
    INSERT INTO chatbot_leads (session_id, name, email, phone, inquiry_details) 
    VALUES ($1, $2, $3, $4, $5) 
    RETURNING id, name, email, created_at
  ` // Adjust columns as needed
  const result = await db.query(query, [sessionId, name, email, phone, inquiryDetails])

  if (result.rows.length > 0) {
    res.status(201).json({
      message: "Chatbot lead captured. We will follow up.",
      lead: result.rows[0],
    })
  } else {
    res.status(500)
    throw new Error("Failed to save chatbot lead.")
  }
})

module.exports = { saveContactLead, saveChatbotLead }
