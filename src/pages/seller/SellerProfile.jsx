import React, { useState } from "react";
import PersonalInfo from "../../components/Seller/Profile/PersonalInfo";
import PasswordManager from "../../components/Seller/Profile/PasswordManager";
import { Button } from "antd";

const SellerProfile = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Function to show the modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Function to hide the modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div className="w-full flex justify-center ">
      <div className="w-full md:w-[80%] relative flex min-h-[40rem] items-center ">
        <div className="w-full md:w-fit flex justify-center my-4 md:absolute right-4 top-2">
          <Button type="primary" onClick={showModal}>
            Change Password
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

export default SellerProfile;
