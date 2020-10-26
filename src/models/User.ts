import { Schema, model } from 'mongoose';

import { IUser } from './User.types';

const schema: Schema<IUser> = new Schema({
  avatar: {
    data: Buffer,
    contentType: String,
  },
  email: {
    type: String,
    required: true,
  },
  full_name: {
    type: String,
    required: true,
  },
  posts: {
    type: Array,
    required: true,
    default: [],
  },
  followers: {
    type: Array,
    required: true,
    default: [],
  },
  following: {
    type: Array,
    required: true,
    default: [],
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const User = model<IUser>('User', schema);
