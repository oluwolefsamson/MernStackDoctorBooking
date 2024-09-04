import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header/Header";
import Routers from "../routes/Routers";
import Footer from "../Footer/Footer";

const Layout = () => {
  const location = useLocation();

  // Check if the current path matches any route where Header and Footer should be hidden
  const shouldHideHeaderFooter = [
    "/doctor",
    "/login",
    "/register",
    "/doctors",
    "/userpage",
    "/DoctorLogin",
    "/doctorsignup",
    "/choose",
    "/doctorpage",
    "/bookingform",
  ].some((path) => location.pathname.startsWith(path));

  console.log("Should hide Header/Footer:", shouldHideHeaderFooter);
  console.log("Current path:", location.pathname);

  return (
    <>
      {!shouldHideHeaderFooter && <Header />}
      <main>
        <Routers />
      </main>
      {!shouldHideHeaderFooter && <Footer />}
    </>
  );
};

export default Layout;
