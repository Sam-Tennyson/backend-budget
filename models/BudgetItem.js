const mongoose = require("mongoose")

const BudgetItemSchema = new mongoose.Schema({
    budget_name: String,
    budget_cost: Number,
});

const BudgetSchema = new mongoose.Schema({
    budget_list: {
        type: [BudgetItemSchema],
    },
    total_budget: {
        type: String,
    },
    budget_date: {
        type: String,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RegisterModal"
    },
},
    {timestamps: true,}
)

const BudgetModel = mongoose.model("BudgetModel", BudgetSchema)

module.exports = BudgetModel