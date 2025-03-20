import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TaskList from "./Pages/TaskList";
import AddTask from "./Pages/AddTask";
import DefaultLayout from "./Layout/DefaultLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<TaskList />}></Route>
          <Route path="/add" element={<AddTask />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
