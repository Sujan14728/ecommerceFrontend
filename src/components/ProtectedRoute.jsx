import React from "react";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
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
  return <Outlet />;
};

export default ProtectedRoute;
