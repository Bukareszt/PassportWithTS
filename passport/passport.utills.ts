import passportGoogle from 'passport-google-oauth20';
import passportFacebook from 'passport-facebook';
import passportGithub from 'passport-github2';
import passportJWT from 'passport-jwt';
import passportLocal from 'passport-local';
import bcrypt from 'bcrypt';

import UserModel from '../utills/db/user.model';

export const handleOAuthWithGoogle = async (
  accessToken: string,
  refreshToken: string,
  profile: passportGoogle.Profile,
  done: passportGoogle.VerifyCallback
) => {
  try {
    const user = await UserModel.handleOAuth(
      profile.id,
      profile.displayName,
      profile._json.email
    );

    return done(null, user);
  } catch (err) {
    return done(err, false);
  }
};
export const handleOAuthWithFacebook = async (
  accessToken: string,
  refreshToken: string,
  profile: passportFacebook.Profile,
  done: passportFacebook.VerifyCallback
) => {
  try {
    const user = await UserModel.handleOAuth(
      profile.id,
      profile.displayName,
      profile.emails[0].value
    );
    return done(null, user);
  } catch (err) {
    return done(err, false);
  }
};
export const handleOAuthWithGithub = async (
  accessToken: string,
  refreshToken: string,
  profile: passportGithub.Profile,
  done: passportGithub.VerifyCallback
) => {
  try {
    const user = await UserModel.handleOAuth(
      profile.id,
      profile.username,
      profile.emails[0].value
    );
    return done(null, user);
  } catch (err) {
    return done(err, false);
  }
};

export const handleJWTToken = async (
  jwtPayload,
  done: passportJWT.VerifiedCallback
) => {
  try {
    const user = await UserModel.findById(jwtPayload.data.id);
    return done(null, user);
  } catch (err) {
    return done(err, false);
  }
};

export const handleEmailPasword = async (
  email: string,
  password: string,
  done: passportLocal.VerifyCallback
) => {
  try {
    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return done(null, false);
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return done(null, false);
    }

    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
};
