import { Router, Request, Response } from 'express';
import { auth } from '../middleware/auth.middleware';

import { User } from '../models/User';
import { IUser } from '../models/User.types';
import { EStatusCode } from './helpers/helpers.types';
import { generateJsonBody } from './helpers/jsonBody.helper';

export const router = Router();

type TCounter = {
  count: number;
};

type TGenerateUserDataExpected = {
  user: {
    full_name: string;
    username: string;
    posts: TCounter;
    followers: TCounter;
    following: TCounter;
  };
};

type TGenerateUserData = (user: IUser) => TGenerateUserDataExpected;

const generateUserData: TGenerateUserData = (user) => {
  const { username, full_name, posts, followers, following } = user;

  return {
    user: {
      username: username,
      full_name: full_name,
      posts: {
        count: posts.length,
      },
      followers: {
        count: followers.length,
      },
      following: {
        count: following.length,
      },
    },
  };
};

router.get('/:id', auth, async (req: Request, res: Response) => {
  try {
    const {
      params: { id },
    } = req;
    const user = await User.findOne({ _id: id }).select(
      'username full_name posts followers following',
    );

    if (user !== null) {
      return res.status(EStatusCode.Ok).json(
        generateJsonBody({
          data: generateUserData(user),
        }),
      );
    }
  } catch (error) {
    res.status(EStatusCode.InternalServerError).json(
      generateJsonBody({
        message: error._message,
        error,
      }),
    );
  }
});
