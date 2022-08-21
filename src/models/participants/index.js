const mongoose = require('mongoose');
const {
  nameValidator,
  emailValidator,
  phoneValidator,
} = require('../validators');
const { PARTICIPANTS, COURSES } = require('../consts');

const ParticipantsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    validate: nameValidator,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    validate: emailValidator,
  },
  phone: {
    type: String,
    validate: phoneValidator,
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: COURSES,
      // unique: true,
    },
  ],
});

const ParticipantsModel = mongoose.model(PARTICIPANTS, ParticipantsSchema);

module.exports = ParticipantsModel;
