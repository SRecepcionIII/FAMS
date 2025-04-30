const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  type: { type: String, enum: ["income", "expense"], required: true },
  category: { type: String, required: true },
  date: { type: Date, default: Date.now },
  description: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  account: { type: mongoose.Schema.Types.ObjectId, ref: "Account", required: true },
});

module.exports = mongoose.model("Transaction", transactionSchema);