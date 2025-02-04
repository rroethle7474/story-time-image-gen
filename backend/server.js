import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './auth.js';
import imageGenRoutes from './imageGen.js';

const app = express();

app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/image', imageGenRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});