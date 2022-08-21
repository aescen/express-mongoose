const express = require('express');
const instructorsRoutes = require('./instructors');
const coursesRoutes = require('./courses');
const participantsRoutes = require('./participants');

const routes = express.Router();

routes.use('/instructors', instructorsRoutes);
routes.use('/courses', coursesRoutes);
routes.use('/participants', participantsRoutes);

routes.get('/', (req, res) => {
  res.send('<h1>Online Courses Website</h1>');
  res.end();
});

module.exports = routes;
