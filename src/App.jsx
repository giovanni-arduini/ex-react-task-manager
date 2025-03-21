import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalProvider } from "./Context/GlobalContext";
import TaskList from "./Pages/TaskList";
import AddTask from "./Pages/AddTask";
import DefaultLayout from "./Layout/DefaultLayout";
import { useState, useEffect } from "react";

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<TaskList />}></Route>
            <Route path="/add" element={<AddTask />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
