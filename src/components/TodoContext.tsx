import { createContext, useState, ReactNode } from "react";
import { Todo } from "../types";

interface TodoContextType {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  toggleTodo: (index: number) => void;
  deleteTodo: (index: number) => void;
}

export const TodoContext = createContext<TodoContextType | undefined>(
  undefined
);

interface TodoProviderProps {
  children: ReactNode;
}

export const TodoProvider = ({ children }: TodoProviderProps) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (todo: Todo) => {
    setTodos((prevTodos) => [...prevTodos, todo]);
  };

  const toggleTodo = (index: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (index: number) => {
    setTodos((prevTodos) => prevTodos.filter((_, i) => i !== index));
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, toggleTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
};
