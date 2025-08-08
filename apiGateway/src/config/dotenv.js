// config/dotenv.js
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export const PORT = process.env.PORT;
export const CLIENT_URL = process.env.CLIENT_URL;

// Define services configuration
export const SERVICES = [
  {
    route: "/api/auth",
    target: process.env.AUTH_SERVICE_URL
  },
  {
    route: "/api/dictionary",
    target: process.env.DICTIONARY_SERVICE_URL
  },
];
