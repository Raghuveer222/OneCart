import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Lists from "./pages/Lists";
import Add from "./pages/Add";
import Orders from "./pages/Orders";
import { useContext } from "react";
import { AdminContext } from "./context/AdminContext.jsx";
import { ToastContainer, toast } from 'react-toastify';

const App = () => {
  let { adminData } = useContext(AdminContext);

  return (
    <div>
      <ToastContainer />
      {!adminData ? (
        <Login />
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/lists" element={<Lists />} />
          <Route path="/add" element={<Add />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
