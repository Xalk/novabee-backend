import {IOrder, IReqCart} from '../config/interface';
import {Response} from 'express';
import OrderModel from '../models/Order';
import UserModel from '../models/User';

export const create = async (req: IReqCart, res: Response) => {
    try {
        const {address} = req.body;

        const user = await UserModel.findOne({
            _id: req.userId,
        }).populate('cart.items');

        if (!user) {
            return res.status(404).json({
                message: 'Користувача не знайдено',
            });
        }

        const total = user.cart.items.reduce((sum, {price}) => sum + price, 0);

        const doc = new OrderModel({
            products: user.cart.items,
            user: req.userId,
            address,
            total,
        });

        const order = await doc.save();

        await UserModel.updateOne(
            {
                _id: req.userId,
            },
            {$set: {'cart.items': []}},
        );

        res.json(order);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не вдалось створити замовлення',
        });
    }
};

export const getAll = async (req: IReqCart, res: Response) => {
    try {
        let {sort, filter, range} = req.query;

        sort = sort == undefined ? {} : [JSON.parse(req.query.sort as string) || {}];
        filter = filter == undefined ? {} : JSON.parse(req.query.filter as string) || {};

        const arr: Array<number> = range == undefined ? [] : JSON.parse(req.query.range as string);

        const limit = arr[1];
        const skip = arr[1] * (arr[0] - 1);

        const countOrder = await OrderModel.countDocuments({});

        const orders = await OrderModel.find(filter as object)
            .sort(sort as [])
            .lean()
            .populate('user products', 'fullName email title price imageUrl total')
            .skip(skip)
            .limit(limit);


        res.set({
            'Access-Control-Expose-Headers': 'Content-Range',
            'Content-Range': `X-Total-Count: ${1} - ${countOrder} / ${countOrder}`
        });

        res.json({data: orders});
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не вдалося отриманти замовлення',
        });
    }
};

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
};

export const update = async (req: IReqCart, res: Response) => {
    try {
        const {address, status} = req.body;
        const {orderId} = req.params;

        const order = await OrderModel.updateOne(
            {
                _id: orderId,
            },
            {
                address,
                status,
            },
        );

        res.json({
            data: order,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не вдалось оновити замовлення',
        });
    }
};

export const remove = async (req: IReqCart, res: Response) => {
    try {
        const {orderId} = req.params;

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
                    data: doc,
                });
            },
        );
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не вдалось отримати замовлення',
        });
    }
};

export const getOne = async (req: IReqCart, res: Response) => {
    const orderId = req.params.orderId;

    try {
        const order = await OrderModel.findOne({
            _id: orderId,
        })
            .lean()
            .populate('user products', 'fullName email title price imageUrl total');

        res.json(order);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не вдалося отриманти замовлення',
        });
    }
};
