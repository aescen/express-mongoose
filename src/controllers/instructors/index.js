const { InstructorsModel } = require('../../models');
const { validatorGetReason } = require('../../models/validators');

module.exports = {
  addInstructor: async (req, res) => {
    try {
      const { name, dateOfBirth, location } = req.body;

      if (!name || !dateOfBirth) {
        res.status(400);
        res.json({
          status: 'error',
          message: 'Data: name and dateOfBirth is required.',
        });
        return;
      }

      const instructorFound = await InstructorsModel.findOne({
        name,
      });

      if (instructorFound !== null) {
        res.status(400);
        res.json({
          status: 'error',
          message: 'Instructor already exist.',
        });
        return;
      }

      const addedInstructor = new InstructorsModel({
        name,
        dateOfBirth,
        location: location || '',
      });
      await addedInstructor.save();

      res.json({
        status: 'success',
        instructor: addedInstructor,
      });
    } catch (error) {
      if (error.name === 'ValidationError') {
        res.status(400);
        res.json({
          status: 'error',
          message: validatorGetReason(error.message),
        });
        return;
      }

      res.status(500);
      res.json({
        status: 'error',
        message: 'Server error.',
      });
    }
  },
  getAllInstructors: async (req, res) => {
    try {
      const instructors = await InstructorsModel.find({});

      res.json({
        status: 'success',
        data: instructors,
      });
    } catch (error) {
      console.log(error);
      res.status(500);
      res.json({
        status: 'error',
        message: 'Server error.',
      });
    }
  },
  getInstructorById: async (req, res) => {
    try {
      const { id } = req.params;

      const instructor = await InstructorsModel.findById(id).exec();

      if (instructor === null) {
        res.status(404);
        res.json({
          status: 'error',
          message: 'Instructor not found.',
        });
        return;
      }

      res.json({
        status: 'success',
        instructor,
      });
    } catch (error) {
      console.log(error);
      res.status(500);
      res.json({
        status: 'error',
        message: 'Server error.',
      });
    }
  },
  updateInstructorById: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, dateOfBirth, location } = req.body;

      const instructorFound = await InstructorsModel.findById(id).exec();

      if (instructorFound === null) {
        res.status(404);
        res.json({
          status: 'error',
          message: 'Instructor not found.',
        });
        return;
      }

      if (!name || !dateOfBirth) {
        res.status(400);
        res.json({
          status: 'error',
          message: 'Data: name and dateOfBirth is required.',
        });
        return;
      }

      const updatedInstructor = await InstructorsModel.findByIdAndUpdate(
        id,
        { name, dateOfBirth, location: location || '' },
        { new: true },
      ).exec();

      res.json({
        status: 'success',
        instructor: updatedInstructor,
      });
    } catch (error) {
      if (error.name === 'ValidationError') {
        res.status(400);
        res.json({
          status: 'error',
          message: validatorGetReason(error.message),
        });
        return;
      }

      console.log(error);
      res.status(500);
      res.json({
        status: 'error',
        message: 'Server error.',
      });
    }
  },
  deleteInstructorById: async (req, res) => {
    try {
      const { id } = req.params;

      const instructorFound = await InstructorsModel.findById(id).exec();

      if (instructorFound === null) {
        res.status(404);
        res.json({
          status: 'error',
          message: 'Instructor not found.',
        });
        return;
      }

      const deletedInstructor = await InstructorsModel.findByIdAndRemove(
        id,
      ).exec();

      if (deletedInstructor === null) {
        res.status(400);
        res.json({
          status: 'error',
          message: 'Instructor already deleted.',
        });
        return;
      }

      res.json({
        status: 'success',
        instructor: deletedInstructor,
      });
    } catch (error) {
      console.log(error);
      res.status(500);
      res.json({
        status: 'error',
        message: 'Server error.',
      });
    }
  },
};
