import React, { useState } from "react";
import TodoList from "./components/TodoList";
import NewTodo from "./components/NewTodo";
import { Todo } from "./Todo.model";

const App: React.FC = () => {
  const [todos, setTodo] = useState<Todo[]>([]);
  //  Math.random()
  const todoAddHandlre = (text: string) => {
    // console.log("inside App", text);
    setTodo(prevState => [
      ...prevState,
      { id: Math.random(), text: text.trim() }
    ]);
  };

  const todoDeleteHandler = (id: number) => {
    // console.log("todoDeleteHandler", id);
    setTodo(prevTodo => prevTodo.filter(todo => todo.id !== id));
    // const newTodos = todos.filter(todo => todo.id !== id);
    // setTodo(newTodos);
  };

  return (
    <div className="App">
      <NewTodo onAddTodo={todoAddHandlre} />
      <TodoList items={todos} onDeleteTodo={todoDeleteHandler} />
    </div>
  );
};

export default App;
