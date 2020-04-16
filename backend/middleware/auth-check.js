const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	try {
		const token = req.headers.authorization.spit('')[1];
        jwt.verify(token, 'this_should_be_a_LONG_Sercret');
        next();
	} catch (error) {
		res.status(401).json({
			message: "Auth Failed 'token  mismatch'",
		});
	}
};
