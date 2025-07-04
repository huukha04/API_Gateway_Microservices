// controller/github.js
import express from "express";
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, EXPIRES_IN, RETURN_URL } from '../config/dotenv.js';

import '../config/passport.js'; // Ensure passport is configured

const router = express.Router();

router.get('/login', passport.authenticate('github'));

router.get('/callback',
  passport.authenticate('github', { session: false, failureRedirect: '/api/github/login' }),
  (req, res) => {
    const user = {
      id: req.user.id,
      name: req.user.username,
      image: req.user.photos?.[0]?.value,
      email: req.user.emails?.[0]?.value || null,
    };

    const loginToken = jwt.sign(user, JWT_SECRET, { expiresIn: EXPIRES_IN });

    const redirectUrl = `${RETURN_URL}?loginToken=${loginToken}`;
    res.redirect(redirectUrl);
  }
);

export default router;
