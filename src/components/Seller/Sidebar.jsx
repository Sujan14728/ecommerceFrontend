import React from "react";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { MdDashboard, MdProductionQuantityLimits } from "react-icons/md";

const items = [
  {
    key: "1",
    icon: <MdDashboard />,
    label: "Dashboard",
    path: "/seller/dashboard",
  },
  {
    key: "2",
    icon: <MdProductionQuantityLimits />,
    label: "Products",
    path: "/seller/products",
  },
];
const Sidebar = () => {
  const navigate = useNavigate();

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
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode={"inline"}
        theme={"light"}
        items={items}
        onClick={handleMenuClick}
      />
    </div>
  );
};
export default Sidebar;
