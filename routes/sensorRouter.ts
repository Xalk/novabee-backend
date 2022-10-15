import * as SensorController from "../controllers/SensorController";
import express from "express";

const router = express.Router()

router.post('/sensor', SensorController.getSensorValues);


export default router;