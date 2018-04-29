const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
	googleId: String,
	userType: {
		type: Object,
		default: {
			category: 'Patient'
		}
	},
	email: String,
	profileImage: String,
	firstName: String,
	lastName: String
});

mongoose.model('users', userSchema);
