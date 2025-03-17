import React, { useState } from "react";
import PersonalInfo from "../../components/Seller/Profile/PersonalInfo";
import PasswordManager from "../../components/Seller/Profile/PasswordManager";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../../lib/api";
import { logout } from "../../lib/store/slices/authSlice";

const AdminProfile = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Function to show the modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Function to hide the modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleLogout = async () => {
    await userLogout();
    dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/auth");
  };
  return (
    <div className="w-full flex justify-center ">
      <div className="w-full md:w-[80%] relative flex min-h-[40rem] items-center ">
        <div className="w-full md:w-fit flex justify-center gap-2 my-4 md:absolute right-4 top-2">
          <Button type="primary" onClick={showModal}>
            Change Password
          </Button>
          <Button
            onClick={handleLogout}
            type="primary"
            className="bg-red-500 hover:bg-red-500/60!"
          >
            Logout
          </Button>
        </div>
        <PersonalInfo />
      </div>
      <PasswordManager
        isModalVisible={isModalVisible}
        showModal={showModal}
        handleCancel={handleCancel}
      />
    </div>
  );
};

export default AdminProfile;
