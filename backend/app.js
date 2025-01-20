import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './server.js';

const app = express();

app.use(bodyParser.json());
app.use('/auth', authRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});