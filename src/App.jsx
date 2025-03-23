import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalProvider } from "./Context/GlobalContext";
import TaskList from "./Pages/TaskList";
import AddTask from "./Pages/AddTask";
import TaskDetail from "./Pages/TaskDetail";
import DefaultLayout from "./Layout/DefaultLayout";

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<TaskList />}></Route>
            <Route path="/add" element={<AddTask />}></Route>
            <Route path="/task/:id" element={<TaskDetail />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
