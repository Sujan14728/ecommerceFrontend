import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Customer/Navbar";
import Footer from "../components/Customer/Footer";

const CustormerLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default CustormerLayout;
