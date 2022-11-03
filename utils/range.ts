import { NextFunction, Response, Request } from 'express';
import { IReqCart } from '../config/interface';

export default (req: IReqCart, res: Response, next: NextFunction) => {
  res.header('Content-Range', 'product 0-20/20');
  res.header('Access-Control-Expose-Headers', 'Content-Range');
  next();
};
