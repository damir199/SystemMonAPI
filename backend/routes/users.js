const express = require('express');

const userController  = require('../controllers/user')


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
router.post('/register', userController.creatUser );

router.post('/login', userController.userLogin );

module.exports = router;
