const express = require("express")
const router = express.Router()

const { addToCart } = require("../controllers/cart.controller")
const { protect } = require("../middleware/authMiddlewares")

router.post("/add", protect, addToCart)

module.exports = router
