import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalContext from "./Context/GlobalContext";
import TaskList from "./Pages/TaskList";
import AddTask from "./Pages/AddTask";
import DefaultLayout from "./Layout/DefaultLayout";
import { useState, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/tasks")
      .then((response) => response.json())
      .then((data) => setTasks(data));
  }, []);

  return (
    <GlobalContext.Provider value={{ tasks, setTasks }}>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<TaskList />}></Route>
            <Route path="/add" element={<AddTask />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalContext.Provider>
  );
}

export default App;
