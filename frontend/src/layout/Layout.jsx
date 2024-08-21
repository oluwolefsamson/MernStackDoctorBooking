import React from "react";
import Header from "../components/Header/Header";
import Routers from "../routes/Routers";
import Footer from "../Footer/Footer";
import { useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();
  const showHeaderFooter = ![
    "/login",
    "/register",
    "/doctors",
    "/userpage",
    "/doctorlogin",
    "/doctorsignup",
    "/choose",
    "/doctorpage",
    "/doctors/01",
    "/doctors/02",
    "/doctors/03",
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
