"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Component() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [newTodoPriority, setNewTodoPriority] = useState("low");
  const [newTodoDueDate, setNewTodoDueDate] = useState("");
  const [filter, setFilter] = useState("all");
  const [editingTodo, setEditingTodo] = useState(null);
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  const handleAddTodo = () => {
    if (newTodo.trim()) {
      setTodos([
        ...todos,
        {
          id: crypto.randomUUID(),
          text: newTodo,
          completed: false,
          priority: newTodoPriority,
          dueDate: newTodoDueDate,
        },
      ]);
      setNewTodo("");
      setNewTodoPriority("low");
      setNewTodoDueDate("");
    }
  };
  const handleToggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEditTodo = (todo) => {
    setEditingTodo(todo);
    setNewTodo(todo.text);
    setNewTodoPriority(todo.priority);
    setNewTodoDueDate(todo.dueDate);
  };

  const handleUpdateTodo = () => {
    if (newTodo.trim()) {
      setTodos(
        todos.map((todo) =>
          todo.id === editingTodo.id
            ? {
                ...todo,
                text: newTodo,
                priority: newTodoPriority,
                dueDate: newTodoDueDate,
              }
            : todo
        )
      );
      setEditingTodo(null);
      setNewTodo("");
      setNewTodoPriority("low");
      setNewTodoDueDate("");
    }
  };

  const filteredTodos =
    filter === "all"
      ? todos
      : filter === "completed"
      ? todos.filter((todo) => todo.completed)
      : filter === "incomplete"
      ? todos.filter((todo) => !todo.completed)
      : filter === "low"
      ? todos.filter((todo) => todo.priority === "low")
      : filter === "medium"
      ? todos.filter((todo) => todo.priority === "medium")
      : todos.filter((todo) => todo.priority === "high");
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gray-900 text-white py-4 px-6">
        <h1 className="text-2xl font-bold">Todo App</h1>
      </header>
      <div className="flex-1 p-6 space-y-8">
        <div className={cn("grid grid-cols-5 gap-6 items-end space-x-2" , [
          editingTodo ? "bg-gray-200 border-gray-300 rounded-md p-6" : "",
         
        
        ])}>
          <div className="col-span-2 flex flex-col gap-3">
            <h5>Add Todo</h5>
            <Input
              type="text"
              placeholder="Add a new todo..."
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAddTodo();
                }
              }}
              className={cn("rounded-md  border-gray-300 focus:border-gray-500 focus:ring-0" , [
                editingTodo ? "border-red-900" : "",
              
              ])}
            />
          </div>
          <div className="flex flex-col gap-3">
            <h5>Set Priority</h5>
            <Select
              value={newTodoPriority}
              onValueChange={(value) => setNewTodoPriority(value)}
              className="rounded-md col-span-1 border-gray-300 focus:border-gray-500 focus:ring-0"
            >
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-3">
            <h5>Due Date</h5>
            <Input
              type="date"
              value={newTodoDueDate}
              onChange={(e) => setNewTodoDueDate(e.target.value)}
              className="rounded-md col-span-1 border-gray-300 focus:border-gray-500 focus:ring-0"
            />
          </div>
          <Button
            onClick={editingTodo ? handleUpdateTodo : handleAddTodo}
            className="rounded-md col-span-1 bg-gray-900 text-white hover:bg-gray-800"
          >
            {editingTodo ? "Update" : "Add"}
          </Button>
        </div>
        <div className=" mt-6 flex  items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
              className="rounded-md"
            >
              All
            </Button>
            <Button
              variant={filter === "completed" ? "default" : "outline"}
              onClick={() => setFilter("completed")}
              className="rounded-md"
            >
              Completed
            </Button>
            <Button
              variant={filter === "incomplete" ? "default" : "outline"}
              onClick={() => setFilter("incomplete")}
              className="rounded-md"
            >
              Incomplete
            </Button>
            <Button
              variant={filter === "low" ? "default" : "outline"}
              onClick={() => setFilter("low")}
              className="rounded-md"
            >
              Low Priority
            </Button>
            <Button
              variant={filter === "medium" ? "default" : "outline"}
              onClick={() => setFilter("medium")}
              className="rounded-md"
            >
              Medium Priority
            </Button>
            <Button
              variant={filter === "high" ? "default" : "outline"}
              onClick={() => setFilter("high")}
              className="rounded-md"
            >
              High Priority
            </Button>
          </div>
          <div className="text-gray-500">
            {filteredTodos.length}{" "}
            {filteredTodos.length === 1 ? "task" : "tasks"}
          </div>
        </div>
        <div className="space-y-2">
          {filteredTodos.length === 0 ? (
            <div>
              {filter === "all"
                ? "No Todos found"
                : filter === "completed"
                ? "No Completed todos found"
                : filter === "incomplete"
                ? "No Incomplete todos found"
                : filter === "low"
                ? "No Low priority todos found"
                : filter === "medium"
                ? "No Medium priority todos found"
                : "No High priority todos found"}
            </div>
          ) : (
            filteredTodos.map((todo) => (
              <div
                key={todo.id}
                className={`flex items-center justify-between rounded-md border border-gray-300 p-3 ${
                  todo.completed
                    ? "bg-gray-100 line-through text-gray-500"
                    : "bg-white hover:bg-gray-100"
                } ${
                  todo.priority === "low"
                    ? "border-green-500"
                    : todo.priority === "medium"
                    ? "border-yellow-500"
                    : "border-red-500"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`todo-${todo.id}`}
                    checked={todo.completed}
                    onCheckedChange={() => handleToggleTodo(todo.id)}
                  />
                  <label
                    htmlFor={`todo-${todo.id}`}
                    className="text-sm font-medium"
                  >
                    {todo.text}
                  </label>
                  <div
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      todo.priority === "low"
                        ? "bg-green-100 text-green-500"
                        : todo.priority === "medium"
                        ? "bg-yellow-100 text-yellow-500"
                        : "bg-red-100 text-red-500"
                    }`}
                  >
                    {todo.priority}
                  </div>
                  <div className="text-gray-500 text-xs">{todo.dueDate}</div>
                </div>
                <div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEditTodo(todo)}
                    className="text-gray-500 hover:text-gray-900"
                  >
                    <Edit className="w-5 h-5" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteTodo(todo.id)}
                    className="text-gray-500 hover:text-gray-900"
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
