import { Router } from "express";
import { getTodo, createTodo } from "../controllers/Todo";
const route = Router();

route.get("/", getTodo);
route.post("/", createTodo);
route.patch("/:id");
route.delete("/:id");

export default route;
