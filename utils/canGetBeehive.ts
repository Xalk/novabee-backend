import {IReqBeehive} from "../config/interface";
import {NextFunction, Response} from "express";
import ApiaryModel from "../models/Apiary";

export const canGetBeehive = async (req: IReqBeehive,  res: Response, next: NextFunction) => {
    const apiary = await ApiaryModel.findOne(
        {
            _id: req.params.apiaryId,
        })

    if (!apiary) {
        return res.status(404).json({
            message: 'Пасіку не знайдено',
        });
    }

    if (req.userId !== apiary.user.toString()) {
        return res.status(403).json({
            message: 'Немає доступу',
        });
    }

    next()
}