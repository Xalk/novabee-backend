import SensorModel from '../models/Sensor.js';

export const getSensorValues = async (req, res) => {
  try {
    const { humidity, temperature, api_key } = req.body;

    if (api_key === process.env.SENSOR_API) {
      const doc = new SensorModel({
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
