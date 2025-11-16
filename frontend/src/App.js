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
import SearchResults from "./pages/SearchResults";
import EditTask from "./pages/EditTask";
import MyTasks from "./pages/myTasks";
import AllTasks from "./pages/AllTasks";
import Account from "./pages/Account";
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
              <Route path="/search" element={<SearchResults />} />
              <Route path="/tasks/:id" element={<EditTask />} />
              <Route path="/myTasks" element={<MyTasks />} />
              <Route path="/AllTasks" element={<AllTasks />} />
              <Route path="/Account" element={<Account />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;