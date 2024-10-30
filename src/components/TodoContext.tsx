import {
  createContext,
  useState,
  ReactNode,
  useMemo,
  useEffect,
  useCallback,
} from "react";
import { Todo } from "../types";
import { v4 as uuidv4 } from "uuid";

interface TodoContextType {
  todos: Todo[];
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  setFilter: React.Dispatch<
    React.SetStateAction<"all" | "completed" | "active">
  >;
  downloadCSV: () => void;
}

export const TodoContext = createContext<TodoContextType | undefined>(
  undefined
);

interface TodoProviderProps {
  children: ReactNode;
}

export const TodoProvider = ({ children }: TodoProviderProps) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const savedTodos = localStorage.getItem("todos");
      return savedTodos ? JSON.parse(savedTodos) : [];
    } catch (error) {
      console.error("Error loading todos from localStorage", error);
      return [];
    }
  });

  const [filter, setFilter] = useState<"all" | "completed" | "active">(() => {
    const savedFilter = localStorage.getItem("filter");
    return savedFilter
      ? (savedFilter as "all" | "completed" | "active")
      : "all";
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem("filter", filter);
  }, [filter]);

  const addTodo = useCallback((text: string) => {
    const newTodo: Todo = { id: uuidv4(), text, completed: false };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }, []);

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case "completed":
        return todos.filter((todo) => todo.completed);
      case "active":
        return todos.filter((todo) => !todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  // Download CSV
  const generateCSV = (todos: Todo[]) => {
    return (
      "task,completed\n" +
      todos
        .map(
          (todo) => `${todo.text},${todo.completed ? "done" : "not completed"}`
        )
        .join("\n")
    );
  };

  const downloadCSV = () => {
    const dataCSV = generateCSV(todos);
    const blob = new Blob([dataCSV], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "todo-list.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <TodoContext.Provider
      value={{
        todos: filteredTodos,
        addTodo,
        toggleTodo,
        deleteTodo,
        setFilter,
        downloadCSV,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
