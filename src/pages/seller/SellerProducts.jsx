import React, { useEffect, useState } from "react";
import { Button, Modal, Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CreateProduct from "../../components/Seller/Product/CreateProduct";
import { getProductByUserId } from "../../lib/api";
import { useSelector } from "react-redux";

const SellerProducts = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [flag, setFlag] = useState(0);
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const showModal = (product = null) => {
    setEditingProduct(product);
    setIsModalVisible(true);
  };

  // Handle modal cancel (close the modal)
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleEdit = (product) => {
    showModal(product);
  };

  const handleDelete = (productId) => {
    console.log("Deleting product with ID:", productId);
    setProducts(products.filter((product) => product.id !== productId));
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getProductByUserId(user._id);
      console.log(response);
      setProducts(response.data);
    };
    fetchProducts();
  }, [flag]);

  const columns = [
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      render: (text, record) => "$" + record.price || "N/A",
      key: "price",
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Category",
      key: "category",
      render: (text, record) => record.categoryId?.name || "N/A",
    },
    {
      title: "Image",
      key: "imageUrl",
      render: (text, record) => (
        <img
          src={record.imgUrl}
          alt={record.name}
          style={{ width: 50, height: 50, objectFit: "cover", borderRadius: 4 }}
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            style={{ marginRight: 8 }}
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
            danger
          />
        </div>
      ),
    },
  ];

  return (
    <div className="w-full flex justify-center py-4">
      <div className="w-[80%]">
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold mb-4">Seller Products</h2>
          <Button type="primary" className="mb-4" onClick={showModal}>
            Add New Product
          </Button>
          <Modal
            title="Create New Product"
            open={isModalVisible}
            onCancel={handleCancel}
            footer={null}
          >
            <CreateProduct
              onCancel={handleCancel}
              flag={flag}
              setFlag={setFlag}
              productData={editingProduct}
            />
          </Modal>
        </div>
        <Table
          columns={columns}
          dataSource={products}
          rowKey="id"
          pagination={false}
        />
      </div>
    </div>
  );
};

export default SellerProducts;
