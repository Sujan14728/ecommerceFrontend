import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Customer/Navbar";
import Footer from "../components/Customer/Footer";

const CustormerLayout = () => {
  return (
    <div className=" ">
      <div className="min-h-screen">
        <Navbar />
        <Outlet />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default CustormerLayout;
