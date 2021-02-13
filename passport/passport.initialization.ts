/* eslint-disable max-len */

import passport from 'passport';
import {
  passportGoogleStrategy,
  passportFacebookStrategy,
  passportJWTStrategy,
  passportGithubStrategy,
  localStrategy,
} from './passport.strategies';

export default function initializePassport() {

  passport.serializeUser(function (user, done) {
    done(null, user);
  });
  passport.deserializeUser(function (obj, done) {
    done(null, obj);
  });

  passport.use(passportGoogleStrategy);
  passport.use(passportFacebookStrategy);
  passport.use(passportJWTStrategy);
  passport.use(passportGithubStrategy);
  passport.use(localStrategy);

  return passport.initialize();
}
