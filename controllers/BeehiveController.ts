import {Response, Request} from "express";
import BeehiveModel from "../models/Beehive"
import {IBeehive, IReqBeehive} from "../config/interface";
import ApiaryModel from "../models/Apiary";

export const create = async (req: IReqBeehive, res: Response) => {
    try {
        const {name, description, deviceID} = req.body;


        const doc = new BeehiveModel({
            name,
            description,
            deviceID,
            apiary: req.params.apiaryId
        })

        await ApiaryModel.findOneAndUpdate({_id: req.params.apiaryId}, {
            $push: {beehives: doc._id}
        })


        const beehive = await doc.save();

        res.json(beehive);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не вдалося створити вулик',
        });
    }
}

export const getAll = async (req: Request, res: Response) => {
    try {
        const beehives = await BeehiveModel.find({apiary: req.params.apiaryId});

        res.json(beehives);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не вдалося отриманти вулики',
        });
    }
};

export const getOne = async (req: IReqBeehive, res: Response) => {
    try {
        const {apiaryId, beehiveId} = req.params;


        if (req.userId)

            BeehiveModel.findOne(
                {
                    _id: beehiveId,
                    apiary: apiaryId
                },
                async (err: any, doc: IBeehive) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({
                            message: 'Не вдалося отриманти вулик',
                        });
                    }

                    if (!doc) {
                        return res.status(404).json({
                            message: 'Вулик не знайдений',
                        });
                    }


                    res.json(doc);

                },
            );
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не вдалося отриманти вулик',
        });
    }
};

export const remove = async (req: Request, res: Response) => {
    try {
        const {apiaryId, beehiveId} = req.params;

        BeehiveModel.findOneAndDelete(
            {
                _id: beehiveId,
                apiary: apiaryId
            },
            async (err: any, doc: IBeehive) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: 'Не вдалось видалити вулик',
                    });
                }

                if (!doc) {
                    return res.status(404).json({
                        message: 'Вулик не знайдений',
                    });
                }


                await ApiaryModel.findOneAndUpdate({_id: req.params.apiaryId}, {
                    $pullAll: {
                        beehives: [{_id: req.params.beehiveId}],
                    },
                })


                res.json({
                    success: true,
                });
            },
        );


    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не вдалось отримати вулик',
        });
    }
};

export const update = async (req: IReqBeehive, res: Response) => {
    try {


        const {name, description, deviceID} = req.body;
        const apiaryId = req.params.apiaryId;
        const beehiveId = req.params.beehiveId;

        await BeehiveModel.updateOne(
            {
                _id: beehiveId,
                apiary: apiaryId,
            },
            {
                name,
                description,
                deviceID,
                apiary: req.params.apiaryId
            },
        );


        res.json({
            success: true,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не вдалось оновити вулик',
        });
    }
};
