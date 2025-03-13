import React from "react";
import AdminSidebar from "../components/Admin/AdminSidebar";
import { Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminLayout = () => {
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

  if (user?.userType !== "admin") {
    return (
      <div className="w-full flex flex-col items-center pt-8 text-[24px] font-[600] gap-4 ">
        <span>You do not have access to admin pages.</span>
        <Link
          to={"/"}
          className="text-[20px] font-[400] bg-blue-400 text-white py-1 px-6 rounded-lg "
        >
          Go to Home
        </Link>
      </div>
    );
  }
  return (
    <div className="flex">
      <AdminSidebar />
      <Outlet />
    </div>
  );
};

export default AdminLayout;
