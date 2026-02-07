const express = require("express")
const router = express.Router()

const { addToCart, getMyCart,updateQuantity , removeItem} = require("../controllers/cart.controller")
const { protect } = require("../middleware/authMiddlewares")

router.post("/add", protect, addToCart)
router.get("/", protect, getMyCart)
router.put("/update", protect, updateQuantity)
router.delete("/remove/:productId", protect, removeItem)

module.exports = router
