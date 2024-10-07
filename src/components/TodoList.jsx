import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeTodo, updateTodo, addTodo } from "../features/todos/todosSlice";

// Import ShadCN UI components
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";

const TodoList = () => {
  const [editing, setEditing] = useState(null);
  const [updateText, setUpdateText] = useState("");
  const todos = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos) {
      savedTodos.forEach((todo) => {
        if (!todos.some((existingTodo) => existingTodo === todo)) {
          dispatch(addTodo(todo));
        }
      });
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleRemoveTodo = (index) => {
    dispatch(removeTodo(index));
  };

  const handleEditTodo = (currentText, index) => {
    setEditing(index);
    setUpdateText(currentText);
  };

  const handleUpdateTodo = (index) => {
    if (updateText.trim()) {
      dispatch(updateTodo({ newText: updateText, index }));
      setEditing(null);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <ul className="space-y-4">
        {todos.map((todo, index) => (
          <li key={index}>
            <Card className="shadow-md border border-gray-200 rounded-lg">
              <CardContent className="flex justify-between items-center p-4">
                {editing === index ? (
                  <div className="flex-1 mr-4">
                    <Input
                      type="text"
                      value={updateText}
                      placeholder="Update Todo"
                      onChange={(e) => setUpdateText(e.target.value)}
                      className="w-full"
                    />
                  </div>
                ) : (
                  <span className="text-lg font-medium text-gray-800 leading-6">
                    {todo}
                  </span>
                )}
              </CardContent>
              <CardFooter className="flex justify-end gap-4">
                {editing === index ? (
                  <Button
                    onClick={() => handleUpdateTodo(index)}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    Save
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={() => handleEditTodo(todo, index)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleRemoveTodo(index)}
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      Remove
                    </Button>
                  </>
                )}
              </CardFooter>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
