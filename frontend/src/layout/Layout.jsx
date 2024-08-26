import React from "react";
import Header from "../components/Header/Header";
import Routers from "../routes/Routers";
import Footer from "../Footer/Footer";
import { useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();
  const showHeaderFooter = ![
    "/doctor",
    "/login",
    "/register",
    "/doctors",
    "/userpage",
    "/doctorlogin",
    "/doctorsignup",
    "/choose",
    "/doctorpage",
    "/DoctorLogin",
  ].includes(location.pathname);

  return (
    <>
      {showHeaderFooter && <Header />}
      <main>
        <Routers />
      </main>
      {showHeaderFooter && <Footer />}
    </>
  );
};

export default Layout;
