import jwt from 'jsonwebtoken';
import {Response, NextFunction} from "express";
import {IReqGetMe, IDecodedToken} from "../config/interface";

export default (req: IReqGetMe, res: Response, next: NextFunction) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

  if (token) {
    try {
      const decoded = <IDecodedToken>jwt.verify(token, `${process.env.SECRET_TOKEN_KEY}`);

      req.userId = decoded._id;

      next();
    } catch (error) {
      console.log(error);
      return res.status(403).json({
        message: 'Немає доступу',
      });
    }
  } else
    return res.status(403).json({
      message: 'Немає доступу',
    });
};
