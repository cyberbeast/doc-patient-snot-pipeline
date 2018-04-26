const mongoose = require('mongoose');
const { Schema } = mongoose;

const responseSchema = new Schema({
	responseDate: Date,
	response1: Number
});

module.exports = responseSchema;
