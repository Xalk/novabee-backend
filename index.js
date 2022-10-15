import express from 'express';

import mongoose from 'mongoose';

import { registerValidation } from './validations/auth.js';
import { createValidation } from './validations/apiary.js';

import checkAuth from './utils/checkAuth.js';

import * as UserController from './controllers/UserController.js';
import * as SensorController from './controllers/SensorController.js';
import * as ApiaryController from './controllers/ApiaryController.js';

import * as dotenv from 'dotenv';

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('DB ok'))
  .catch((err) => console.log('DB ok', err));

const app = express();

app.use(express.json());

app.post('/auth/register', registerValidation, UserController.register);
app.post('/auth/login', UserController.login);
app.get('/auth/me', checkAuth, UserController.getMe);

app.post('/sensor', SensorController.getSensorValues);

app.post('/apiary', checkAuth, createValidation, ApiaryController.create);
app.get('/apiary', ApiaryController.getAll);
app.get('/apiary/:id', ApiaryController.getOne);

app.delete('/apiary/:id', checkAuth, ApiaryController.remove);
app.patch('/apiary/:id', checkAuth, createValidation, ApiaryController.update);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('Application listening on port 4444');
});
