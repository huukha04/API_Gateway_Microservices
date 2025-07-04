// app.js
import express from "express";
import cookieParser from 'cookie-parser';



const app = express();



app.use(cookieParser());
app.use(express.json());


export default app;
