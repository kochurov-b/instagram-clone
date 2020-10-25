import { TUser } from './User.types';

const INITIAL_COUNTER = {
  count: 0,
};

export const USER_INITIAL_STATE: TUser = {
  full_name: '',
  username: '',
  posts: INITIAL_COUNTER,
  followers: INITIAL_COUNTER,
  following: INITIAL_COUNTER,
};
