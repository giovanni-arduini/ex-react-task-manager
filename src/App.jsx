import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TaskList from "./Pages/TaskList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TaskList />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
