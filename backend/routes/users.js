const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const router = express.Router();

//Get users route for testing.
router.get('', (req, res, next) => {
	User.find().then((documents) => {
		console.log(documents);
		res.status(200).json({
			message: 'Users fetched successfully!',
			users: documents,
		});
	});
});

//Resgister user route
router.post('/register', (req, res, next) => {
	//hash the provided password
	bcrypt.hash(req.body.password, 10).then((hash) => {
		//Use hashed password and users email to create a new user securely
		const user = new User({
			email: req.body.email,
			password: hash,
		});
		//save the new user to the database
		user
			.save()
			.then((result) => {
				res.status(201).json({
					message: 'user created',
					result: result,
				});
			})
			//if there is an error reply with the error details
			.catch((err) => {
				res.status(500).json({
					message: 'failed to create user',
					error: err,
				});
			});
	});
});

router.post('/login', (req, res, next) => {
	let fetchedUser;
	//first check the email is valid
	User.findOne({ email: req.body.email })
		.then((user) => {
			if (!user) {
				//failure if no email
				return res.status(401).json({
					message: "Auth Failed 1 'Email doesnt match'",
				});
			}
			fetchedUser = user;
			//if user exists, compare the hashed passwords
			return bcrypt.compare(req.body.password, user.password);
		})
		.then((result) => {
			//if password hashes dont match return error
			if (!result) {
				return res.status(401).json({
					message: "Auth Failed 2 'Password hash mismatch'",
				});
			}
			//if hashes match create jwt web token with 'secret'
			const token = jwt.sign(
				{ email: fetchedUser.email, userId: fetchedUser._id },
				'this_should_be_a_LONG_Sercret',
				{
					expiresIn: '1h',
				}
			);
			//return the token as the response
			res.status(200).json({
				token: token,
				expiresIn: 3600,
			});
		})
		//if there is another problem aart from above then throw an error with the error details.
		.catch((err) => {
			console.log(err);
			return res.status(401).json({
				message: 'Auth Failed 3',
			});
		});
});

module.exports = router;
