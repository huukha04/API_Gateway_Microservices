// app.js
import express from "express";
import cookieParser from 'cookie-parser';

import github from "./controller/github.js";
import auth from "./controller/auth.js";

const app = express();

// 
import cron from 'node-cron';
import pool from './config/postgreSQL.js';
cron.schedule('*/5 * * * *', async () => {
  try {
    await pool.query(`DELETE FROM verify WHERE expires_at < NOW() AND used = false`);
    console.log('The expired verification codes have been deleted');
  } catch (err) {
    console.error('Error', err);
  }
});


app.use(cookieParser());
app.use(express.json());

app.use('/api/github', github);
app.use('/api', auth);

export default app;
