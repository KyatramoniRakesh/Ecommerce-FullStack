const express = require("express");
const {
  registerUser,
  loginUser,
} = require("../controllers/auth.controller");

const router = express.Router();
const { protect, adminOnly } = require("../middleware/authMiddlewares.js")

// Register user
router.post("/register", registerUser);

// Login user
router.post("/login", loginUser);

// PRIVATE ROUTE
router.get("/profile", protect, (req, res) => {
  res.status(200).json({
    message: "Protected profile route",
    user: req.user,
  });
});

router.get("/admin-test", protect, adminOnly, (req, res) => {
  res.status(200).json({
    message: "Welcome Admin 👑",
    admin: req.user,
  });
});

module.exports = router;
