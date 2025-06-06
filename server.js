require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// ✅ Connect to MongoDB
connectDB();

// ✅ CORS Configuration
app.use(cors({
  origin: 'https://cms-frontend-six-steel.vercel.app', // Vercel frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Include OPTIONS for preflight
  allowedHeaders: ['Content-Type', 'Authorization'],    // Allow necessary headers
  credentials: true
}));

// ✅ Middleware to parse JSON
app.use(express.json());

// ✅ Your API Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));

// ✅ Handle preflight requests globally
app.options("*", cors());

// ✅ Root route to test backend is running
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
