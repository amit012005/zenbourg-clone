const express = require("express")
const router = express.Router()
const { createBooking, getAllBookings } = require("../controllers/bookingController")
const { protect, admin } = require("../middleware/authMiddleware") // Assuming admin can view all bookings

router.post("/", createBooking) // Could be public or protected
router.get("/", protect, admin, getAllBookings) // Example: only admin can get all bookings

module.exports = router
