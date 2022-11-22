import { validationResult } from 'express-validator';
import {IReqGetMe} from "../config/interface";
import {NextFunction, Response} from "express";

export default (req: IReqGetMe, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({message: errors.array()[0].msg});
    }

    next();
};