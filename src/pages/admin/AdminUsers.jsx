// features/users/components/AllUsersPage.jsx
import { useState, useEffect } from "react";
import {
  Table,
  Button,
  Input,
  Space,
  Tag,
  Modal,
  Form,
  Select,
  message,
} from "antd";
import {
  SearchOutlined,
  UserAddOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { deleteUser, getAllUsers, updateUser } from "../../lib/api";
import UserFormModal from "../../components/Admin/UserFormModal";

const { Column } = Table;
const { confirm } = Modal;

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getAllUsers();
      setUsers(response.data);
      setFilteredUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      message.error("Failed to fetch users");
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    setSearchText(value);
    filterUsers(value, selectedRole);
  };

  const handleRoleFilter = (value) => {
    setSelectedRole(value);
    filterUsers(searchText, value);
  };

  const filterUsers = (search, role) => {
    const filtered = users.filter((user) => {
      const matchesSearch =
        user.name?.toLowerCase().includes(search?.toLowerCase()) ||
        user.email?.toLowerCase().includes(search?.toLowerCase());
      const matchesRole = role === "all" || user.userType === role;
      return matchesSearch && matchesRole;
    });
    setFilteredUsers(filtered);
  };

  const showDeleteConfirm = (userId) => {
    confirm({
      title: "Are you sure you want to delete this user?",
      content: "This action cannot be undone",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      async onOk() {
        try {
          await deleteUser(userId);
          message.success("User deleted successfully");
          fetchUsers();
        } catch (error) {
          console.log(error);
          message.error("Failed to delete user");
        }
      },
    });
  };

  const handleFormSubmit = async (values) => {
    try {
      if (selectedUser) {
        await updateUser(selectedUser._id, values);
        message.success("User updated successfully");
      }
      setIsModalVisible(false);
      setSelectedUser(null);
      fetchUsers();
    } catch (error) {
      message.error(error.response?.data?.message || "Operation failed");
    }
  };

  return (
    <div className="p-6 w-full">
      <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        <div className=" w-full flex justify-center gap-2">
          <Input
            placeholder="Search users by email..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full md:w-64 p-2"
          />

          <Select
            defaultValue="all"
            onChange={handleRoleFilter}
            className="w-32 h-full "
            options={[
              { value: "all", label: "All Roles" },
              { value: "customer", label: "Customer" },
              { value: "seller", label: "Seller" },
              { value: "admin", label: "Admin" },
            ]}
          />
        </div>
      </div>

      <Table
        dataSource={filteredUsers}
        loading={loading}
        rowKey="id"
        scroll={{ x: true }}
        pagination={{ pageSize: 10 }}
      >
        <Column
          title="Name"
          sorter={(a, b) => a.firstName.localeCompare(b.name)}
          render={(_, record) => {
            return `${record.firstName} ${record.lastName}`;
          }}
        />

        <Column
          title="Email"
          dataIndex="email"
          sorter={(a, b) => a.email.localeCompare(b.email)}
        />
        <Column title="Phone" dataIndex="phone" />
        <Column
          title="Role"
          dataIndex="userType"
          render={(userType) => (
            <Tag color={userType === "seller" ? "blue" : "green"}>
              {userType?.toUpperCase()}
            </Tag>
          )}
          filters={[
            { text: "Seller", value: "seller" },
            { text: "Customer", value: "customer" },
            { text: "Admin", value: "admin" },
          ]}
          onFilter={(value, record) => record.userType === value}
        />

        <Column
          title="Actions"
          key="actions"
          render={(_, record) => (
            <Space>
              <Button
                type="link"
                icon={<EditOutlined />}
                onClick={() => {
                  console.log(record);
                  setSelectedUser(record);
                  setIsModalVisible(true);
                }}
              />

              <Button
                type="link"
                danger
                icon={<DeleteOutlined />}
                onClick={() => showDeleteConfirm(record._id)}
              />
            </Space>
          )}
        />
      </Table>

      <UserFormModal
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setSelectedUser(null);
        }}
        onSubmit={handleFormSubmit}
        initialValues={selectedUser}
      />
    </div>
  );
};

export default AdminUsers;
