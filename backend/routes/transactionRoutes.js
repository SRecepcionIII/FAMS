const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const Transaction = require("../models/Transaction");

// Get all transactions for a user
router.get("/", protect, async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user._id });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Create a transaction (and update account balance)
router.post("/", protect, async (req, res) => {
  const { amount, type, category, accountId } = req.body;
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const transaction = await Transaction.create(
      [{ ...req.body, user: req.user._id, account: accountId }],
      { session }
    );
    const account = await Account.findById(accountId).session(session);
    account.balance += type === "income" ? amount : -amount;
    await account.save({ session });
    await session.commitTransaction();
    res.status(201).json(transaction);
  } catch (error) {
    await session.abortTransaction();
    res.status(400).json({ message: error.message });
  } finally {
    session.endSession();
  }
});

module.exports = router;