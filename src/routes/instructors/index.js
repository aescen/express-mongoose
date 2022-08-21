const express = require('express');
const { InstructorsController } = require('../../controllers');

const instructorsRoutes = express.Router();

instructorsRoutes.post('/', InstructorsController.addInstructor);
instructorsRoutes.get('/', InstructorsController.getAllInstructors);
instructorsRoutes.get('/:id', InstructorsController.getInstructorById);
instructorsRoutes.put('/:id', InstructorsController.updateInstructorById);
instructorsRoutes.delete('/:id', InstructorsController.deleteInstructorById);

module.exports = instructorsRoutes;
