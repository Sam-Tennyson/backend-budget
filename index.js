// libs
const mongoose = require('mongoose');
const express = require('express')
const cors = require('cors')
require('dotenv').config()

// routes
const BudgetRouter = require("./routes/BudgetRoutes");
const UserRouter = require('./routes/UserRoutes');
const BudgetGraphRouter = require('./routes/BudgetGraphRoutes');

// middleware
const is_authenticated_user = require('./middleware/auth_middleware');

// app
const app = express()

// variables
const port = process.env.PORT
const MONGO_URL = process.env.MONGO_URL

app.use(cors())
app.use(express.json())

app.get('/test', (req, res) => {
	res.send('Testing Data Send')
})

app.use("/api/budget", is_authenticated_user, BudgetRouter)
app.use("/api/budget-graph", is_authenticated_user, BudgetGraphRouter)
app.use("/api/auth", UserRouter)

mongoose.connect(MONGO_URL)
// mongoose.connect("mongodb://localhost:27017/budgetController", { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		app.listen(port, () => {
			console.log(`Server listening on port ${port}`)
		})
	})
	.catch((error) => console.log(error));

