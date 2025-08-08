// config/dotenv.js

import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT;
export const JWT_SECRET = process.env.JWT_SECRET;
export const GITHUB_ID= process.env.GITHUB_ID;
export const GITHUB_SECRET = process.env.GITHUB_SECRET;
export const CALLBACK_URL = process.env.CALLBACK_URL;
export const EXPIRES_IN = process.env.EXPIRES_IN;
export const RETURN_URL = process.env.RETURN_URL;

export const PG_USER = process.env.PG_USER;
export const PG_HOST = process.env.PG_HOST;
export const PG_DATABASE = process.env.PG_DATABASE;
export const PG_PASSWORD = process.env.PG_PASSWORD;
export const PG_PORT = process.env.PG_PORT;

export const MONGODB_URI = process.env.MONGODB_URI;

export const BCRYPT_SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10);
