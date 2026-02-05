const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");

const app = express();

// ✅ Middleware 
app.use(cors());
app.use(express.json());

// ✅ Routes AFTER middleware
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

module.exports = app;
