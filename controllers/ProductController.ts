import {IProduct, IReqApiary} from "../config/interface";
import {Request, Response} from "express";
import ProductModel from "../models/Product";


export const create = async (req: Request, res: Response) => {
    try {


        // if(user.role === ROLE.ADMIN ) return 500
        const {
            title,
            price,
            description,
            imageUrl,
        } = req.body;

        const doc = new ProductModel({
            title,
            price,
            description,
            imageUrl,
        });

        const product = await doc.save();

        res.json(product);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не вдалося створити товар',
        });
    }
};

export const getAll = async (req: IReqApiary, res: Response) => {
    try {
        const products = await ProductModel.find();
        res.json(products);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не вдалося отриманти товари',
        });
    }
}

export const getOne = async (req: Request, res: Response) => {
    try {
        const productId = req.params.productId;


        ProductModel.findOne(
            {
                _id: productId,
            },
            (err: any, doc: IProduct) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: 'Не вдалося отриманти товар',
                    });
                }

                if (!doc) {
                    return res.status(404).json({
                        message: 'Товар не знайдений',
                    });
                }

                res.json(doc);
            },
        );


    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не вдалося отриманти товар',
        });
    }
}

export const update = async (req: Request, res: Response) => {
    try {
        const {title, price, description, imageUrl,} = req.body;
        const productId = req.params.productId;

        await ProductModel.updateOne(
            {
                _id: productId,
            },
            {
                title,
                price,
                description,
                imageUrl,
            },
        );


        res.json({
            success: true,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не вдалось оновити товар',
        });
    }
}

export const remove = async (req: Request, res: Response) => {
    try {
        const productId = req.params.productId;


        ProductModel.findOneAndDelete(
            {
                _id: productId,
            },
            async (err: any, doc: IProduct) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: 'Не вдалось видалити товар',
                    });
                }

                if (!doc) {
                    return res.status(404).json({
                        message: 'Пасіка не знайдена',
                    });
                }

                res.json({
                    success: true,
                });
            },
        );
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не вдалось отримати товар',
        });
    }
};