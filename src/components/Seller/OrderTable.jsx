import React, { useState } from "react";
import { Table, Tag, Button, Input, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const { Option } = Select;

// Sample orders data
const initialOrders = [
  {
    key: "1",
    orderId: "ORD1234",
    customer: "John Doe",
    total: "$120.00",
    status: "Pending",
  },
  {
    key: "2",
    orderId: "ORD1235",
    customer: "Jane Smith",
    total: "$75.50",
    status: "Shipped",
  },
  {
    key: "3",
    orderId: "ORD1236",
    customer: "Michael Lee",
    total: "$210.00",
    status: "Delivered",
  },
  {
    key: "4",
    orderId: "ORD1237",
    customer: "Alice Brown",
    total: "$99.99",
    status: "Cancelled",
  },
];

const OrdersTable = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // Status colors
  const statusColors = {
    Pending: "orange",
    Shipped: "blue",
    Delivered: "green",
    Cancelled: "red",
  };

  // Handle status change
  const updateStatus = (key, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.key === key ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
  };

  // Filtered data
  const filteredOrders = orders.filter(
    (order) =>
      (order.orderId.toLowerCase().includes(searchText.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchText.toLowerCase())) &&
      (filterStatus ? order.status === filterStatus : true)
  );

  // Table columns
  const columns = [
    { title: "Order ID", dataIndex: "orderId", key: "orderId" },
    { title: "Customer", dataIndex: "customer", key: "customer" },
    { title: "Total", dataIndex: "total", key: "total" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => <Tag color={statusColors[status]}>{status}</Tag>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Select
          defaultValue={record.status}
          style={{ width: 120 }}
          onChange={(value) => updateStatus(record.key, value)}
        >
          <Option value="Pending">Pending</Option>
          <Option value="Shipped">Shipped</Option>
          <Option value="Delivered">Delivered</Option>
          <Option value="Cancelled">Cancelled</Option>
        </Select>
      ),
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-full">
      <h2 className="text-2xl font-semibold mb-4">Manage Orders</h2>

      {/* Search and Filter */}
      <div className="flex flex-wrap gap-4 mb-4">
        <Input
          placeholder="Search by Order ID or Customer"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-60"
        />
        <Select
          placeholder="Filter by Status"
          className="w-40"
          allowClear
          onChange={(value) => setFilterStatus(value)}
        >
          <Option value="Pending">Pending</Option>
          <Option value="Shipped">Shipped</Option>
          <Option value="Delivered">Delivered</Option>
          <Option value="Cancelled">Cancelled</Option>
        </Select>
      </div>

      {/* Orders Table */}
      <Table
        columns={columns}
        dataSource={filteredOrders}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default OrdersTable;
