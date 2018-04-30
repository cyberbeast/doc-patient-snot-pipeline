const _ = require('lodash');
const Path = require('path-parser').default;
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireDoctor = require('../middlewares/requireDoctor');
const Mailer = require('../services/Mailer');
const enrollmentTemplate = require('../services/emailTemplates/enrollmentTemplate');

const Enrollment = mongoose.model('enrollments');

module.exports = app => {
	app.get('/api/enrollments', requireLogin, async (req, res) => {
		console.log('Handling Enrollment API request');
		if (req.user.userType === 'Doctor') {
			const enrollments = await Enrollment.find({
				_doctor: req.user.id
			}).select('-_doctor -recipient.responses');
			res.send(enrollments);
		} else if (req.user.userType === 'Patient') {
			const enrollments = await Enrollment.find({
				'recipient.email': req.user.email
			}).select('-_doctor -recipient.responses');
			res.send(enrollments);
		} else {
			return res
				.status(403)
				.send({ error: 'You are not authorized to make this call!' });
		}
	});

	app.post(
		'/api/enrollments',
		requireLogin,
		requireDoctor,
		async (req, res) => {
			console.log('Handling enrollment request...');
			const { title, recipient } = req.body;

			const enrollment = new Enrollment({
				title,
				recipient: { email: recipient.trim() },
				_doctor: req.user.id,
				dateCreated: Date.now()
			});

			const mailer = new Mailer(enrollment, enrollmentTemplate(enrollment));

			try {
				await mailer.send();
				await enrollment.save();

				if (req.user.enrolledPatientsCount === undefined) {
					req.user.enrolledPatientsCount = 0;
				}
				req.user.enrolledPatientsCount += 1;
				const user = await req.user.save();
				console.log('Here is user: ', user);

				res.send(user);
			} catch (err) {
				res.status(422).send(err);
			}
		}
	);
};
