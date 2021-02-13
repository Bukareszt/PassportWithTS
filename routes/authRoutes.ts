import { Router } from 'express';
import passport from 'passport';
import AuthController from '../controllers/authController';

// client (V)

// router (C)  ... Controller

// resource (M)

class AuthResource {
  public router: Router;
  public url: string;

  private authController = new AuthController();

  routes() {
    // put
    // post

    // logowanie
    this.router.post(
      this.url + '/google',
      passport.authenticate('google', { scope: ['profile', 'email'] })
    );

    //googl jest
    this.router.get(
      '/google/googleres',
      passport.authenticate('google', { failureRedirect: '/failed' }),
      this.authController.generateToken
    );

    this.router.get('/facebook', passport.authenticate('facebook'));

    this.router.get(
      '/facebook/facebookres',
      passport.authenticate('facebook', { failureRedirect: '/failed' }),
      this.authController.generateToken
    );

    this.router.get(
      '/github',
      passport.authenticate('github', { scope: ['user:email'] })
    );

    this.router.get(
      '/github/githubres',
      passport.authenticate('github', { failureRedirect: '/failed' }),
      this.authController.generateToken
    );

    // email
    this.router.put('/register', this.authController.registerUser);

    this.router.post(
      '/login',
      passport.authenticate('local', { failureRedirect: 'auth/failed' }),
      this.authController.generateToken
    );

    this.router.get('/failed', this.authController.failedRequest);
  }
}

const resource = new AuthResource();
export default resource;
