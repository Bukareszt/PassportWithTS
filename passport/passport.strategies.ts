import passportJWT from 'passport-jwt';
import passportGoogle from 'passport-google-oauth20';
import passportFacebook from 'passport-facebook';
import passportGithub from 'passport-github2';
import passportLocal from 'passport-local';

import dotenv from 'dotenv';
import {
  handleEmailPasword,
  handleJWTToken,
  handleOAuthWithFacebook,
  handleOAuthWithGithub,
  handleOAuthWithGoogle,
} from './passport.utills';
import { optsJWT } from '../types/passport.types';

dotenv.config();

const opts: optsJWT = {
  jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_OR_KEY,
};

export const passportJWTStrategy = new passportJWT.Strategy(
  opts,
  handleJWTToken
);

export const passportGoogleStrategy = new passportGoogle.Strategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
  handleOAuthWithGoogle
);
export const passportFacebookStrategy = new passportFacebook.Strategy(
  {
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    profileFields: ['id', 'displayName', 'email'],
  },
  handleOAuthWithFacebook
);

export const passportGithubStrategy = new passportGithub.Strategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL,
    scope: 'user:email',
  },
  handleOAuthWithGithub
);

export const localStrategy = new passportLocal.Strategy(
  { usernameField: 'email' },
  handleEmailPasword
);
