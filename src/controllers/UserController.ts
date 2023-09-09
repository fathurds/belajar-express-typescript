import { Request, Response } from "express";
import IController from "./ControllerInterface";

interface DataType {
  id: number;
  name: string;
}

let data: DataType[] = [
  { id: 1, name: "Ami" },
  { id: 2, name: "Budi" },
  { id: 3, name: "Cacha" },
  { id: 4, name: "Dedi" },
];

class UserController implements IController {
  index(req: Request, res: Response): Response {
    return res.status(200).json({ message: "success", data });
  }
  create(req: Request, res: Response): Response {
    const { id, name } = req.body;

    data.push({ id, name });

    return res.json({ message: "success", data });
  }
  show(req: Request, res: Response): Response {
    const { id } = req.params;

    const item = data.find((el) => el.id === parseInt(id));

    if (!item) {
      return res.status(404).json({ message: "data not found" });
    }

    return res.json({ message: "success", data: item });
  }
  update(req: Request, res: Response): Response {
    const { id } = req.params;
    const { name } = req.body;

    const itemIdx = data.findIndex((el: any) => el.id == id);

    if (itemIdx < 0) {
      return res.status(404).json({ message: "data not found" });
    }

    data[itemIdx].name = name;

    return res.json({ message: "success", data: data[itemIdx] });
  }
  destroy(req: Request, res: Response): Response {
    const { id } = req.params;

    const itemIdx = data.findIndex((el: any) => el.id == id);

    if (itemIdx < 0) {
      return res.status(404).json({ message: "data not found" });
    }

    data.splice(itemIdx, 1);

    return res.json({ message: "success", data });
  }
}

export default new UserController();
