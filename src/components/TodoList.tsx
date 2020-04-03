import React from "react";
// import { Todo } from "../Todo.model";

interface TodoListProperty {
  items: { id: number; text: string }[];
}

const TodoList: React.FC<TodoListProperty> = props => {
  const { items } = props;
  return (
    <ul>
      {items.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
};

export default TodoList;
