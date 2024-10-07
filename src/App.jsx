import React from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

const App = () => {
  return (
    <div>
      <TodoInput />
      <TodoList />
    </div>
  );
};

export default App;
