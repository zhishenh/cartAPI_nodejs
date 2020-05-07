const express = require('express');
const mongoose = require('mongoose');
const cartItemRouter = require('./routes/cartItemRouter');
require('dotenv/config');
const bodyParser = require('body-parser');

const app = express()
const PORT = 8000

//Connect to DB
mongoose.connect(process.env.DB_URL, 
	{ useNewUrlParser: true,
		useUnifiedTopology: true }, 
	()=>{console.log("DB connected...")});

// Routers
app.use(bodyParser.json())
app.use('/cartItem', cartItemRouter);

//The Server start listening in the port 8000
app.listen(PORT, () => {console.log('Listenint in the port:' + PORT);});