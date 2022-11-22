import { IReqCart } from '../config/interface';
import { Response } from 'express';
import UserModel from '../models/User';
import mongoose from 'mongoose';

export const addToCart = async (req: IReqCart, res: Response) => {
  const { productId } = req.body;
  const productObjectId = new mongoose.Types.ObjectId(productId);
  try {
    const user = await UserModel.findOneAndUpdate(
      {
        _id: req.userId,
      },
      {
        $push: { 'cart.items': productObjectId },
      },
    );

    if (!user) {
      return res.status(404).json({
        message: 'Користувача не знайдено',
      });
    }

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не вдалось додати в корзину',
    });
  }
};

export const getCartItems = async (req: IReqCart, res: Response) => {
  try {
    const user = await UserModel.findById(req.userId).populate('cart.items').exec();

    if (!user) {
      return res.status(404).json({
        message: 'Користувача не знайдено',
      });
    }

    res.json(user.cart.items);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не вдалось отримати елементи в корзині',
    });
  }
};

export const removeCartItem = async (req: IReqCart, res: Response) => {
  try {
    const productId = req.params.productId;
    const user = await UserModel.findOneAndUpdate(
      { _id: req.userId },
      {
        $pullAll: {
          'cart.items': [{ _id: productId }],
        },
      },
    );

    if (!user) {
      return res.status(404).json({
        message: 'Користувача не знайдено',
      });
    }

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не вдалось видалити елемент з корзини',
    });
  }
};
