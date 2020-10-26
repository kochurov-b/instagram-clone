import { Document } from 'mongoose';

export interface IUser extends Document {
  avatar: {
    data: Buffer;
    contentType: string;
  };
  email: string;
  full_name: string;
  posts: [];
  followers: [];
  following: [];
  username: string;
  password: string;
}
