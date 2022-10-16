import mongoose from 'mongoose';
import {IUser} from "../config/interface";

const UserSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        passwordHash: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            default: 'user' // admin
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model<IUser>('User', UserSchema);
