const { InstructorsModel, CoursesModel } = require('../../models');
const { validatorGetReason } = require('../../models/validators');

module.exports = {
  addCourse: async (req, res) => {
    try {
      const {
        title, description, instructor, scheduleDateTime,
      } = req.body;

      if (!title || !description || !instructor || !scheduleDateTime) {
        res.status(400);
        res.json({
          status: 'error',
          message:
            'Data: title, description, instructor, scheduleDateTime are required.',
        });
        return;
      }

      const courseFound = await CoursesModel.findOne({
        title,
      });

      if (courseFound !== null) {
        res.status(400);
        res.json({
          status: 'error',
          message: 'Course already exist.',
        });
        return;
      }

      let instructorIds = await InstructorsModel.find({}, '_id');

      if (instructorIds === null) {
        res.status(404);
        res.json({
          status: 'error',
          message: 'No instructor found.',
        });
        return;
      }

      instructorIds = instructorIds.map((item) => item._id.toString());

      if (!instructorIds.includes(instructor)) {
        const err = new Error(
          `#reason instructor id '${instructor}' doesn't exist.`,
        );
        err.name = 'ValidationError';
        throw err;
      }

      const addedCourse = new CoursesModel({
        title,
        description,
        instructor,
        scheduleDateTime,
      });
      await addedCourse.save();

      res.json({
        status: 'success',
        course: addedCourse,
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
  getAllCourses: async (req, res) => {
    try {
      const courses = await CoursesModel.find({}).populate(
        'instructor',
        'name',
      );

      res.json({
        status: 'success',
        data: courses,
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
  getCourseById: async (req, res) => {
    try {
      const { id } = req.params;

      const course = await CoursesModel.findById(id)
        .populate('instructor', 'name')
        .exec();

      if (course === null) {
        res.status(404);
        res.json({
          status: 'error',
          message: 'Course not found.',
        });
        return;
      }

      res.json({
        status: 'success',
        course,
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
  updateCourseById: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        title, description, instructor, scheduleDateTime,
      } = req.body;

      const courseFound = await CoursesModel.findById(id).exec();

      if (courseFound === null) {
        res.status(404);
        res.json({
          status: 'error',
          message: 'Course not found.',
        });
        return;
      }

      if (!title || !description || !instructor || !scheduleDateTime) {
        res.status(400);
        res.json({
          status: 'error',
          message:
            'Data: title, description, instructor, scheduleDateTime are required.',
        });
        return;
      }

      let instructorIds = await InstructorsModel.find({}, '_id');

      if (instructorIds === null) {
        res.status(404);
        res.json({
          status: 'error',
          message: 'No instructor found.',
        });
        return;
      }

      instructorIds = instructorIds.map((item) => item._id.toString());

      if (!instructorIds.includes(instructor)) {
        const err = new Error(
          `#reason instructor id '${instructor}' doesn't exist.`,
        );
        err.name = 'ValidationError';
        throw err;
      }

      const updatedCourse = await CoursesModel.findByIdAndUpdate(
        id,
        {
          title,
          description,
          instructor,
          scheduleDateTime,
        },
        { new: true },
      ).exec();

      res.json({
        status: 'success',
        course: updatedCourse,
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
  deleteCourseById: async (req, res) => {
    try {
      const { id } = req.params;

      const courseFound = await CoursesModel.findById(id).exec();

      if (courseFound === null) {
        res.status(404);
        res.json({
          status: 'error',
          message: 'Course not found.',
        });
        return;
      }

      const deletedCourse = await CoursesModel.findByIdAndRemove(id).exec();

      if (deletedCourse === null) {
        res.status(400);
        res.json({
          status: 'error',
          message: 'Course already deleted.',
        });
        return;
      }

      res.json({
        status: 'success',
        course: deletedCourse,
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
