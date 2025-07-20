// controller/auth.js
import { Router } from 'express';
import bcrypt from 'bcrypt';


import pool from '../config/postgreSQL.js';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, EXPIRES_IN, BCRYPT_SALT_ROUNDS} from '../config/dotenv.js';

const auth = Router();


auth.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    console.log('Login attempt:', { username, password });
    const query = 'SELECT * FROM public.users WHERE username = $1';
    const values = [username];
    const { rows } = await pool.query(query, values);
    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    console.log('User found:', rows[0]);

    const user_ = rows[0];
    const isPasswordValid = await bcrypt.compare(password, user_.password);
    console.log('Password validation result:', user_);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const user = {
      id: user_.id,
      name: user_.username,
      email: user_.email
    };
    const loginToken = jwt.sign(user, JWT_SECRET, { expiresIn: EXPIRES_IN });

    res.status(200).json({
      message: 'Login successful',
      user: user,
        loginToken: loginToken,
        expiresIn: EXPIRES_IN
    });
      
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

auth.post('/register', async (req, res) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    return res.status(400).json({ message: 'Username, password, and email are required' });
  }

  try {
    console.log('Registration attempt:', { username, email, password });
    const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
    const query = 'INSERT INTO public.users (username, password, email) VALUES ($1, $2, $3) RETURNING id';
    const values = [username, hashedPassword, email];
    const { rows } = await pool.query(query, values);
    if (rows.length === 0) {
      return res.status(500).json({ message: 'Registration failed' });
    }

    res.status(201).json({
      message: 'Registration successful',
    });
  } catch (error) { 
    console.error('Registration error:', error);
    if (error.code === '23505') { // Unique violation error code
      return res.status(409).json({ message: 'Username or email already exists' });
    }
    return res.status(500).json({ message: 'Internal server error' });
  }
  
});


export default auth;
