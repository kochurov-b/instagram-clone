import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
  email: string;
  full_name: string;
  username: string;
  password: string;
}

const schema: Schema<IUser> = new Schema({
  email: {
    type: String,
    required: true,
  },
  full_name: {
    type: String,
    required: true,
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
