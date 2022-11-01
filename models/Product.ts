import mongoose from 'mongoose';
import {IProduct} from "../config/interface";

const ProductSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        imageUrl: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },);

export default mongoose.model<IProduct>('Product', ProductSchema);