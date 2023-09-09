import BaseRouter from "./BaseRouter";
import TodoController from "../controllers/TodoController";
import validate from "../middlewares/TodoValidator";

class TodoRoutes extends BaseRouter{
  public routes(): void {
    this.router.get("/", TodoController.index);
    this.router.post("/", validate, TodoController.create);
    this.router.get("/:id", TodoController.show);
    this.router.put("/:id", validate, TodoController.update);
    this.router.delete("/:id", TodoController.destroy);
  }
}

export default new TodoRoutes().router;