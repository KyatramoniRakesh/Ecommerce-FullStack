const express = require("express");

const {
  createOrder,
  getMyOrders,
  getAllOrders,
  getOrderById,
  markOrderPaid,
  updateOrderStatus,
} = require("../controllers/order.controller");

const { protect,adminOnly } = require("../middleware/authMiddlewares")

const router = express.Router();

// USER
router.post("/", protect, createOrder);
router.get("/my-orders", protect, getMyOrders);

// ADMIN
router.get("/admin", protect, adminOnly, getAllOrders);

// COMMON
router.get("/:id", protect, getOrderById);
router.put("/:id/pay", protect, adminOnly, markOrderPaid);
router.put("/:id/status", protect, adminOnly, updateOrderStatus);


module.exports = router;
