const BudgetModel = require("../models/BudgetItem");
const commonFunctions = require("../utils/commonFunctions");
const CONSTANT_DATA = require("../utils/constants");
const moment = require('moment/moment');

const add_budget = async (req, res) => {
	try {
		let { budget_date, budget_list, total_budget } = req.body
		if (!budget_list || !total_budget || !budget_date) throw new Error(CONSTANT_DATA.MESSAGES.MISSING_FIELD_REQUIRED)
		const isDateExistsQuery = BudgetModel.findOne({_id: req.userId, budget_date })

		// Execute the query using exec() method
		const isDateExists = await isDateExistsQuery.exec();
		if (isDateExists) throw new Error(CONSTANT_DATA.MESSAGES.DATE_EXISTED);
		let payload_data = { budget_list, total_budget, budget_date, user_id: req.userId, }
		let data = await BudgetModel.create(payload_data);
		res.status(201).json({ message: CONSTANT_DATA.BUDGET.ADDED, data })
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

const update_budget = async (req, res) => {
	try {
		let { userId } = req;
		let { id } = req.params
		if (!id) throw new Error(CONSTANT_DATA.MESSAGES.MISSING_FIELD_REQUIRED)
		let { budget_date, budget_list, total_budget } = req.body
		let payload_data = { budget_list, total_budget, budget_date, user_id: userId, }
		const [data] = await Promise.all([
			BudgetModel.findByIdAndUpdate(id, payload_data)
		])
		if (!data) throw new Error(CONSTANT_DATA.MESSAGES.ITEM_NOT_FOUND_WITH_THIS_ID)
		res.status(200).json({ message: CONSTANT_DATA.BUDGET.UPDATED })
	} catch (error) {
		res.status(500).json({ message: error.message })
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
		res.status(200).json({ message: CONSTANT_DATA.BUDGET.DELETE })
	} catch (error) {
		res.status(500).json({ message: error.message })
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
		res.status(200).json({ message: CONSTANT_DATA.BUDGET.FETCH_BY_ID, data })
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

const getBudgetData = async (req, res) => {
	try {
		const { startDate, endDate } = req.query;

		// Create a filter object based on the provided dates
		const filter = {
			user_id: req.userId,
		};
		if (startDate) {
			filter.budget_date = { $gte: (startDate) };
		}
		if (endDate) {
			if (!filter.budget_date) filter.budget_date = {};
			filter.budget_date.$lte = (endDate);
		}

		const [data] = await Promise.all([
			BudgetModel.find(filter).sort({ budget_date: -1 })
		])
		res.status(200).json({
			message: CONSTANT_DATA.BUDGET.FETCH,
			data,
		})
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

const getBudgetGraphData = async (req, res) => {

	try {
		const { startDate, endDate, month, year } = req.query;
		const filter = {
			user_id: req.userId,
		};

		if (startDate) {
			filter.budget_date = { $gte: moment(startDate).subtract(1, "days").toISOString() };
		}
		if (endDate) {
			if (!filter.budget_date) filter.budget_date = {};
			filter.budget_date.$lte = endDate;
		}

		const [data] = await Promise.all([
			BudgetModel.find(filter)
				.select('budget_list total_budget budget_date')
				.sort({ budget_date: -1 })
		])

		// const year_data = commonFunctions.budgetGenerateCurrentMonthArray({ MONTH: month || "", YEAR: year || "" })
		const year_data = commonFunctions.budgetGenerateCurrentMonthArray({startDate: startDate, endDate: endDate })

		data?.map((item) => {
			let previous_date = commonFunctions.getDateWithoutTimeZone(item?.budget_date);
			let req_index = year_data.findIndex(elem => elem?.date === item?.budget_date)
			year_data[req_index] = { total_budget: item?.total_budget, date: previous_date,}
		})

		res.status(200).json({
			message: CONSTANT_DATA.BUDGET.FETCH,
			data: year_data,
		})
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

module.exports = {
	add_budget, update_budget, getBudgetById, getBudgetData, delete_budget, getBudgetGraphData
}