const express = require("express");
const router = express.Router();
const axios = require("axios");
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
  try {
    const { id } = req.params;
    const updated = await Transaction.findOneAndUpdate({ id }, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Transaction not found." });

    // If status is "completed", send to external server
    if (
      updated.status &&
      updated.status.toLowerCase() === "completed"
    ) {
      const externalUrl = "https://budget-allocation-ij50.onrender.com/api/disbursement";
      try {
        await axios.post(externalUrl, updated);
        console.log("Transaction sent to external server.");
      } catch (externalErr) {
        console.error("Failed to send to external server:", externalErr.message);
      }
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update transaction." });
  }
});

module.exports = router;