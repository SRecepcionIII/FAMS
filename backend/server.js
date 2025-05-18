const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
//const authRoutes = require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const activeBudgetRoutes = require("./routes/activeBudgetRoutes");

dotenv.config();
const app = express();

const uri = process.env.MONGODB_URI;
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: ["https://fams-0vk6.onrender.com", "http://localhost:3000"] }));
app.use(express.json());

// MongoDB connection
mongoose.connect(uri)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

app.get("/", (req, res) => {
    res.send("API is running...");
});

// Routes
//app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/activeBudgets", activeBudgetRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));