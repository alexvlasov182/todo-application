import React, { useContext, useState } from "react";
import { TodoContext } from "./TodoContext";
import styles from "./../App.module.css";

const TodoForm: React.FC = () => {
  const [task, setTask] = useState<string>("");
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error("TodoForm must be used within TodoProvider");
  }

  const { addTodo } = context;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (task.trim() !== "") {
      addTodo({ text: task, completed: false });
      setTask("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formWrapper}>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Type task here"
        className={styles.input}
      />
      <button type="submit" className={styles.button}>
        Add Todo
      </button>
    </form>
  );
};

export default TodoForm;
