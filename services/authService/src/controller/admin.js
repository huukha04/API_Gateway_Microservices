// controller/admin.js
import { Router } from 'express';
import bcrypt from 'bcrypt';


import pool from '../config/postgreSQL.js';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, EXPIRES_IN, BCRYPT_SALT_ROUNDS} from '../config/dotenv.js';

const admin = Router();


admin.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const query = 'SELECT * FROM admin.admins WHERE username = $1';
    const values = [username];
    const { rows } = await pool.query(query, values);
    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user_ = rows[0];
    const isPasswordValid = await bcrypt.compare(password, user_.password);
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


export default admin;
