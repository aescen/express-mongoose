const mongoose = require('mongoose');
const { nameValidator } = require('../validators');
const { INSTRUCTORS } = require('../consts');

const InstructorsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    validate: nameValidator,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  location: String,
});

const InstructorsModel = mongoose.model(INSTRUCTORS, InstructorsSchema);

module.exports = InstructorsModel;
