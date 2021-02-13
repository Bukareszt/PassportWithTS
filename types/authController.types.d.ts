import { Request, Response } from 'express';

export interface IAuthController {
  generateToken(req: Request, res: Response): void;
  registerUser(req: Request, res: Response): Promise<void>;
  failedRequest(req: Request, res: Response): void;
}

export interface RequestBodyWithUserData {
  email: string;
  password: string;
  username: string;
}
export interface IPayloadWithDataForJWT {
  id: string;
}
