const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

const enrollmentSchema = new Schema({
	title: String,
	recipient: RecipientSchema,
	_doctor: { type: Schema.Types.ObjectId, ref: 'Doctor' },
	dateCreated: Date
});

mongoose.model('enrollments', enrollmentSchema);
