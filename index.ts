import express from 'express';

import mongoose from 'mongoose';

import {loginValidation, registerValidation} from './validations/auth';
import { apiaryCreateValidation } from './validations/apiary';

import checkAuth from './utils/checkAuth';

import * as UserController from './controllers/UserController';
import * as SensorController from './controllers/SensorController';
import * as ApiaryController from './controllers/ApiaryController';

import * as dotenv from 'dotenv';
import handleValidationErrors from "./utils/handleValidationErrors";

dotenv.config();

const URI = process.env.MONGODB_URI;

mongoose
  .connect(`${URI}`)
  .then(() => console.log('DB ok'))
  .catch((err) => console.log('DB ok', err));

const app = express();

app.use(express.json());

app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
app.post('/auth/login',loginValidation, handleValidationErrors,UserController.login);
app.get('/auth/me', checkAuth, UserController.getMe);

app.post('/sensor', SensorController.getSensorValues);

app.post('/apiary', checkAuth, apiaryCreateValidation, handleValidationErrors, ApiaryController.create);
app.get('/apiary', ApiaryController.getAll);
app.get('/apiary/:id', ApiaryController.getOne);
app.delete('/apiary/:id', checkAuth, ApiaryController.remove);
app.patch('/apiary/:id', checkAuth, apiaryCreateValidation, ApiaryController.update);

// server listenning
const PORT = process.env.PORT || 4444
app.listen(PORT, () => {
  console.log('Server is running on port', PORT)
})
