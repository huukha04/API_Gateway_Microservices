// config/passport.js
import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github';
import { GITHUB_ID, GITHUB_SECRET, CALLBACK_URL } from './dotenv.js';

passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_ID,
      clientSecret: GITHUB_SECRET,
      callbackURL: CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, cb) {
      // TODO: lưu vào DB nếu muốn
      cb(null, profile);
    }
  )
);

export default passport;
