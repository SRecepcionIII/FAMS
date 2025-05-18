const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  id: String,
  amount: String,
  currency: String,
  type: String,
  date: String,
  description: String,
  category: String,
  source: String,
  status: String,
});

// Prevent OverwriteModelError in watch mode
module.exports = mongoose.models.Transaction || mongoose.model("Transaction", transactionSchema);