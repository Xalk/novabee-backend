import {IOrder, IReqCart} from "../config/interface";
import {Response} from "express";
import OrderModel from "../models/Order";
import UserModel from "../models/User";


export const create = async (req: IReqCart, res: Response) => {
    try {
        const {address} = req.body;

        const user = await UserModel.findOne(
            {
                _id: req.userId,
            },)

        if (!user) {
            return res.status(404).json({
                message: 'Користувача не знайдено',
            });
        }


        const doc = new OrderModel({
            products: user.cart.items,
            user: req.userId,
            address,
        });

        const order = await doc.save();

        await UserModel.updateOne(
            {
                _id: req.userId,
            }, {$set: {'cart.items': []}})


        res.json(order);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не вдалось створити замовлення',
        });
    }
}

export const getAll = async (req: IReqCart, res: Response) => {
    try {
        const orders = await OrderModel.find();
        res.json(orders);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не вдалося отриманти замовлення',
        });
    }
}

export const getUserOrders = async (req: IReqCart, res: Response) => {
    try {
        const orders = await OrderModel.find({user: req.userId});
        res.json(orders);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не вдалося отриманти замовлення',
        });
    }
}

export const update = async (req: IReqCart, res: Response) => {
    try {
        const {address, status, orderId} = req.body;

        await OrderModel.updateOne(
            {
                _id: orderId,
            },
            {
                address,
                status
            },
        );


        res.json({
            success: true,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не вдалось оновити замовлення',
        });
    }
}

export const remove = async (req: IReqCart, res: Response) =>{
    try{
        const {orderId} = req.body;

        OrderModel.findOneAndDelete(
            {
                _id: orderId,
            },
            async (err: any, doc: IOrder) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: 'Не вдалось видалити замовлення',
                    });
                }

                if (!doc) {
                    return res.status(404).json({
                        message: 'Замовлення не знайдено',
                    });
                }

                res.json({
                    success: true,
                });
            },
        );
    }catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не вдалось отримати замовлення',
        });
    }
}