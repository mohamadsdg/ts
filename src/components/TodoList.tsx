import React from "react";
import "./TodoList.css";

interface TodoListProperty {
  items: { id: number; text: string }[];
  onDeleteTodo: (id: number) => void;
}

const TodoList: React.FC<TodoListProperty> = props => {
  const { items, onDeleteTodo } = props;
  const todoDeleteHandler = (id: number) => {
    onDeleteTodo(id);
  };
  return (
    <ul>
      {items.map(todo => (
        <li key={todo.id}>
          <span>{todo.text}</span>
          <button onClick={todoDeleteHandler.bind(null, todo.id)}>
            DELETE
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
