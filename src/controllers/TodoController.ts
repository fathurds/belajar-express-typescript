import { Request, Response } from "express";
import IController from "./ControllerInterface";
import TodoServices from "../services/TodoServices";

const { Todo } = require("../db/models");

class UserController implements IController {
  index = async (req: Request, res: Response): Promise<Response> => {
    const service: TodoServices = new TodoServices(req);
    const todos = await service.getAll();

    return res.json({ status: "success", data: todos });
  };
  create = async (req: Request, res: Response): Promise<Response> => {
    const service: TodoServices = new TodoServices(req);

    const todo = await service.store();

    return res.json({ status: "success", message: "Todo created", data: todo });
  };
  show = async (req: Request, res: Response): Promise<Response> => {
    const service: TodoServices = new TodoServices(req);
    const todo = await service.getOne();

    if (!todo) {
      return res
        .status(404)
        .json({ status: "error", message: "Data not found" });
    }

    return res.json({ status: "success", data: todo });
  };
  update = async (req: Request, res: Response): Promise<Response> => {
    const service: TodoServices = new TodoServices(req);

    const todo = await service.getOne();

    if (!todo) {
      return res
        .status(404)
        .json({ status: "error", message: "Data not found" });
    }

    await service.update();

    return res.json({ status: "success", message: "data updated" });
  };
  destroy = async (req: Request, res: Response): Promise<Response> => {
    const service: TodoServices = new TodoServices(req);

    const todo = await service.getOne();

    if (!todo) {
      return res
        .status(404)
        .json({ status: "error", message: "Data not found" });
    }

    await service.delete();

    return res.json({ status: "success", message: "data deleted", data: todo });
  };
}

export default new UserController();
