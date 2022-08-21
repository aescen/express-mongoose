const express = require('express');
const { CoursesController } = require('../../controllers');

const coursesRoutes = express.Router();

coursesRoutes.post('/', CoursesController.addCourse);
coursesRoutes.get('/', CoursesController.getAllCourses);
coursesRoutes.get('/:id', CoursesController.getCourseById);
coursesRoutes.put('/:id', CoursesController.updateCourseById);
coursesRoutes.delete('/:id', CoursesController.deleteCourseById);

module.exports = coursesRoutes;
