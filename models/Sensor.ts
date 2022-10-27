import mongoose from 'mongoose';
import {ISensor} from "../config/interface";

const SensorSchema = new mongoose.Schema({
  deviceID: {
    type: String,
    required: true,
  },
  temperature: {
    type: String,
    required: true,
  },
  humidity: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

export default mongoose.model<ISensor>('Sensor', SensorSchema);
