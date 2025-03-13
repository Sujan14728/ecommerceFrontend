import React from "react";
import { Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { LuPackage, LuUsersRound } from "react-icons/lu";
import { FaRegStar } from "react-icons/fa";
import { LiaAdversal } from "react-icons/lia";
import { AiOutlineProduct } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";

const items = [
  {
    key: "1",
    icon: <MdDashboard />,
    label: "Dashboard",
    path: "/admin",
  },
  {
    key: "2",
    icon: <LuUsersRound />,
    label: "All Users",
    path: "/admin/users",
  },
  {
    key: "3",
    icon: <LiaAdversal />,
    label: "Ads Management",
    path: "/admin/adverts",
  },
  {
    key: "4",
    icon: <AiOutlineProduct />,
    label: "Product Management",
    path: "/admin/products",
  },
  {
    key: "5",
    icon: <FaRegStar />,
    label: "Reviews",
    path: "/admin/reviews",
  },
  {
    key: "6",
    icon: <LuPackage />,
    label: "Orders",
    path: "/admin/orders",
  },

  {
    key: "7",
    icon: <CgProfile />,
    label: "Profile",
    path: "/admin/profile",
  },
];
const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedKey = items.find(
    (item) => item.path === location.pathname
  )?.key;
  const handleMenuClick = (e) => {
    const selectedItem = items.find((item) => item.key === e.key);
    if (selectedItem) {
      navigate(selectedItem.path);
    }
  };
  return (
    <div className="min-h-screen ">
      <div className="w-full flex justify-center text-[28px] font-[600] py-8 ">
        <h2>eShop</h2>
      </div>
      <Menu
        style={{
          width: 256,
        }}
        selectedKeys={[selectedKey]}
        mode={"inline"}
        theme={"light"}
        items={items}
        onClick={handleMenuClick}
      />
    </div>
  );
};
export default AdminSidebar;
