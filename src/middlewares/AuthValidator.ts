import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";

const validate = [
  check("username").isString().withMessage('not a valid username'),
  check("password").isLength({ min: 6 }).withMessage('password must be at least 6 characters'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    const message = errors.array().map(el => el.msg).join(', ');

    if(!errors.isEmpty()){
      return res.status(422).send({ status: 'error' , message })
    }

    return next();
  }
];


export default validate;