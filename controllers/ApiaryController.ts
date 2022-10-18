import ApiaryModel from '../models/Apiary';
import { Response} from "express";
import {IApiary, IReqApiary} from "../config/interface";
import BeehiveModel from "../models/Beehive";

export const create = async (req: IReqApiary, res: Response) => {
    try {
        const {name, description, startSeason} = req.body;

        const doc = new ApiaryModel({
            name,
            description,
            startSeason,
            user: req.userId,
        });

        const post = await doc.save();

        res.json(post);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не вдалося створити пасіку',
        });
    }
};

export const getAll = async (req: IReqApiary, res: Response) => {
    try {
        const apiaries = await ApiaryModel.find({user: req.userId}).populate('user').exec();
        res.json(apiaries);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не вдалося отриманти пасіки',
        });
    }
};

export const getOne = async (req: IReqApiary, res: Response) => {
    try {
        const apiaryId = req.params.apiaryId;


        ApiaryModel.findOne(
            {
                _id: apiaryId,
                user: req.userId

            },
            (err: any, doc: IApiary) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: 'Не вдалося отриманти пасіку',
                    });
                }

                if (!doc) {
                    return res.status(404).json({
                        message: 'Пасіка не знайдена',
                    });
                }

                res.json(doc);
            },
        ).populate('beehives user');


    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не вдалося отриманти пасіку',
        });
    }
};

export const remove = async (req: IReqApiary, res: Response) => {
    try {
        const apiaryId = req.params.apiaryId;

        console.log(apiaryId)


        ApiaryModel.findOneAndDelete(
            {
                _id: apiaryId,
                user: req.userId
            },
            async (err: any, doc: IApiary) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: 'Не вдалось видалити пасіку',
                    });
                }

                if (!doc) {
                    return res.status(404).json({
                        message: 'Пасіка не знайдена',
                    });
                }

                await BeehiveModel.deleteMany({apiary: apiaryId});

                res.json({
                    success: true,
                });
            },
        );
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не вдалось отримати пасіку',
        });
    }
};

export const update = async (req: IReqApiary, res: Response) => {
    try {
        const {name, description, startSeason} = req.body;
        const apiaryId = req.params.apiaryId;

        await ApiaryModel.updateOne(
            {
                _id: apiaryId,
                user: req.userId,
            },
            {
                name,
                description,
                startSeason,
                user: req.userId,
            },
        );


        res.json({
            success: true,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не вдалось оновити пасіку',
        });
    }
};
