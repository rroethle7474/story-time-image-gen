import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './auth.js';
import imageGenRoutes from './imageGen.js';

const app = express();
app.use((req, res, next ) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/image', imageGenRoutes);



app.listen(3000, () => {
  console.log('Server is running on port 3000');
});