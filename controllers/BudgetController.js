const BudgetModel = require("../models/BudgetItem");
const CONSTANT_DATA = require("../utils/constants");

const add_budget = async (req, res) => {
	try {
		let {budget_cost, budget_item_name} = req.body
		if (!budget_cost || !budget_item_name) throw new Error(CONSTANT_DATA.MESSAGES.MISSING_FIELD_REQUIRED)
		let payload_data = {budget_cost, budget_item_name}
		let data = await BudgetModel.create(payload_data);
		res.status(201).json({message: CONSTANT_DATA.BUDGET.ADDED, data})
	} catch (error) {
		res.status(500).json({message: error.message})
	}
}

const update_budget = async (req, res) => {
	try {
		let {id} = req.params
		if (!id) throw new Error(CONSTANT_DATA.MESSAGES.MISSING_FIELD_REQUIRED)
		const [data] = await Promise.all([
			BudgetModel.findByIdAndUpdate(id, req.body)
		])
		if (!data) throw new Error(CONSTANT_DATA.MESSAGES.ITEM_NOT_FOUND_WITH_THIS_ID)
		res.status(200).json({message: CONSTANT_DATA.BUDGET.UPDATED})
	} catch (error) {
		res.status(500).json({message: error.message})
	}
}

const delete_budget = async (req, res) => {
    try {
        let { id } = req.params
        const [data] = await Promise.all([
            BudgetModel.findByIdAndDelete(id)
        ])
        console.log(data);
        if (!data) throw new Error(CONSTANT_DATA.MESSAGES.ITEM_NOT_FOUND_WITH_THIS_ID)
        res.status(200).json({message: CONSTANT_DATA.BUDGET.DELETE})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const getBudgetById = async (req, res) => {
	try {
		let { id } = req.params
		const [data] = await Promise.all([
			BudgetModel.findById(id)
		])
		console.log(data);
		if (!data) throw new Error(CONSTANT_DATA.MESSAGES.ITEM_NOT_FOUND_WITH_THIS_ID)
		res.status(200).json({message: CONSTANT_DATA.BUDGET.FETCH_BY_ID, data})
	} catch (error) {
		res.status(500).json({message: error.message})
	}
}

const getBudgetData = async (req, res) => {
	try {
		const [data] = await Promise.all([
			BudgetModel.find({})
		])
		res.status(200).json({
			message: CONSTANT_DATA.BUDGET.FETCH, 
			authenticated_id: req.userId,
			data,
		})
	} catch (error) {
		res.status(500).json({message: error.message})
	}
}

module.exports = {
    add_budget, update_budget, getBudgetById, getBudgetData, delete_budget
}