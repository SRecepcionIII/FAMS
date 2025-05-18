const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
//const authRoutes = require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionRoutes");

dotenv.config();
const app = express();

// Middleware
app.use(cors({ origin: ["https://fams-m6yv.onrender.com", "http://localhost:3000"] }));
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb+srv://srecepcioniii:vFzyaOlJ4jLQ9ylk@cluster0.v9n5j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {  
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));