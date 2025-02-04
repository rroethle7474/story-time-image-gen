import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from './db.js';
import 'dotenv/config';

const router = express.Router();

const secretKey = process.env.JWT_SECRET_KEY;

router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !email.includes('@') || !password || password.trim().length < 7) {
      return res.status(400).send({error: 'Invalid email or password'});
    }
      const existingUser = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
      if (existingUser) {
        // could also do the following:
        // throw new Error('User already exists');
        return res.status(400).send({error: 'User already exists'});
      }


      const hashedPassword = await bcrypt.hash(password, 12);
      const user = db.prepare('INSERT INTO users (email, password) VALUES (?, ?)').run(email, hashedPassword);
      const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' });
      //res.json({ token });
      const json_token = { token };
      res.status(201).send({ message: 'Signup successful', json_token });
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).send({error: 'Internal server error'} );
  }

});


router.post('/login', async (req, res) => {
  try{
    const { email, password } = req.body;
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send({error: 'Invalid email or password'});
    }

    // TO DO: Add a refresh token

    const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' });
    const json_token = { token };
    res.status(201).send({ message: 'Login successful', json_token });
  }
  catch(error){
    console.error('Error log in failed:', error);
    res.status(500).send({error: 'Internal server error'} );
  }
});

export function enforceAuth(req, res, next){
  const authHeader = req.headers.authorization;
  console.log("AUTH HEADER", authHeader);
  if (!authHeader) {
    return res.status(401).send({error: 'Unauthorized'});
  }
  const token = authHeader.split(' ')[1]; //Bearer
  console.log("TOKEN", token);
  try{
    const decoded = jwt.verify(token, secretKey);
    console.log("DECODED", decoded);
    req.userId = decoded.id;
    next();
  }
  catch(error){
    console.log("ERROR", error);
    return res.status(401).send({error: 'Unauthenticated'});
  }
}

export default router;  

