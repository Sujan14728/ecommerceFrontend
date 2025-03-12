import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Button, Select, message } from "antd";
import { createProduct, getCategories, updateProduct } from "../../../lib/api";
import { useSelector } from "react-redux";

const { Option } = Select;

const CreateProduct = ({ onCancel, flag, setFlag, productData }) => {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (productData) {
      form.setFieldsValue({
        name: productData.name,
        price: productData.price,
        stock: productData.stock,
        brand: productData.brand,
        description: productData.description,
        imgUrl: productData.imgUrl,
        categoryId: productData.categoryId?._id,
      });
    } else {
      form.resetFields();
    }
  }, [productData]);

  const onSubmit = async (values) => {
    try {
      const formData = { ...values, userId: user._id };
      console.log(productData);
      if (productData && productData._id) {
        await updateProduct(productData._id, formData);
      } else {
        // Create new product
        await createProduct(formData);
      }

      message.success("Product added successfully!");
      setFlag(flag + 1);
      form.resetFields();
      onCancel();
    } catch (error) {
      console.error("Error adding product:", error);
      message.error("Failed to add product. Please try again.");
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getCategories();
      setCategories(response.data);
    };
    fetchCategories();
  }, []);
  return (
    <Form form={form} layout="vertical" onFinish={onSubmit}>
      <Form.Item
        name="name"
        label="Product Name"
        rules={[{ required: true, message: "Please input the product name!" }]}
      >
        <Input placeholder="Enter product name" />
      </Form.Item>

      <Form.Item
        name="categoryId"
        label="Category"
        rules={[{ required: true, message: "Please select a category!" }]}
      >
        <Select placeholder="Select category">
          {categories.map((category) => (
            <Option value={category._id}>{category.name}</Option>
          ))}
          {/* Add dynamic categories based on your database */}
        </Select>
      </Form.Item>

      <Form.Item
        name="brand"
        label="Brand"
        rules={[{ required: true, message: "Please input the brand!" }]}
      >
        <Input placeholder="Enter brand" />
      </Form.Item>

      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true, message: "Please input the description!" }]}
      >
        <Input.TextArea placeholder="Enter product description" />
      </Form.Item>

      <Form.Item
        name="stock"
        label="Stock Quantity"
        rules={[
          { required: true, message: "Please input the stock quantity!" },
        ]}
      >
        <InputNumber min={1} placeholder="Enter stock quantity" />
      </Form.Item>

      <Form.Item
        name="price"
        label="Price"
        rules={[{ required: true, message: "Please input the product price!" }]}
      >
        <InputNumber min={0} step={1} placeholder="Enter price" />
      </Form.Item>

      <Form.Item
        name="imgUrl"
        label="Image URL"
        rules={[{ required: true, message: "Please input the image URL!" }]}
      >
        <Input placeholder="Enter image URL" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button style={{ marginLeft: "10px" }} onClick={onCancel}>
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateProduct;
