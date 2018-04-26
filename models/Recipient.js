const mongoose = require('mongoose');
const { Schema } = mongoose;
const ResponseSchema = require('./Response');

const recipientSchema = new Schema({
	email: String,
	responses: [ResponseSchema]
});

module.exports = recipientSchema;
