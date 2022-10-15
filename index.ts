import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import routes from "./routes";


// Middleware
const app = express();
app.use(express.json());


// Routes
app.use('/api', routes.authRouter)
app.use('/api', routes.sensorRouter)
app.use('/api', routes.apiaryRouter)


// Database
import './config/database'


// server listening
const PORT = process.env.PORT || 4444
app.listen(PORT, () => {
    console.log('Server is running on port', PORT)
})
