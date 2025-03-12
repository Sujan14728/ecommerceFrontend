import React from "react";
import { Link, Outlet } from "react-router-dom";
import Sidebar from "../components/Seller/Sidebar";
import { useSelector } from "react-redux";

const SellerLayout = () => {
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  if (!isAuthenticated) {
    return (
      <div className="w-full flex flex-col items-center pt-8 text-[24px] font-[600] gap-4 ">
        <span>You do not have access</span>
        <Link
          to={"/auth"}
          className="text-[20px] font-[400] bg-blue-400 text-white py-1 px-6 rounded-lg "
        >
          Login
        </Link>
      </div>
    );
  }

  if (user?.userType !== "seller") {
    return (
      <div className="w-full flex flex-col items-center pt-8 text-[24px] font-[600] gap-4 ">
        <span>You must become a seller to get access to this page.</span>
        <Link
          to={"/auth"}
          className="text-[20px] font-[400] bg-blue-400 text-white py-1 px-6 rounded-lg "
        >
          Become a Seller?
        </Link>
      </div>
    );
  }
  return (
    <div className="flex">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default SellerLayout;
