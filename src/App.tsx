import styles from "./App.module.css";

import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import TodoFilter from "./components/TodoFilter";

function App() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Todo Application</h1>
      <TodoFilter />
      <TodoForm />
      <TodoList />
    </div>
  );
}

export default App;
