import React, { useRef } from "react";
import "./NewTodo.css";

type NewTodoProperty = {
  onAddTodo: (text: string) => void;
};

const NewTodo: React.FC<NewTodoProperty> = props => {
  const textInputRef = useRef<HTMLInputElement>(null);
  const { onAddTodo } = props;

  const todoSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const enterVal = textInputRef.current!.value;
    onAddTodo(enterVal);
  };
  return (
    <form onSubmit={todoSubmitHandler}>
      <div className="form-control">
        <label htmlFor="todo-text">Todo Text</label>
        <input type="text" name="todo-text" ref={textInputRef} />
      </div>
      <button type="submit">ADD TODO</button>
    </form>
  );
};
export default NewTodo;
