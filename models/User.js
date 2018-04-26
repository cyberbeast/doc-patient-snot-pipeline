const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
	googleId: String,
	userType: { type: String, default: 'Patient' }
});

mongoose.model('users', userSchema);
