// Require packages
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { createProxyMiddleware } from "http-proxy-middleware";

// Import custom modules
import { SERVICES, CLIENT_URL } from './config/dotenv.js';
import rateLimitAndTimeout from './middleware/rateLimitTimeout.js';
import { notFoundHandler } from './middleware/errorHandler.js';

// Create an instance of Express app
const app = express();

// Middleware setup
app.use(cors({
  origin: CLIENT_URL,
  credentials: true
}));

app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(morgan("combined")); // Log HTTP requests
app.disable("x-powered-by"); // Hide Express server information

app.use(rateLimitAndTimeout);

SERVICES.forEach(({ route, target }) => {
  // Proxy options
  const proxyOptions = {
    target,
    changeOrigin: true,
    pathRewrite: {
      [`^${route}`]: "/api",
    },
    // Add CORS headers to proxy responses
    onProxyRes: function(proxyRes, req, res) {
      proxyRes.headers['Access-Control-Allow-Origin'] = CLIENT_URL;
      proxyRes.headers['Access-Control-Allow-Methods'] = 'GET,HEAD,PUT,PATCH,POST,DELETE';
      proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';
    }
  };

  // Apply rate limiting and timeout middleware before proxying
  app.use(route, rateLimitAndTimeout, createProxyMiddleware(proxyOptions));
});

// Handler for route-not-found
app.use(notFoundHandler);

export default app;
