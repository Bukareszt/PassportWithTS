/* eslint-disable max-len */

import express from 'express';
import { prepareServer } from './utills/initialization/prepareServer';
import { resource } from './routes/authRoutes';
import { resource } from './routes/productRoutes';

const port = 3000;

function prepareRoutes(app) {
  app.use('/auth', new authRoutes().router);
  app.use('/products', new productRoutes().router);
}

function onInit() {
  const app = express();

  prepareServer(app);
  prepareRoutes(app);

  app.listen(port, () => {
    console.log('I wake up!');
  });
}

onInit();
