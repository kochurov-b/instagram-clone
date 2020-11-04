import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import { config } from './config/config';
import { router as authRouter } from './routes/auth/auth';
import { router as userRouter } from './routes/user';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

const start = async () => {
  const { port, mongooseUri } = config;
  const { USER, PASSWORD } = process.env;

  try {
    await mongoose.connect(mongooseUri(USER, PASSWORD), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    app.listen(config.port, () =>
      console.log(`Server running on port ${port}`),
    );
  } catch (error) {
    console.error(error);
  }
};

start();
