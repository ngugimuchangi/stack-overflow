const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const db = require('./utils/db');
const router = require('./routes');
const errorHandler = require('./middlewares/error');
const routerNotFound = require('./middlewares/404');

const app = express();
const PORT = process.env.PORT || 8000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';
let server;

// Middleware setup
app.use(cors({ origin: CLIENT_URL }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use(routerNotFound);
app.use(errorHandler);

// Start server only when database is connected
const intervalId = setInterval(() => {
  if (db.isAlive) {
    clearInterval(intervalId);
    server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }
}, 1000);

// Graceful shutdown
process.on('SIGINT', async () => {
  await db.disconnect();
  server.close(() => {
    console.log('Server closed. Database instance disconnected.');
  });
});
