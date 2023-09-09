import { Request } from "express";

const { Todo } = require("../db/models");

class TodoServices {
  credential: {
    username: string;
  };

  username: string;
  body: Request["body"];
  params: Request["params"];

  constructor(req: Request) {
    this.credential = req.app.locals.credentials;
    this.username = req.app.locals.credentials.username;
    this.body = req.body;
    this.params = req.params;
  }

  getAll = async () => {
    const todos = await Todo.findAll({
      where: { username: this.username },
      attributes: ["id", "description"],
    });

    return todos;
  };

  getOne = async () => {
    const { id } = this.params;
    const todo = await Todo.findOne({ where: { id, username: this.username } });

    return todo;
  };

  store = async () => {
    const { description } = this.body;
    const todo = await Todo.create({ username: this.username, description });

    return todo;
  };

  update = async () => {
    const { id } = this.params;
    const { description } = this.body;

    const todo = await Todo.update(
      { description },
      { where: { id, username: this.username } }
    );

    return todo;
  };

  delete = async () => {
    const { id } = this.params;

    const todo = await Todo.destroy({ where: { id, username: this.username } });

    return todo;
  };
}

export default TodoServices;
