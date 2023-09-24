const express = require("express")
const { getBudgetGraphData } = require("../controllers/BudgetController")
const router = express.Router()

router.get('/', getBudgetGraphData)

module.exports = router