import cors from 'cors';
import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import routes from './routes';

// Middleware
const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use('/api', routes.authRouter);
app.use('/api', routes.sensorRouter);
app.use('/api', routes.apiaryRouter);
app.use('/api', routes.productRouter);
app.use('/api', routes.cartRouter);

// Database
import './config/database';

// server listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});
