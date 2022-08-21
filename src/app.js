require('dotenv').config();

const express = require('express');
const cors = require('cors');
const dbConnection = require('./config/dbConnection');
const routes = require('./routes');

dbConnection
  // eslint-disable-next-line no-unused-vars
  .then((res) => {
    console.log('DB connection success.');
  })
  .catch((err) => {
    console.log(err);
  });

const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

const server = app.listen(PORT, HOST, () => {
  const { address: host, port } = server.address();

  console.log(`Server berjalan di ${host}:${port}`);
});
