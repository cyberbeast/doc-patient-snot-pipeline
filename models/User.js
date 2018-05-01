const mongoose = require('mongoose');
const { Schema } = mongoose;

const options = { discriminatorKey: 'userType' };

const userSchema = new Schema(
	{
		googleId: String,
		email: String,
		profileImage: String,
		firstName: String,
		lastName: String
	},
	options
);

const User = mongoose.model('users', userSchema);

const DoctorUser = User.discriminator(
	'Doctor',
	new Schema(
		{
			enrolledPatientsCount: {
				type: Number,
				default: 0
			}
		},
		options
	)
);

const Doctor = mongoose.model('Doctor');

const PatientUser = User.discriminator(
	'Patient',
	new Schema(
		{
			lastResponseDate: Date
		},
		options
	)
);

const Patient = mongoose.model('Patient');
