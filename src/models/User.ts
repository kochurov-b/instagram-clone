import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
  login: string;
  password: string;
}

const schema: Schema<IUser> = new Schema({
  login: {
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
