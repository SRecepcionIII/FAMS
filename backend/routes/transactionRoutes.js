const express = require("express");
const router = express.Router();
//const { protect } = require("../middleware/auth");
const Transaction = require('../models/Transaction');

// Get all transactions
router.get("/", async (req, res) => {
  const transactions = await Transaction.find();
  res.json(transactions);
});

// Add a transaction
router.post("/", async (req, res) => {
  const transaction = new Transaction(req.body);
  await transaction.save();
  res.json(transaction);
});

// Delete transactions by IDs
router.delete("/", async (req, res) => {
  const { ids } = req.body; // expects { ids: [id1, id2, ...] }
  await Transaction.deleteMany({ id: { $in: ids } });
  res.json({ success: true });
});

// Edit a transaction
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updated = await Transaction.findOneAndUpdate({ id }, req.body, { new: true });
  res.json(updated);
});

module.exports = router;