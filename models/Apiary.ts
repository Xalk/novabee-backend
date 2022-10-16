import mongoose from 'mongoose';
import {IApiary} from "../config/interface";

const ApiarySchema = new mongoose.Schema(
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
        startSeason: {
            type: Date,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },

        beehives: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Beehive',
        }]
    },
    {
        timestamps: true,
    },
);

export default mongoose.model<IApiary>('Apiary', ApiarySchema);
