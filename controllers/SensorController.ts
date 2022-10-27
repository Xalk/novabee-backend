import SensorModel from '../models/Sensor';
import {Request, Response} from "express";

export const getSensorValues = async (req: Request, res: Response) => {
  try {
    const { humidity, temperature, apiKey, deviceID } = req.body;

    if (apiKey === process.env.SENSOR_API) {
      const doc = new SensorModel({
        deviceID,
        temperature,
        humidity,
        createdAt: new Date(),
      });

      const sensor = await doc.save();


      return res.json(sensor);
    } else {
      return res.status(403).json({
        message: 'Немає доступу',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Не вдалось отримати дані',
    });
  }
};
