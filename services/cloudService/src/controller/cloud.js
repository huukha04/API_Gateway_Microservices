import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';

const router = express.Router();

router.post('/generatekey', async (req, res) => {
  try {
    const apiKey = uuidv4(); 
    const rawSecret = crypto.randomBytes(32).toString('hex');
    const hashedSecret = crypto.createHash('sha256').update(rawSecret).digest('hex');

  } catch (error) {
    console.error('Error generating response:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});