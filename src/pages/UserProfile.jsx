import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import PersonalInfo from "../components/Customer/Profile/PersonalInfo";
import PasswordManager from "../components/Customer/Profile/PasswordManager";
import { useNavigate, useSearchParams } from "react-router-dom";
import Orders from "../components/Customer/Profile/Orders";

const UserProfile = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(params.get("tab") || "1");

  useEffect(() => {
    navigate("/profile", { replace: true });
  }, [activeTab, navigate]);

  const handleTabChange = (key) => {
    setActiveTab(key);
    navigate("/profile", { replace: true });
  };
  const tabsData = [
    {
      label: "Personal Information",
      key: "1",
      children: <PersonalInfo />,
    },
    {
      label: "Password Manager",
      key: "2",
      children: <PasswordManager />,
    },
    {
      label: "My Orders",
      key: "3",
      children: <Orders />,
    },
  ];
  return (
    <div className="w-full flex justify-center py-8 bg-gray-100 min-h-screen ">
      <div className="w-[80%]">
        <Tabs
          tabPosition={"left"}
          onChange={handleTabChange}
          activeKey={activeTab}
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
