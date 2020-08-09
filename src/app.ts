import express from 'express';

import { config } from './config/config';

const app = express();

const start = () => {
  const { port } = config;

  try {
    app.listen(config.port, () =>
      console.log(`Server running on port ${port}`),
    );
  } catch (error) {
    console.error(error);
  }
};

start();
