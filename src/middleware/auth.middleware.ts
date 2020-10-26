import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { EAuthMessage } from '../routes/auth/auth.types';
import { EStatusCode } from '../routes/helpers/helpers.types';
import { generateJsonBody } from '../routes/helpers/jsonBody.helper';
import { config } from '../config/config';

type TAuth = (req: Request, res: Response, next: NextFunction) => void;

export const auth: TAuth = (req, res, next) => {
  if (req.method === 'OPTIONS') return next();

  try {
    const bearerToken = req.headers.authorization;

    if (!bearerToken) {
      return res.status(EStatusCode.Unauthorized).json(
        generateJsonBody({
          message: EAuthMessage.AuthorizationError,
          error: {
            name: EAuthMessage.AuthorizationError,
            message: EAuthMessage.AuthorizationError,
          },
        }),
      );
    }

    const token = bearerToken.split(' ')[1];

    jwt.verify(token, config.jwtSecretKey);

    next();
  } catch (error) {
    return res.status(EStatusCode.Unauthorized).json(
      generateJsonBody({
        message: EAuthMessage.AuthorizationError,
        error,
      }),
    );
  }
};
