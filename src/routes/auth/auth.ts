import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { check, validationResult } from 'express-validator';

import { User } from '../../models/User';
import { generateJsonBody } from '../helpers/jsonBody.helper';
import { EFormMessage, EStatusCode } from '../helpers/helpers.types';
import { config } from '../../config/config';
import { generateErrors } from '../helpers/error.helper';
import { EAuthMessage } from './auth.types';

export const router = Router();

enum EFormFields {
  Email = 'email',
  FullName = 'full_name',
  Username = 'username',
  Password = 'password',
}

interface IBodyLogin {
  [EFormFields.Username]: string;
  [EFormFields.Password]: string;
}

interface IBodyRegister extends IBodyLogin {
  [EFormFields.Email]: string;
  [EFormFields.FullName]: string;
}

type TGenerateJwtToken = (userId: string, secretKey: string) => string;

const generateJwtToken: TGenerateJwtToken = (userId, secretKey) =>
  jwt.sign({ userId }, secretKey, { expiresIn: '1h' });

router.post(
  '/login',
  [
    check(EFormFields.Username, '').notEmpty(),
    check(EFormFields.Password, '').exists(),
  ],
  async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body as IBodyLogin;
      const validationErrors = validationResult(req);

      if (!validationErrors.isEmpty())
        return res.status(EStatusCode.BadRequest).json(
          generateJsonBody({
            message: EAuthMessage.InvalidLoginOrPassword,
          }),
        );

      const user = await User.findOne({ username });
      if (!user)
        return res.status(EStatusCode.BadRequest).json(
          generateJsonBody({
            message: EAuthMessage.UserNotFound,
            error: {
              name: EAuthMessage.UserNotFound,
              message: EAuthMessage.UserNotFound,
            },
          }),
        );

      const isMatchPassword = await bcrypt.compare(password, user.password);
      const { jwtSecretKey } = config;

      return isMatchPassword
        ? res.status(EStatusCode.Ok).json(
            generateJsonBody({
              params: {
                token: generateJwtToken(user.id, jwtSecretKey),
                userId: user.id,
              },
            }),
          )
        : res.status(EStatusCode.BadRequest).json(
            generateJsonBody({
              message: EAuthMessage.InvalidLoginOrPassword,
              error: {
                name: EAuthMessage.InvalidLoginOrPassword,
                message: EAuthMessage.InvalidLoginOrPassword,
              },
            }),
          );
    } catch (error) {
      res.status(EStatusCode.InternalServerError).json(
        generateJsonBody({
          message: error._message,
          error,
        }),
      );
    }
  },
);

router.post(
  '/register',
  [
    check(EFormFields.Email, EFormMessage.FieldNotEmpty).notEmpty(),
    check(EFormFields.FullName, EFormMessage.FieldNotEmpty).notEmpty(),
    check(EFormFields.Username, EFormMessage.FieldNotEmpty).notEmpty(),
    check(EFormFields.Password, EFormMessage.FieldNotEmpty).notEmpty(),
  ],
  async (req: Request, res: Response) => {
    try {
      const {
        email,
        full_name,
        username,
        password,
      } = req.body as IBodyRegister;
      const user = await User.findOne({ username });
      const validationErrors = validationResult(req);

      if (!validationErrors.isEmpty()) {
        return res.status(EStatusCode.BadRequest).json(
          generateJsonBody({
            message: EFormMessage.IncorrectData,
            error: generateErrors(validationErrors),
          }),
        );
      }

      if (user) {
        return res.status(EStatusCode.BadRequest).json(
          generateJsonBody({
            message: EAuthMessage.UserAlreadyExist,
            error: {
              name: EAuthMessage.InvalidLoginOrPassword,
              message: EAuthMessage.InvalidLoginOrPassword,
            },
          }),
        );
      }

      const { jwtSecretKey } = config;
      const hashPassword = await bcrypt.hash(password, 10);
      const userNew = new User({
        email,
        full_name,
        username,
        password: hashPassword,
      });

      await userNew.save();

      return res.status(EStatusCode.Created).json(
        generateJsonBody({
          message: EAuthMessage.UserCreated,
          params: {
            token: generateJwtToken(username, jwtSecretKey),
          },
        }),
      );
    } catch (error) {
      res.status(EStatusCode.InternalServerError).json(
        generateJsonBody({
          message: error._message,
          error,
        }),
      );
    }
  },
);
