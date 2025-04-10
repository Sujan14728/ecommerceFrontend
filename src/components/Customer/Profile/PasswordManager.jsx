import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { changeUserPassword } from "../../../lib/api";

const PasswordManager = () => {
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
        navigate("/profile");
      }
    } catch (error) {
      message.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[20rem] flex justify-center items-center">
      <div style={{ width: 400 }}>
        <h2 className="text-[20px] font-[500] mb-4 ">Change Password</h2>
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
      </div>
    </div>
  );
};

export default PasswordManager;
