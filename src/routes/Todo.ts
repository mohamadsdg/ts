import { Router } from "express";
import {
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo
} from "../controllers/Todo";
const route = Router();

route.get("/", getTodo);
route.post("/", createTodo);
route.patch("/:id", updateTodo);
route.delete("/:id", deleteTodo);

export default route;
