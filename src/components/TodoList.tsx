import React, { useMemo, useContext } from "react";
import { TodoContext } from "./TodoContext";
import styles from "./../App.module.css";

const TodoList: React.FC = () => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error("TodoList must be used within TodoProvider");
  }

  const { todos, toggleTodo, deleteTodo } = context;

  const downloadCSV = () => {
    const dataCSV = todos
      .map(
        (todo) =>
          `task: ${todo.text}; completed: ${
            todo.completed ? "done" : "not completed"
          }`
      )
      .join("\n");

    const blob = new Blob([dataCSV], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "todo-list.csv";
    a.click();

    window.URL.revokeObjectURL(url);
  };

  const renderTodos = useMemo(() => {
    return todos.map((todo, index) => (
      <li key={index} className={styles.todoItem}>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={todo.completed}
          onChange={() => toggleTodo(index)}
        />
        <span className={todo.completed ? styles.completed : styles.todoText}>
          {todo.text}
        </span>
        <button
          className={styles.deleteButton}
          onClick={() => deleteTodo(index)}
        >
          Delete
        </button>
      </li>
    ));
  }, [todos, toggleTodo, deleteTodo]);

  return (
    <div>
      <ul>{renderTodos.length > 0 ? renderTodos : <p>* No todo yet</p>}</ul>
      {todos.length > 0 && (
        <button className={styles.buttonCSV} onClick={downloadCSV}>
          Download CSV
        </button>
      )}
    </div>
  );
};

export default TodoList;
