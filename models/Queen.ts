import mongoose from 'mongoose';
import { IQueen } from '../config/interface';

const QueenSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    introducedFrom: {
      type: Date,
      required: true,
    },
    reQueenedFrom: {
      type: Date,
    },
    isOut: {
      type: Boolean,
    },
    beehive: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Beehive',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IQueen>('Queen', QueenSchema);
