// libs
const mongoose = require('mongoose');
const express = require('express')
const app = express()
const BudgetModel = require("./models/BudgetItem")
require('dotenv').config()

// variables
const port = process.env.PORT
const MONGO_URL = process.env.MONGO_URL

app.use(express.json())

app.get('/test', (req, res) => {
	res.send('Testing Data Send')
})

app.post('/budget', async (req, res) => {
	try {
		let {budget_cost, budget_item_name} = req.body
		if (!budget_cost || !budget_item_name) throw new Error("Missing fields are required")
		let payload_data = {budget_cost, budget_item_name}
		let data = await BudgetModel.create(payload_data);
		res.status(201).json({message: "Budget Added Successfully", data})
	} catch (error) {
		res.status(500).json({message: error.message})
	}
})

app.put('/budget/:id', async (req, res) => {
	try {
		let {id} = req.params
		if (!id) throw new Error("Missing fields are required")
		const [data] = await Promise.all([
			BudgetModel.findByIdAndUpdate(id, req.body)
		])
		if (!data) throw new Error("Cannot find any budget with this ID")
		res.status(200).json({message: "Budget Updated Successfully", data})
	} catch (error) {
		res.status(500).json({message: error.message})
	}
})

app.get('/budget/:id', async (req, res) => {
	try {
		let { id } = req.params
		const [data] = await Promise.all([
			BudgetModel.findById(id)
		])
		console.log(data);
		if (!data) throw new Error("Cannot find any budget with this ID")
		res.status(200).json({message: "Fetch Successfully", data})
	} catch (error) {
		res.status(500).json({message: error.message})
	}
})

app.get('/budget', async (req, res) => {
	try {
		const [data] = await Promise.all([
			BudgetModel.find({})
		])
		res.status(201).json({message: "Budget Fetch Successfully", data})
	} catch (error) {
		res.status(500).json({message: error.message})
	}
})

app.delete('/budget/:id', async (req, res) => {
	try {
		let { id } = req.params
		const [data] = await Promise.all([
			BudgetModel.findByIdAndDelete(id)
		])
		console.log(data);
		if (!data) throw new Error("Cannot find any budget with this ID")
		res.status(200).json({message: "Budget Item Deleted Successfully"})
	} catch (error) {
		res.status(500).json({message: error.message})
	}
})

mongoose.connect(MONGO_URL)
	.then(() => {
		app.listen(port, () => {
			console.log(`Server listening on port ${port}`)
		})
	})
	.catch((error) => console.log(error));

