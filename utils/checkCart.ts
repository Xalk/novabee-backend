import {IReqGetMe} from "../config/interface";
import {NextFunction, Response} from "express";
import UserModel from "../models/User";
import mongoose from "mongoose";

export const checkCart = async (req: IReqGetMe, res: Response, next: NextFunction) => {
    try {
        const {productId} = req.body
        const productObjectId = new mongoose.Types.ObjectId(productId);

        const user = await UserModel.findOne(
            {
                _id: req.userId,
                "cart.items": productObjectId
            }, )

        if (user) {
            return res.status(404).json({
                message: 'Товар є в корзині',
            });
        }



        next()

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Помилка при додаванні в корзину',
        });
    }

}