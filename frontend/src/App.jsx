import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Component/Navbar";
import Home from "./pages/Home";
import PageNotFound from "./Component/PageNotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AllCarsComplaints from "./pages/AllCarsComplaints";
import SingleComplaints from "./pages/SingleComplaints";
import RaiseComplaint from "./pages/RaiseComplaint";
import AllUsers from "./pages/AllUsers";
import AllAdminComplaints from "./pages/AllAdminComplaints";
import AllAdminNotes from "./pages/AllAdminNotes";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/cars" element={<AllCarsComplaints />} />
        <Route path="/raise" element={<RaiseComplaint />} />
        <Route path="/cars/:id" element={<SingleComplaints />} />
        <Route path="/admin/users" element={<AllUsers />} />
        <Route path="/admin/cars" element={<AllAdminComplaints />} />
        <Route path="/admin/notes" element={<AllAdminNotes />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default App;
