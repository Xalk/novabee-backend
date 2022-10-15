import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {Request, Response} from 'express'

import UserModel from '../models/User';
import {IReqGetMe, IUser} from "../config/interface";

export const register = async (req: Request, res: Response) => {
    try {

        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const doc = new UserModel({
            email: req.body.email,
            fullName: req.body.fullName,
            passwordHash: hash,
        });

        const user = await doc.save();

        const token = jwt.sign(
            {
                _id: user._id,
            },
            'lucky666',
            {
                expiresIn: '30d',
            },
        );


        const {passwordHash, ...userData} = user._doc as IUser;


        res.json({userData, token});
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Не вдалось зареєструватися',
        });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const user = await UserModel.findOne({email: req.body.email});

        if (!user) {
            return res.status(404).json({
                message: 'Користувача не знайдено',
            });
        }

        const isValidPass = await bcrypt.compare(req.body.password, user.passwordHash);

        if (!isValidPass) {
            return res.status(400).json({
                message: 'Невірний логін або пароль',
            });
        }

        const token = jwt.sign(
            {
                _id: user._id,
            },
            'lucky666',
            {
                expiresIn: '30d',
            },
        );

        const {passwordHash, ...userData} = user._doc as IUser;

        res.json({...userData, token});
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Не вдалось увійти',
        });
    }
};

export const getMe = async (req: IReqGetMe, res: Response) => {
    try {
        const user = await UserModel.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                message: 'Користувач не знайдений',
            });
        }

        const {passwordHash, ...userData} = user._doc as IUser;

        res.json(userData);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Немає доступу',
        });
    }
};
