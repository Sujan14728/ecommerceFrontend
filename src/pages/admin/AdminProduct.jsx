import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Input,
  Space,
  Modal,
  Form,
  message,
  Select,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
  getCategories,
} from "../../lib/api";

const AdminProduct = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [form] = Form.useForm();
  const [flag, setFlag] = useState(0);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Category",
      dataIndex: ["categoryId", "name"],
      key: "category",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `$${price}`,
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      sorter: (a, b) => a.stock - b.stock,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => showEditModal(record)}
          />
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record._id)}
          />
        </Space>
      ),
    },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await getProducts();
        setProducts(response.data);
      } catch (error) {
        console.log(error);
        message.error("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data);
      } catch (error) {
        console.log(error);
        message.error("Failed to fetch categories");
      }
    };
    fetchProducts();
    fetchCategories();
  }, [flag]);

  const showAddModal = () => {
    form.resetFields();
    setIsModalVisible(true);
    setSelectedProduct(null);
  };

  const showEditModal = (product) => {
    form.setFieldsValue({
      ...product,
      categoryId: product.categoryId ? product.categoryId._id : undefined, // Set categoryId explicitly
    });
    setIsModalVisible(true);
    setSelectedProduct(product);
  };

  const handleDelete = async (productId) => {
    Modal.confirm({
      title: "Delete Product",
      content: "Are you sure you want to delete this product?",
      okText: "Delete",
      okType: "danger",
      async onOk() {
        try {
          await deleteProduct(productId);
          message.success("Product deleted successfully");
          setFlag(flag + 1);
        } catch (error) {
          console.log(error);
          message.error("Failed to delete product");
        }
      },
    });
  };

  const handleSubmit = async (values) => {
    try {
      if (selectedProduct) {
        await updateProduct(selectedProduct._id, values);
        message.success("Product updated successfully");
      } else {
        await createProduct(values);
        message.success("Product added successfully");
      }
      setIsModalVisible(false);
      setFlag(flag + 1);
    } catch (error) {
      message.error(error.response?.data?.message || "Operation failed");
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchText.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="p-6 w-full">
      <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
        <Input
          placeholder="Search products..."
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full md:w-64"
        />
        <Button type="primary" icon={<PlusOutlined />} onClick={showAddModal}>
          Add Product
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={filteredProducts}
        loading={loading}
        rowKey="_id"
        scroll={{ x: true }}
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={selectedProduct ? "Edit Product" : "Add New Product"}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="name"
            label="Product Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item name="brand" label="Brand" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, type: "number" }]}
          >
            <Input type="number" step="1" />
          </Form.Item>

          <Form.Item
            name="stock"
            label="Stock Quantity"
            rules={[{ required: true, type: "number" }]}
          >
            <Input type="number" />
          </Form.Item>

          {/* Category Select */}
          <Form.Item
            name="categoryId"
            label="Category"
            rules={[{ required: true, message: "Please select a category!" }]}
          >
            <Select placeholder="Select category">
              {categories.map((category) => (
                <Select.Option key={category._id} value={category._id}>
                  {category.name}{" "}
                  {/* Use category.name instead of categoryId.name */}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          {/* Image URL */}
          <Form.Item
            name="imgUrl"
            label="Product Image URL"
            rules={[{ required: true, type: "url" }]}
          >
            <Input placeholder="Enter image URL" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminProduct;
