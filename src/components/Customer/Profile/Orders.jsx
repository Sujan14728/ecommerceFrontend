import React, { useEffect, useState } from "react";
import { Table, Button, Modal, notification } from "antd";
import { getOrderByUserId, deleteOrder } from "../../../lib/api"; // Assuming the API functions are imported correctly
import { useNavigate } from "react-router-dom"; // For navigation
import { useSelector } from "react-redux";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  // Fetch orders when component mounts
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const ordersData = await getOrderByUserId(user?._id);
        setOrders(ordersData);
      } catch (error) {
        notification.error({
          message: "Error",
          description: "Failed to fetch orders. Please try again later.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);
  const handleDeleteOrder = async (orderId) => {
    Modal.confirm({
      title: "Delete Order?",
      content: "Are you sure you want to cancel the order?",
      okText: "Yes",
      okType: "danger",
      async onOk() {
        try {
          await deleteOrder(orderId);
          setOrders(orders.filter((order) => order._id !== orderId)); // Update state to remove deleted order
          notification.success({
            message: "Success",
            description: "Order has been successfully deleted.",
          });
        } catch (error) {
          notification.error({
            message: "Error",
            description: "Failed to delete order. Please try again later.",
          });
        }
      },
    });
  };

  // Columns for the Ant Design table
  const columns = [
    {
      title: "Order ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (text) => `$${text.toFixed(2)}`,
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div className="flex space-x-2">
          {/* <Button
            type="primary"
            onClick={() => handleViewOrder(record._id)}
            className="text-sm"
          >
            View
          </Button> */}
          <Button
            type="danger"
            onClick={() => handleDeleteOrder(record._id)}
            className="text-sm"
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-6">My Orders</h1>
      <Table
        columns={columns}
        dataSource={orders}
        loading={loading}
        rowKey="_id"
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default Orders;
