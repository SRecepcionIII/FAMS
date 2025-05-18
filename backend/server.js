const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
//const authRoutes = require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionRoutes");

dotenv.config();
const app = express();

const uri = process.env.MONGODB_URI;
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: ["https://fams-m6yv.onrender.com", "http://localhost:3000"] }));
app.use(express.json());

// MongoDB connection
mongoose.connect(uri, {  
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

app.get("/", (req, res) => {
    res.send("API is running...");
});

// Routes
//app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);

app.get('/api/transactions', async (req, res) => {
  const transactions = await Transaction.find();
  res.json(transactions);
});

app.post('/api/transactions', async (req, res) => {
  const transaction = new Transaction(req.body);
  await transaction.save();
  res.json(transaction);
});

app.listen(port, () => console.log(`Server running on port ${port}`));