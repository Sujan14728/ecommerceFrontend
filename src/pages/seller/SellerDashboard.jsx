import React from "react";
import { Card, Statistic, Table, Button } from "antd";
import {
  DollarCircleOutlined,
  ShoppingCartOutlined,
  BoxPlotOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const recentOrders = [
  {
    key: "1",
    orderId: "ORD1234",
    customer: "John Doe",
    total: "$120.00",
    status: "Delivered",
  },
  {
    key: "2",
    orderId: "ORD1235",
    customer: "Jane Smith",
    total: "$75.50",
    status: "Processing",
  },
  {
    key: "3",
    orderId: "ORD1236",
    customer: "Michael Lee",
    total: "$210.00",
    status: "Shipped",
  },
];

const SellerDashboard = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen w-full">
      <h2 className="text-2xl font-semibold mb-4">Seller Dashboard</h2>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <Statistic
            title="Total Sales"
            value={15000}
            prefix="$"
            valueStyle={{ color: "#3f8600" }}
            suffix="USD"
            icon={<DollarCircleOutlined />}
          />
        </Card>
        <Card>
          <Statistic
            title="Total Orders"
            value={320}
            valueStyle={{ color: "#1890ff" }}
            icon={<ShoppingCartOutlined />}
          />
        </Card>
        <Card>
          <Statistic
            title="Total Products"
            value={45}
            valueStyle={{ color: "#722ed1" }}
            icon={<BoxPlotOutlined />}
          />
        </Card>
      </div>

      {/* Recent Orders Table */}
      <Card title="Recent Orders" className="mb-6">
        <Table
          dataSource={recentOrders}
          columns={[
            { title: "Order ID", dataIndex: "orderId", key: "orderId" },
            { title: "Customer", dataIndex: "customer", key: "customer" },
            { title: "Total", dataIndex: "total", key: "total" },
            { title: "Status", dataIndex: "status", key: "status" },
          ]}
          pagination={false}
        />
      </Card>

      {/* Quick Actions */}
      <div className="flex gap-4">
        <Button type="primary" icon={<PlusOutlined />} size="large">
          Add New Product
        </Button>
        <Button type="default" size="large">
          Manage Inventory
        </Button>
      </div>
    </div>
  );
};

export default SellerDashboard;
