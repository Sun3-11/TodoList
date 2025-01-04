import React from "react";
import { ToastContainer } from "react-toastify";
import LoginDialog from "./components/Navbar/LoginDialog";
import { useGlobalContext } from "./AppContext";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Sidebar/Home/Home";
import AddTodo from "./components/Sidebar/Todo/AddTodo";
import Sidebar from "./components/Sidebar/Sidebar";

const App = () => {
  const { user, login } = useGlobalContext();

  return (
    <div>
      <ToastContainer position="top-center" />
      {!user ? (
        <LoginDialog login={login} />
      ) : (
        <>
          <Navbar />
          <Router>
            <div>
              {/* Sidebar */}
              <Sidebar />
              {/* Main Content */}
              <div className="flex-1 p-4">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/todos" element={<AddTodo />} />
                </Routes>
              </div>
            </div>
          </Router>
        </>
      )}
    </div>
  );
};

export default App;
