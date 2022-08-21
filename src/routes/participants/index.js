const express = require('express');
const { ParticipantsController } = require('../../controllers');

const participantsRoutes = express.Router();

participantsRoutes.post('/', ParticipantsController.addParticipant);
participantsRoutes.post('/:id', ParticipantsController.addParticipantCoursesById);
participantsRoutes.get('/', ParticipantsController.getAllParticipants);
participantsRoutes.get('/:id', ParticipantsController.getParticipantById);
participantsRoutes.put('/:id', ParticipantsController.updateParticipantById);
participantsRoutes.delete('/:id', ParticipantsController.deleteParticipantById);

module.exports = participantsRoutes;
