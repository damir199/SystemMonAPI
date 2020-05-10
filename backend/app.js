const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const devicesRoutes = require('./routes/devicedata');
const usersRoutes = require('./routes/users');

const app = express();

mongoose
	.connect(process.env.MONGO_STRING, { useNewUrlParser: true,   useUnifiedTopology: true  })
	.then(() => {
		console.log('Connected to database!');
	})
	.catch(() => {
		console.log(mongoose.Error);
		
		console.log('Connection failed!');
	});

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/devices', devicesRoutes);
app.use('/api/users', usersRoutes);

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, PATCH, PUT, DELETE, OPTIONS'
	);

	next();
});

module.exports = app;
