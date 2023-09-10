// libs
const mongoose = require('mongoose');
const express = require('express')
require('dotenv').config()

// routes
const BudgetRouter = require("./routes/BudgetRoutes");
const UserRouter = require('./routes/UserRoutes');

// middleware
const is_authenticated_user = require('./middleware/auth_middleware');

// app
const app = express()

// variables
const port = process.env.PORT
const MONGO_URL = process.env.MONGO_URL

app.use(express.json())

app.get('/test', (req, res) => {
	res.send('Testing Data Send')
})

app.use("/api/budget", is_authenticated_user, BudgetRouter)
app.use("/api/auth", UserRouter)

mongoose.connect(MONGO_URL)
	.then(() => {
		app.listen(port, () => {
			console.log(`Server listening on port ${port}`)
		})
	})
	.catch((error) => console.log(error));

