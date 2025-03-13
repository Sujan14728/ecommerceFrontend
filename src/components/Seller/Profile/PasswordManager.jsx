import React, { useState } from "react";
import { Form, Input, Button, message, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { changeUserPassword } from "../../../lib/api";

const PasswordManager = ({ isModalVisible, handleCancel }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const { currentPassword, newPassword } = values;
    setLoading(true);

    try {
      const response = await changeUserPassword(
        user._id,
        currentPassword,
        newPassword
      );

      if (response.status === "success") {
        message.success("Password changed successfully!");
        form.resetFields();
        handleCancel(); // Close the modal after success
        navigate("/seller/profile");
      }
    } catch (error) {
      message.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Modal containing the form */}
      <Modal
        title="Change Password"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null} // No footer buttons, as the form has its own submit button
        destroyOnClose // This ensures the form is reset when the modal is closed
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Current Password"
            name="currentPassword"
            rules={[
              {
                required: true,
                message: "Please input your current password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[
              { required: true, message: "Please input your new password!" },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Confirm New Password"
            name="confirmPassword"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "Please confirm your new password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The two passwords do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Change Password
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PasswordManager;
