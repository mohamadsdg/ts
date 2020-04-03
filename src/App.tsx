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

  return (
    <div className="App">
      <NewTodo onAddTodo={todoAddHandlre} />
      <TodoList items={todos} />
    </div>
  );
};

export default App;
