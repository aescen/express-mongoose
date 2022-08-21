const mongoose = require('mongoose');
const { titleValidator, descriptionValidator } = require('../validators');
const { COURSES, INSTRUCTORS } = require('../consts');

const CoursesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    validate: titleValidator,
  },
  description: {
    type: String,
    required: true,
    validate: descriptionValidator,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: INSTRUCTORS,
    required: true,
  },
  scheduleDateTime: {
    type: Date,
    required: true,
  },
});

const CoursesModel = mongoose.model(COURSES, CoursesSchema);

module.exports = CoursesModel;
