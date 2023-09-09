const mongoose = require("mongoose")

const BudgetSchema = new mongoose.Schema({
    budget_item_name: {
        type: String,
    },
    budget_cost: {
        type: String,
    }
},
    {timestamps: true,}
)

const BudgetModel = mongoose.model("BudgetModel", BudgetSchema)

module.exports = BudgetModel