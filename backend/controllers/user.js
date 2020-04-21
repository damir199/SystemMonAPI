const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.creatUser = (req, res, next) => {
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
					message: 'User created',
					result: result,
				});
			})
			//if there is an error reply with the error details
			.catch((err) => {
				res.status(500).json({
					message: 'Failure! User already exists',
					error: err,
				});
			});
	});
}

exports.userLogin = (req, res, next) => {
	let fetchedUser;
	//first check the email is valid
	User.findOne({ email: req.body.email })
		.then((user) => {
			if (!user) {
				//failure if no email
				return res.status(401).json({
					message: 'Faild to Validate User',
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
					message: "Faild Validate User 2!",
				});
			}
			//if hashes match create jwt web token with 'secret'
			const token = jwt.sign(
				{ email: fetchedUser.email, userId: fetchedUser._id },
				process.env.KEY,
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
		//if there is another problem apart from above then throw an error with the error details.
		.catch((err) => {
			console.log(err);
			return res.status(401).json({
				message: 'Major Failure - Contact Support' + process.env.KEY,
			});
		});
}