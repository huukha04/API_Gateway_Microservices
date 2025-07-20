// app.js
import express from "express";
import cookieParser from 'cookie-parser';

import library from "./controller/library.js";
import word from "./controller/word.js";

const app = express();



app.use(cookieParser());
app.use(express.json());

app.use('/api/library', library);
app.use('/api/word', word);

export default app;
