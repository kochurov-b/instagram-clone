import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { check, validationResult } from 'express-validator';

import { User } from '../models/User';
import { customJsonBody } from './helpers/jsonBody.helpers';
import { EStatusCode } from './helpers/types.helpers';
import { config } from '../config/config';

export const router = Router();

enum EFormFields {
  Login = 'login',
  Password = 'password',
}

interface IBody {
  [EFormFields.Login]: string;
  [EFormFields.Password]: string;
}

const generateJwtToken = (userId: string, secretKey: string): string =>
  jwt.sign({ userId }, secretKey, { expiresIn: '1h' });

router.post(
  '/login',
  [
    check(EFormFields.Login, '').isEmpty(),
    check(EFormFields.Password, '').isLength({ min: 6 }),
  ],
  async (req: Request, res: Response) => {
    try {
      const { login, password } = req.body as IBody;
      const validationErrors = validationResult(req);

      if (!validationErrors.isEmpty())
        return res.status(EStatusCode.BadRequest).json(
          customJsonBody({
            message: 'Invalid login or password',
          }),
        );

      const user = await User.findOne({ login });
      if (!user)
        return res.status(EStatusCode.BadRequest).json(
          customJsonBody({
            message: 'User not found',
          }),
        );

      const isMatchPassword = await bcrypt.compare(password, user.password);
      const { jwtSecretKey } = config;

      return isMatchPassword
        ? res.status(EStatusCode.Ok).json(
            customJsonBody({
              params: {
                token: generateJwtToken(user.id, jwtSecretKey),
              },
            }),
          )
        : res.status(EStatusCode.BadRequest).json(
            customJsonBody({
              message: 'Incorrect password',
            }),
          );
    } catch (error) {
      res.status(EStatusCode.InternalServerError).json(
        customJsonBody({
          message: 'Something wont wrong',
        }),
      );
    }
  },
);
