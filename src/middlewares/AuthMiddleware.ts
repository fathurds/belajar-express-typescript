import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const auth = (req: Request, res: Response, next: NextFunction): any => {
  if(!req.headers.authorization){
    return res.status(401).json({ message: "not authenticated" });
  }

  const secretKey = process.env.JWT_SECRET || 'RAHASIA';

  const token: string = req.headers.authorization.replace('Bearer ', '');

  try {
    const credetial: string | object = jwt.verify(token, secretKey);

    if(!credetial){
      return res.status(400).json({ status: 'error', message: 'token invalid' });
    }

    req.app.locals.credentials = credetial;
    return next();
  } catch (err) {
    return res.status(400).json({ status: 'error', message: 'token invalid', error: err });
  }

};
