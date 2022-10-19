import {ROLE} from "./roles";
import {NextFunction, Response} from "express";
import UserModel from "../models/User";
import {IReqGetMe} from "../config/interface";

export const checkAdmin = async (req: IReqGetMe, res: Response, next: NextFunction) => {
    try {
        const user = await UserModel.findOne(
            {
                _id: req.userId,
            })

        if (!user) {
            return res.status(404).json({
                message: 'Користувача не знайдено',
            });
        }

        if (user.role !== ROLE.ADMIN) {
            return res.status(500).json({
                message: 'Немає доступу',
            });
        }

        next()

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Немає доступу',
        });
    }

}