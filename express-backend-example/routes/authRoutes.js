const express = require("express")
const router = express.Router()
const { signupUser, verifyEmail, signinUser, getMe } = require("../controllers/authController")
const { protect } = require("../middleware/authMiddleware")

router.post("/signup", signupUser)
router.post("/verify-email", verifyEmail)
router.post("/signin", signinUser)
router.get("/me", protect, getMe) // Protected route

module.exports = router
