const express = require("express");
const router = express.Router();

const {
    createProduct,
    getAllProducts,
    getProductById,
} = require("../controllers/product.controller");

const { protect, adminOnly } = require("../middleware/authMiddlewares");

// PUBLIC ROUTES
router.get("/", getAllProducts);
router.get("/:id", getProductById);

// ADMIN ROUTE
router.post("/", protect, adminOnly, createProduct);

module.exports = router;
