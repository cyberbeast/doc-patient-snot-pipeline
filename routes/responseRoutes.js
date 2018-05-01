const _ = require('lodash');
const Path = require('path-parser').default;
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireDoctor = require('../middlewares/requireDoctor');

const Enrollment = mongoose.model('enrollments');
const User = mongoose.model('users');
const Doctor = mongoose.model('Doctor');
const Patient = mongoose.model('Patient');

module.exports = app => {
	app.get('/api/responses', requireLogin, requireDoctor, async (req, res) => {
		const responses = await Enrollment.find({
			_doctor: req.user.id
		}).select('recipient');

		res.send(responses);
	});
	app.post('/api/responses', requireLogin, async (req, res) => {
		const newDate = new Date();

		const enrollment = await Enrollment.findOneAndUpdate(
			{ _id: req.body.enrollmentId, 'recipient.email': req.user.email },
			{
				$push: {
					'recipient.responses': {
						responseDate: newDate,
						responseValues: req.body.values
					}
				}
			}
		);

		req.user.lastResponseDate = newDate;
		const user = await req.user.save();
		console.log('Here is user: ', user);

		res.send(user);
	});
};
