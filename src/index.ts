import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import { auth } from "./middlewares/AuthMiddleware";

// ROUTER
import UserRouter from "./routers/UserRouter";
import AuthRouter from "./routers/AuthRouter";
import TodoRouter from "./routers/TodoRouter";

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.plugins();
    this.routes();
    dotenv.config();
  }

  protected plugins(): void {
    this.app.use(bodyParser.json());
    this.app.use(morgan("dev"));
    this.app.use(compression());
    this.app.use(helmet());
    this.app.use(cors());
  }

  protected routes(): void {
    this.app.route("/").get((req: Request, res: Response) => {
      res.send("Ini adalah route menggunakan typescript");
    });

    this.app.use("/users", auth, UserRouter);
    this.app.use("/auth", AuthRouter);
    this.app.use("/todos", auth, TodoRouter)
  }
}

const port: number = 8000;
const app = new App().app;
app.listen(port);
