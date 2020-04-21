const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	try {
		const token = req.headers.authorization.spit('')[1];
        jwt.verify(token, process.env.KEY);
        next();
	} catch (error) {
		res.status(401).json({
			message: "No Authentication to Proceed!'",
		});
	}
};
