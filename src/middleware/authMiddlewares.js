const jwt = require("jsonwebtoken");
const User = require("../models/User.model")

const protect = async (req, res, next) => {
  let token;

  // 1 Check Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // 2️ Extract token
      token = req.headers.authorization.split(" ")[1];

      // 3️ Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4️ Get user from DB (exclude password)
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      next(); // allow access
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  // 5️ No token
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Access denied: Admin only"
    });
  }
  next();
};


module.exports = { protect,adminOnly };
