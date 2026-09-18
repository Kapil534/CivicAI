require("dotenv").config();

const express = require("express");
const cors = require("cors");
const db = require("./database/db");

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/admin");
const complaintRoutes = require("./routes/complaints");

const app = express();

const PORT = 5000;

// CORS
app.use(cors({
    origin: "https://kvyas.netlify.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// Uploaded images ko browser me accessible banana
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/complaints", complaintRoutes);

// Home route
app.get("/", (req, res) => {
    res.send("CivicAI Backend is Running");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});