// Import the required modules
const express = require("express")
const router = express.Router()

const { createOrder, verifyOrder } = require("../controllers/Payments")
const { auth, isStudent } = require("../middlewares/auth")
router.post("/capturePayment", auth, isStudent, createOrder)
router.post("/verifySignature", verifyOrder)

module.exports = router;