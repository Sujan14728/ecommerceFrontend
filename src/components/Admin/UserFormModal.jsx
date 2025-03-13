// features/users/components/UserFormModal.jsx
import { Modal, Form, Input, Select } from "antd";
import { useEffect } from "react";

const UserFormModal = ({ visible, onCancel, onSubmit, initialValues }) => {
  const [form] = Form.useForm();
  useEffect(() => {
    if (visible) {
      form.resetFields();
      if (initialValues) {
        form.setFieldsValue(initialValues);
      }
    }
  }, [visible, initialValues, form]);
  return (
    <Modal
      title={initialValues ? "Edit User" : "Create New User"}
      open={visible}
      onCancel={onCancel}
      onOk={() => form.submit()}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
        onFinish={onSubmit}
      >
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: "Please input user first name!" }]}
        >
          <Input placeholder="Enter first name" />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: "Please input user last name!" }]}
        >
          <Input placeholder="Enter last name" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input user email!" },
            { type: "email", message: "Invalid email format" },
          ]}
        >
          <Input placeholder="Enter email address" />
        </Form.Item>
        <Form.Item
          label="Phone"
          name="phone"
          rules={[
            { required: true, message: "Please input user phone number!" },
          ]}
        >
          <Input placeholder="Enter phone number" />
        </Form.Item>

        <Form.Item
          label="Role"
          name="userType"
          rules={[{ required: true, message: "Please select a role!" }]}
        >
          <Select
            options={[
              { value: "customer", label: "Customer" },
              { value: "seller", label: "Seller" },
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserFormModal;
