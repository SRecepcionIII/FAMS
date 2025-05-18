const express = require("express");
const router = express.Router();
const ActiveBudget = require("../models/ActiveBudget");

// Allow only https://budget-allocation.onrender.com
const cors = require("cors");
router.use(cors({ origin: "https://budget-allocation.onrender.com" }));

// POST /api/activeBudgets
router.post("/", async (req, res) => {
  try {
    const { budget_id } = req.body;
    if (!budget_id) return res.status(400).json({ error: "budget_id is required" });

    // Set all previous active_status to false for this budget_id
    await ActiveBudget.updateMany({ budget_id }, { active_status: false });

    // Create new active budget (latest is true)
    const activeBudget = new ActiveBudget({
      budget_id,
      active_status: true
    });
    await activeBudget.save();

    res.status(201).json(activeBudget);
  } catch (err) {
    console.error("Failed to create activeBudget:", err);
    res.status(500).json({ error: "Failed to create activeBudget" });
  }
});

// GET /api/activeBudgets
router.get("/", async (req, res) => {
  try {
    const budgets = await ActiveBudget.find();
    res.json(budgets);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch active budgets" });
  }
});

module.exports = router;