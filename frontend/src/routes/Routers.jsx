import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Services from "../pages/Services";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Contact from "../pages/Contact";
import Doctors from "../pages/Doctors/Doctors";
import DoctorDetails from "../pages/Doctors/DoctorDetails";
import UserPage from "../components/UserProfile/UserProfile";
import DoctorLogin from "../pages/DoctorLogin";
import DoctorSignup from "../pages/DoctorSignup";
import ChoosePage from "../pages/choose";
import DoctorPage from "../pages/Doctors/DoctorPage";
import AppointmentForm from "../pages/BookAppointmentForm";
import AdminLogin from "../pages/Admin/AdminLogin";
import DashboardPage from "../pages/Admin/DashboardPage";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/doctor" element={<Doctors />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/services" element={<Services />} />
      <Route path="/userpage" element={<UserPage />} />
      <Route path="/doctorlogin" element={<DoctorLogin />} />
      <Route path="/doctorsignup" element={<DoctorSignup />} />
      <Route path="/choose" element={<ChoosePage />} />
      <Route path="/doctor/:doctorId" element={<DoctorDetails />} />
      <Route path="/doctorpage/:doctorId" element={<DoctorPage />} />
      <Route path="/bookingform/:doctorId" element={<AppointmentForm />} />
      <Route path="/adminlogin" element={<AdminLogin />} />
      <Route path="/admin" element={<DashboardPage />} />

      {/* Ensure this is the exact path */}
    </Routes>
  );
};

export default Routers;
