import express from 'express';
import bodyParser from 'body-parser';

import { PORT } from './config/server.config.js';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/ping', (req, res) => {
  res.json({ message: 'Service is alive' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});