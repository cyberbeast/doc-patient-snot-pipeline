module.exports = (req, res, next) => {
	if (req.user.userType !== 'Doctor') {
		return res
			.status(403)
			.send({ error: 'You are not authorized to make this call!' });
	}

	next();
};
