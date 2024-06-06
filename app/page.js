
"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

export default function Component() {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState("")
  const [filter, setFilter] = useState("all")
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos")
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos))
    }
  }, [])
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])
  const handleAddTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: crypto.randomUUID(), text: newTodo, completed: false }])
      setNewTodo("")
    }
  }
  const handleToggleTodo = (id) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }
  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }
  const filteredTodos =
    filter === "all"
      ? todos
      : filter === "completed"
      ? todos.filter((todo) => todo.completed)
      : todos.filter((todo) => !todo.completed)
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gray-900 text-white py-4 px-6">
        <h1 className="text-2xl font-bold">Todo App</h1>
      </header>
      <div className="flex-1 p-6 space-y-4">
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            placeholder="Add a new todo..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddTodo()
              }
            }}
            className="flex-1 rounded-md border-gray-300 focus:border-gray-500 focus:ring-0"
          />
          <Button onClick={handleAddTodo} className="rounded-md bg-gray-900 text-white hover:bg-gray-800">
            Add
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant={filter === "all" ? "primary" : "outline"}
              onClick={() => setFilter("all")}
              className="rounded-md"
            >
              All
            </Button>
            <Button
              variant={filter === "completed" ? "primary" : "outline"}
              onClick={() => setFilter("completed")}
              className="rounded-md"
            >
              Completed
            </Button>
            <Button
              variant={filter === "incomplete" ? "primary" : "outline"}
              onClick={() => setFilter("incomplete")}
              className="rounded-md"
            >
              Incomplete
            </Button>
          </div>
          <div className="text-gray-500">
            {filteredTodos.length} {filteredTodos.length === 1 ? "task" : "tasks"}
          </div>
        </div>
        <div className="space-y-2">
          {filteredTodos.map((todo) => (
            <div
              key={todo.id}
              className={`flex items-center justify-between rounded-md border border-gray-300 p-3 ${
                todo.completed ? "bg-gray-100 line-through text-gray-500" : "bg-white hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`todo-${todo.id}`}
                  checked={todo.completed}
                  onCheckedChange={() => handleToggleTodo(todo.id)}
                />
                <label htmlFor={`todo-${todo.id}`} className="text-sm font-medium">
                  {todo.text}
                </label>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDeleteTodo(todo.id)}
                className="text-gray-500 hover:text-gray-900"
              >
                <Trash2Icon className="w-5 h-5" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Trash2Icon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      <line x1="10" x2="10" y1="11" y2="17" />
      <line x1="14" x2="14" y1="11" y2="17" />
    </svg>
  )
}