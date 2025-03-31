import { createContext, useContext } from "react";
import useTasks from "../Hooks/useTasks";
const GlobalContext = createContext();
export function useGlobalContext() {
  return useContext(GlobalContext);
}

export function GlobalProvider({ children }) {
  //rendere disponibile useTasks nel global context
  const { tasks, addTask, removeTask, updateTask, removeMultipeTasks } =
    useTasks();

  return (
    <GlobalContext.Provider
      value={{ tasks, addTask, removeTask, updateTask, removeMultipeTasks }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
