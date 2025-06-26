const express = require("express")
const router = express.Router()
const { saveContactLead, saveChatbotLead } = require("../controllers/leadController")

router.post("/contact", saveContactLead)
router.post("/chatbot", saveChatbotLead)

module.exports = router
