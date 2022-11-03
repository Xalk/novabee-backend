import mongoose from 'mongoose';
import { IOrder } from '../config/interface';

const OrderSchema = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product',
      },
    ],
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    address: { type: Object, required: true },
    status: { type: String, default: 'pending' },
    total: { type: Number },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IOrder>('Order', OrderSchema);
