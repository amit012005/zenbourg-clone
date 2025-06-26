const express = require("express")
const router = express.Router()
const { createContactLead, createChatbotLead } = require("../controllers/leadController")

router.post("/contact", createContactLead)
router.post("/chatbot", createChatbotLead)

module.exports = router
