import React, { useContext, useState } from "react";
import { TodoContext } from "./TodoContext";
import styles from "./../App.module.css";

const TodoFilter: React.FC = () => {
  const todoContext = useContext(TodoContext);
  if (!todoContext) throw new Error("TodoContext is not provided");
  const { setFilter } = todoContext;
  const [activeFilter, setActiveFilter] = useState<
    "all" | "completed" | "active"
  >("all");

  const handleFilterClick = (filter: "all" | "completed" | "active") => {
    setFilter(filter);
    setActiveFilter(filter);
  };

  return (
    <div className={styles.filterButtons}>
      <button
        className={`${styles.button} ${
          activeFilter === "all" ? styles.active : ""
        }`}
        onClick={() => handleFilterClick("all")}
      >
        All
      </button>
      <button
        className={`${styles.button} ${
          activeFilter === "completed" ? styles.active : ""
        }`}
        onClick={() => handleFilterClick("completed")}
      >
        Completed
      </button>
      <button
        className={`${styles.button} ${
          activeFilter === "active" ? styles.active : ""
        }`}
        onClick={() => handleFilterClick("active")}
      >
        Active
      </button>
    </div>
  );
};

export default TodoFilter;
