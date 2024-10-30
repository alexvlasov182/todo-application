import React, { useMemo, useContext } from "react";
import { TodoContext } from "./TodoContext";
import styles from "./../App.module.css";

const TodoList: React.FC = () => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error("TodoList must be used within TodoProvider");
  }

  const { todos, toggleTodo, deleteTodo, downloadCSV } = context;

  const renderTodos = useMemo(() => {
    return todos.map((todo) => (
      <li key={todo.id} className={styles.todoItem}>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
        />
        <span className={todo.completed ? styles.completed : styles.todoText}>
          {todo.text}
        </span>
        <button
          className={styles.deleteButton}
          onClick={() => deleteTodo(todo.id)}
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
