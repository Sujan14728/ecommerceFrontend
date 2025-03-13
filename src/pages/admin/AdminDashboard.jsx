// features/dashboard/DashboardPage.jsx
import { Row, Col, Card, Statistic, Progress, Table, Button } from "antd";
import {
  UserAddOutlined,
  LineChartOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  AlertOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Line } from "@ant-design/charts";

const AdminDashboard = () => {
  // Sample data - replace with real API data
  const metrics = {
    totalUsers: 2458,
    activeAds: 42,
    pendingOrders: 15,
    systemHealth: 99.9,
    responseTime: 19,
  };

  const recentActivities = [
    {
      id: 1,
      user: "John Doe",
      action: "Updated product pricing",
      time: "2m ago",
    },
    {
      id: 2,
      user: "Jane Smith",
      action: "Approved transaction #1234",
      time: "15m ago",
    },
    {
      id: 3,
      user: "System",
      action: "Nightly backup completed",
      time: "1h ago",
    },
  ];

  const salesData = [
    { month: "Jan", sales: 65 },
    { month: "Feb", sales: 85 },
    { month: "Mar", sales: 95 },
    { month: "Apr", sales: 75 },
  ];

  const config = {
    data: salesData,
    xField: "month",
    yField: "sales",
    label: {},
    point: { size: 5 },
    tooltip: { showMarkers: false },
  };

  return (
    <div className="p-6 space-y-6 w-full ">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        <span className="text-gray-500">
          Today: {new Date().toLocaleDateString()}
        </span>
      </div>

      {/* Key Metrics Cards */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <Statistic
              title="Total Users"
              value={metrics.totalUsers}
              prefix={<UserAddOutlined />}
              valueStyle={{ color: "#3f8600" }}
            />
            <Progress percent={30} size="small" showInfo={false} />
            <span className="text-sm text-gray-500">+15% from last month</span>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <Statistic
              title="Active Ads"
              value={metrics.activeAds}
              prefix={<LineChartOutlined />}
              valueStyle={{ color: "#1890ff" }}
            />
            <div className="mt-2">
              <Button type="link" size="small">
                View All
              </Button>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <Statistic
              title="Pending Orders"
              value={metrics.pendingOrders}
              prefix={<ShoppingCartOutlined />}
              valueStyle={{ color: "#faad14" }}
            />
            <Button type="primary" size="small" className="mt-2">
              Review Now
            </Button>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <Statistic
              title="Response Time"
              value={metrics.responseTime}
              suffix="ms"
              prefix={<DollarOutlined />}
              valueStyle={{ color: "#13c2c2" }}
            />
            <span
              className={`text-sm ${
                metrics.responseTime > 20 ? "text-red-500" : "text-green-500"
              }`}
            >
              {metrics.responseTime <= 20 ? "Within SLA" : "Exceeding SLA"}
            </span>
          </Card>
        </Col>
      </Row>

      {/* Charts Section */}
      <Row gutter={[16, 16]}>
        <Col xs={24} xl={16}>
          <Card
            title="Sales Trend"
            extra={<Button type="link">View Report</Button>}
          >
            <Line {...config} />
          </Card>
        </Col>

        <Col xs={24} xl={8}>
          <Card title="System Health">
            <div className="space-y-4">
              <div className="flex items-center">
                <Progress
                  type="circle"
                  percent={metrics.systemHealth}
                  width={80}
                  format={(percent) => `${percent}%`}
                />
                <div className="ml-4">
                  <h3 className="font-medium">Uptime Status</h3>
                  <p className="text-gray-500">Last 30 days performance</p>
                </div>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <AlertOutlined className="text-blue-500 mr-2" />
                <span>All systems operational</span>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Recent Activities & Quick Actions */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card title="Recent Activities">
            <Table
              dataSource={recentActivities}
              pagination={false}
              size="small"
              columns={[
                { title: "User", dataIndex: "user" },
                { title: "Action", dataIndex: "action" },
                { title: "Time", dataIndex: "time" },
              ]}
            />
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card title="Quick Actions">
            <div className="grid grid-cols-2 gap-4">
              <Button block icon={<UserAddOutlined />}>
                Add New User
              </Button>
              <Button block icon={<LineChartOutlined />}>
                Post New Ad
              </Button>
              <Button block icon={<ShoppingCartOutlined />}>
                Create Order
              </Button>
              <Button block icon={<SettingOutlined />}>
                System Settings
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;
