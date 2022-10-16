import mongoose from 'mongoose';
import {IBeehive} from "../config/interface";

const BeehiveSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            trim: true
        },
        deviceID: {
            type: String,
        },
        apiary: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Apiary',
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model<IBeehive>('Beehive', BeehiveSchema);
