import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import {
  IAuthController,
  IPayloadWithDataForJWT,
  RequestBodyWithUserData,
} from '../types/authController.types';
import UserModel from '../utills/db/user.model';

export default class AuthController implements IAuthController {
  public generateToken(req: Request, res: Response): void {
    const payload: IPayloadWithDataForJWT = {
      id: req.user['id'],
    };

    const token: string = jwt.sign(
      {
        data: { id: payload.id },
      },
      process.env.JWT_SECRET_OR_KEY,
      { expiresIn: process.env.JWT_TOKEN_EXPIRATION }
    );

    res.send({ token: token });
  }

  public async registerUser(req: Request, res: Response): Promise<void> {
    const userToCreate: RequestBodyWithUserData = req.body;
    try {
      const user = await UserModel.findOne({ email: userToCreate.email });
      if (user) {
        res.status(422).json({ error: 'User with given email already exist!' });
        return;
      }
      const newUser = await UserModel.createUserWithEmailPassword(
        userToCreate.username,
        userToCreate.email,
        userToCreate.password
      );
      res.status(200).json({ msg: 'User successfully created' });
      return;
    } catch (err) {
      res.status(500).json({ msg: 'Some error occured!', error: err });
    }
  }

  public failedRequest(req: Request, res: Response): void {
    res.status(401).send({ msg: 'Problem with authorization' });
  }
}
