const { add_budget, update_budget, getBudgetById, getBudgetData, delete_budget, getBudgetGraphData } = require("../controllers/BudgetController");
const express = require("express");
const router = express.Router();

router.post('/', add_budget)
router.put('/:id', update_budget)
router.delete('/:id', delete_budget)
router.get('/:id', getBudgetById)
router.get('/', getBudgetData)

module.exports = router