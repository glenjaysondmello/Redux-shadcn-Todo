import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todos/todosSlice";

// ShadCN UI components
import { Input } from "./ui/input";
import { Button } from "./ui/button";

import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";

const TodoInput = () => {
  const [todo, setTodo] = useState("");
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (todo.trim()) {
      dispatch(addTodo(todo));
      setTodo("");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center p-4 font-mono text-gray-900">
            Todo Application
          </CardTitle>
          <CardDescription className="text-base text-gray-500 mt-1">
            Manage your tasks effectively
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            type="text"
            placeholder="Add new Todo"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            className="w-full mb-4"
          />
          <Button
            onClick={handleAddTodo}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            Add Todo
          </Button>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-500">
            Add more tasks to stay productive!
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TodoInput;
