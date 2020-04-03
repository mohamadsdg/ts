import { RequestHandler } from "express";
import { Todo } from "../models/Todo";

const TODO: Todo[] = [];

export const createTodo: RequestHandler = (req, res, nex) => {
  const txt = (req.body as Todo).text;
  const newTodo = new Todo(Math.random().toString(), txt);
  TODO.push(newTodo);
  res.status(201).json({ message: "Created the todo.", createdTodo: TODO });
};
export const getTodo: RequestHandler = (req, res, nex) => {
  res.status(200).json({ todos: TODO });
};
export const updateTodo: RequestHandler = (req, res, next) => {
  const todoId = req.params.id;
  const updateText = (req.body as Todo).text;
  const todoIndex = TODO.findIndex(todo => todo.id === todoId);

  if (todoIndex < 0) throw new Error("Could not find todo!");

  TODO[todoIndex] = new Todo(TODO[todoIndex].id, updateText);

  res.json({ message: "Updated!", updatedTodo: TODO[todoIndex] });
};
