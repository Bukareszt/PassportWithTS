export interface optsJWT {
  jwtFromRequest: passportJWT.JwtFromRequestFunction;
  secretOrKey: string;
}
