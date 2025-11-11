import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Login from "./pages/Login";
import Overdue from "./pages/Overdue";
import Signup from "./pages/Signup"; 
import CreateTask from "./pages/CreateTask"; 
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Header title="Task Manager" />
        <div className="main-layout">
          <Sidebar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/login" element={<Login />} />
              <Route path="/overdue" element={<Overdue />} />
              <Route path="/create-task" element={<CreateTask />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;