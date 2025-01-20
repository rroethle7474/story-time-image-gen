import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from './db.js';

const router = express.Router();

const secretKey = process.env.JWT_SECRET_KEY;

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password || password.length < 7) {
    return res.status(400).send('Invalid email or password');
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  db.prepare('INSERT INTO users (email, password) VALUES (?, ?)').run(email, hashedPassword);
  res.status(201).send('User created');
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).send('Invalid email or password');
  }
  const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
  res.json({ token });
});

export default router;
