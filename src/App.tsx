import styles from "./App.module.css";
import { TodoProvider } from "./components/TodoContext";
import TodoForm from "./components/TodoForm";

function App() {
  return (
    <TodoProvider>
      <div className={styles.container}>
        <h1 className={styles.title}>Todo Application</h1>
        <TodoForm />
      </div>
    </TodoProvider>
  );
}

export default App;
