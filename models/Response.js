const mongoose = require('mongoose');
const { Schema } = mongoose;

const responseSchema = new Schema({
	responseDate: Date,
	responseValues: Object
});

module.exports = responseSchema;
