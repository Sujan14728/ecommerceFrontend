import React from "react";
import { Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { MdDashboard, MdProductionQuantityLimits } from "react-icons/md";
import { LuPackage } from "react-icons/lu";
import { FaRegStar } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

const items = [
  {
    key: "2",
    icon: <MdProductionQuantityLimits />,
    label: "Products",
    path: "/seller/products",
  },
  {
    key: "3",
    icon: <LuPackage />,
    label: "Advertisement",
    path: "/seller/advert",
  },
  {
    key: "4",
    icon: <FaRegStar />,
    label: "Reviews",
    path: "/seller/reviews",
  },
  {
    key: "5",
    icon: <CgProfile />,
    label: "Profile",
    path: "/seller/profile",
  },
];
const Sidebar = () => {
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
    <div>
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
export default Sidebar;
