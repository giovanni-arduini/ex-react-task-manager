import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TaskList from "./Pages/TaskList";
import AddTask from "./Pages/AddTask";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TaskList />}></Route>
        <Route path="/add" element={<AddTask />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
