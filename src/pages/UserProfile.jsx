import React from "react";
import { Tabs } from "antd";
import PersonalInfo from "../components/Customer/Profile/PersonalInfo";
import PasswordManager from "../components/Customer/Profile/PasswordManager";
import Wishlist from "../components/Customer/Profile/Wishlist";
const UserProfile = () => {
  const tabsData = [
    {
      label: "Personal Information",
      key: "1",
      children: <PersonalInfo />, // Component for this tab
    },
    {
      label: "Password Manager",
      key: "2",
      children: <PasswordManager />, // Component for this tab
    },
    {
      label: "My Wishlist",
      key: "3",
      children: <Wishlist />, // Component for this tab
    },
  ];
  return (
    <div className="w-full flex justify-center py-8 bg-gray-100 min-h-screen ">
      <div className="w-[80%]">
        <Tabs
          tabPosition={"left"}
          items={tabsData.map((tab) => ({
            label: tab.label,
            key: tab.key,
            children: tab.children,
          }))}
        />
      </div>
    </div>
  );
};

export default UserProfile;
