const mongoose = require("mongoose");

const activeBudgetSchema = new mongoose.Schema({
  budget_id: { type: String, required: true },
  active_status: { type: Boolean, required: true }
});

module.exports = mongoose.models.ActiveBudget || mongoose.model("ActiveBudget", activeBudgetSchema);