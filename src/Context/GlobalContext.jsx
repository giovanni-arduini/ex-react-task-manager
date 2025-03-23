import { createContext } from "react";
import useTasks from "../Hooks/useTasks";
export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  //rendere disponibile useTasks nel global context
  const tasksData = useTasks();

  return (
    <GlobalContext.Provider value={{ ...tasksData }}>
      {children}
    </GlobalContext.Provider>
  );
}
