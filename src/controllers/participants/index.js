const { CoursesModel, ParticipantsModel } = require('../../models');
const { INSTRUCTORS } = require('../../models/consts');
const { validatorGetReason } = require('../../models/validators');

module.exports = {
  addParticipant: async (req, res) => {
    try {
      const {
        name, dateOfBirth, email, phone, courses,
      } = req.body;

      if (!name || !dateOfBirth) {
        res.status(400);
        res.json({
          status: 'error',
          message: 'Data: name and dateOfBirth is required.',
        });
        return;
      }

      const participantFound = await ParticipantsModel.findOne({
        name,
      });

      if (participantFound !== null) {
        res.status(400);
        res.json({
          status: 'error',
          message: 'Participant already exist.',
        });
        return;
      }

      const theCourses = typeof courses !== 'object' ? [courses] : [...courses];
      if (theCourses[0]) {
        let coursesIds = await CoursesModel.find({}, '_id');

        if (coursesIds === null) {
          res.status(404);
          res.json({
            status: 'error',
            message: 'No course found.',
          });
          return;
        }

        coursesIds = coursesIds.map((item) => item._id.toString());
        const newParticipantCourses = [...theCourses];

        newParticipantCourses.forEach((item) => {
          if (!coursesIds.includes(item)) {
            const err = new Error(`#reason course id '${item}' doesn't exist.`);
            err.name = 'ValidationError';
            throw err;
          }
        });
      }

      const addedParticipant = new ParticipantsModel({
        name,
        dateOfBirth,
        email: email || '',
        phone: phone || '',
        courses: courses || [],
      });
      await addedParticipant.save();

      res.json({
        status: 'success',
        participant: addedParticipant,
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
  addParticipantCoursesById: async (req, res) => {
    try {
      const { id } = req.params;
      const { courses } = req.body;

      const participantFound = await ParticipantsModel.findById(id).exec();

      if (participantFound === null) {
        res.status(404);
        res.json({
          status: 'error',
          message: 'Participant not found.',
        });
        return;
      }

      if (!courses) {
        res.status(400);
        res.json({
          status: 'error',
          message: 'Data: courses is required.',
        });
        return;
      }

      const newCourses = typeof courses !== 'object' ? [courses] : [...courses];

      let coursesIds = await CoursesModel.find({}, '_id');

      if (coursesIds === null) {
        res.status(404);
        res.json({
          status: 'error',
          message: 'No course found.',
        });
        return;
      }

      coursesIds = coursesIds.map((item) => item._id.toString());
      newCourses.forEach((item) => {
        if (!coursesIds.includes(item)) {
          const err = new Error(`#reason course id '${item}' doesn't exist.`);
          err.name = 'ValidationError';
          throw err;
        }
      });

      const participantCourses = participantFound.courses.map((item) => item._id.toString());

      const newParticipantCourses = Array.from(
        new Set([...participantCourses, ...newCourses]),
      );

      const newParticipant = await ParticipantsModel.findByIdAndUpdate(
        id,
        {
          courses: newParticipantCourses,
        },
        { new: true },
      ).exec();

      res.json({
        status: 'success',
        participant: newParticipant,
      });
    } catch (error) {
      console.dir(error);
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
  getAllParticipants: async (req, res) => {
    try {
      const participants = await ParticipantsModel.find({}).populate({
        path: 'courses',
        populate: [
          {
            path: 'instructor',
            model: INSTRUCTORS,
            select: 'name',
          },
        ],
      });

      res.json({
        status: 'success',
        data: participants,
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
  getParticipantById: async (req, res) => {
    try {
      const { id } = req.params;

      const participant = await ParticipantsModel.findById(id)
        .populate({
          path: 'courses',
          populate: [
            {
              path: 'instructor',
              model: INSTRUCTORS,
              select: 'name',
            },
          ],
        })
        .exec();

      if (participant === null) {
        res.status(404);
        res.json({
          status: 'error',
          message: 'Participant not found.',
        });
        return;
      }

      res.json({
        status: 'success',
        participant,
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
  updateParticipantById: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        name, dateOfBirth, email, phone, courses,
      } = req.body;

      const participantFound = await ParticipantsModel.findById(id).exec();

      if (participantFound === null) {
        res.status(404);
        res.json({
          status: 'error',
          message: 'Participant not found.',
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

      const newCourses = typeof courses !== 'object' ? [courses] : [...courses];

      if (newCourses[0]) {
        let coursesIds = await CoursesModel.find({}, '_id');

        if (coursesIds === null) {
          res.status(404);
          res.json({
            status: 'error',
            message: 'No course found.',
          });
          return;
        }

        coursesIds = coursesIds.map((item) => item._id.toString());

        newCourses.forEach((item) => {
          if (!coursesIds.includes(item)) {
            const err = new Error(`#reason course id '${item}' doesn't exist.`);
            err.name = 'ValidationError';
            throw err;
          }
        });
      }

      const updatedParticipant = await ParticipantsModel.findByIdAndUpdate(
        id,
        {
          name,
          dateOfBirth,
          email: email || '',
          phone: phone || '',
          courses: newCourses,
        },
        { new: true },
      ).exec();

      res.json({
        status: 'success',
        participant: updatedParticipant,
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
  deleteParticipantById: async (req, res) => {
    try {
      const { id } = req.params;

      const participantFound = await ParticipantsModel.findById(id).exec();

      if (participantFound === null) {
        res.status(404);
        res.json({
          status: 'error',
          message: 'Participant not found.',
        });
        return;
      }

      const deletedParticipant = await ParticipantsModel.findByIdAndRemove(
        id,
      ).exec();

      if (deletedParticipant === null) {
        res.status(400);
        res.json({
          status: 'error',
          message: 'Participant already deleted.',
        });
        return;
      }

      res.json({
        status: 'success',
        participant: deletedParticipant,
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
