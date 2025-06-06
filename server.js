require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");



app.use(cors({
  origin: 'https://cms-frontend-six-steel.vercel.app', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));


const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());



// API Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));

// Default route
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


