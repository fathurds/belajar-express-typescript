import { Request, Response } from "express";
import Authentication from "../utils/Authentication";

const { User } = require('../db/models');

class AuthController {
  register = async (req: Request, res: Response): Promise<Response> => {
    const { username, password } = req.body;

    const user = await User.findByPk(username);

    if(user){
      return res.status(400).json({ message: "username already used", status: 'error' });
    }

    const hashedPassword: string = await Authentication.passwordHash(password);

    await User.create({ username, password: hashedPassword });

    return res.json({ status: "success", message: `${username} created` });
  }
  login = async (req: Request, res: Response): Promise<Response> => {
    const {username, password} = req.body;

    const user = await User.findByPk(username);

    if(!user){
      return res.status(422).json({ status: 'error', message: "wrong username or password" });
    }

    const compare = await Authentication.passwordCompare(password, user.password);

    if(!compare){
      return res.status(422).json({ status: 'error', message: "wrong username or password" });
    }

    const token = await Authentication.generateToken(username);
    
    if(!token) {
      return res.status(400).json({ status: 'error', message: "auth failed" });
    }

    return res.json({ status: "success", token });
  }
  profile = async (req: Request, res: Response): Promise<Response> => {
    const credentials = req.app.locals.credentials;
    return res.json({ status: "success", data: credentials });
  }
}

export default new AuthController();
