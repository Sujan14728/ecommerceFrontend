import React, { useEffect, useState } from "react";
import { Table, Button, Input, Modal, Form, message, Space } from "antd";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../lib/api";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
const AdminCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await getCategories();
      setCategories(response.data);
    } catch (error) {
      console.log(error);
      message.error("Failed to load categories.");
    }
    setLoading(false);
  };

  const handleAddOrUpdate = async (values) => {
    try {
      if (editingCategory) {
        await updateCategory(editingCategory._id, values);
        message.success("Category updated successfully!");
      } else {
        await createCategory(values);
        message.success("Category added successfully!");
      }
      setIsModalOpen(false);
      setEditingCategory(null);
      form.resetFields();
      fetchCategories();
    } catch (error) {
      console.log(error);

      message.error("Operation failed.");
    }
  };

  const handleDelete = async (categoryId) => {
    Modal.confirm({
      title: "Delete Product",
      content: "Are you sure you want to delete this product?",
      okText: "Delete",
      okType: "danger",
      async onOk() {
        try {
          await deleteCategory(categoryId);
          message.success("Category deleted successfully!");
          fetchCategories();
        } catch (error) {
          console.log(error);
          message.error("Failed to delete category.");
        }
      },
    });
  };

  const openEditModal = (category) => {
    setEditingCategory(category);
    form.setFieldsValue(category);
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setEditingCategory(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const columns = [
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, category) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => openEditModal(category)}
          />
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(category._id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="w-full flex flex-col items-center relative ">
      <div className="relative w-[60%] flex flex-col items-center gap-4 ">
        <h2 className="text-[24px] font-semibold ">Category Management</h2>
        <Button
          className=""
          type="primary"
          onClick={openAddModal}
          style={{ marginBottom: "16px" }}
        >
          Add Category
        </Button>
      </div>
      <div className="w-[60%]">
        <Table
          columns={columns}
          dataSource={categories}
          rowKey="id"
          loading={loading}
        />
      </div>

      <Modal
        title={editingCategory ? "Edit Category" : "Add Category"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleAddOrUpdate}>
          <Form.Item
            name="name"
            label="Category Name"
            rules={[{ required: true, message: "Category name is required" }]}
          >
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            {editingCategory ? "Update" : "Add"}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminCategory;
