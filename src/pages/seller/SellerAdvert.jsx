import { useState, useEffect } from "react";
import { Table, Button, Input, Space, Tag, Modal, Select, message } from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import {
  createAd,
  deleteAd,
  getAdsByUser,
  getProductByUserId,
  updateAd,
} from "../../lib/api";
import AdvertFormModal from "../../components/Admin/AdvertFormModal";
import { formatDate } from "../../utils/formatDate";
import AdPreviewModal from "../../components/Admin/AdPreviewModal";
import PastAdsTable from "../../components/Admin/PastAdsTable";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
const { Column } = Table;

const { confirm } = Modal;

const SellerAdvert = () => {
  const [ads, setAds] = useState([]);
  const [filteredAds, setFilteredAds] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAd, setSelectedAd] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    try {
      const response = await getAdsByUser(user._id);
      const presentAds = response.data.filter((ad) =>
        dayjs(ad.endDate).isAfter(dayjs(), "day")
      );
      setAds(presentAds);
      setFilteredAds(presentAds);
      setLoading(false);
    } catch (error) {
      console.log(error);
      message.error("Failed to fetch ads");
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    setSearchText(value);
    filterAds(value, selectedStatus);
  };

  const handleStatusFilter = (value) => {
    setSelectedStatus(value);
    filterAds(searchText, value);
  };

  const filterAds = (search, status) => {
    const filtered = ads.filter((ad) => {
      const matchesSearch =
        ad.title.toLowerCase().includes(search.toLowerCase()) ||
        ad.content.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = status === "all" || ad.status === status;
      return matchesSearch && matchesStatus;
    });
    setFilteredAds(filtered);
  };

  const showDeleteConfirm = (adId) => {
    confirm({
      title: "Are you sure you want to delete this ad?",
      content: "This action cannot be undone",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      async onOk() {
        try {
          await deleteAd(adId);
          message.success("Ad deleted successfully");
          fetchAds();
        } catch (error) {
          console.log(error);
          message.error("Failed to delete ad");
        }
      },
    });
  };

  const handleFormSubmit = async (values) => {
    try {
      const formattedValues = {
        title: values.title,
        productId: values.productId,
        price: values.price,
        description: values.description,
        status: values.status,
        image: values.image,
        url: values.url,
        startDate: values.dates[0].toISOString() || null,
        endDate: values.dates[1].toISOString() || null,
      };

      if (selectedAd) {
        await updateAd(selectedAd._id, formattedValues);
        message.success("Ad updated successfully");
      } else {
        await createAd(user._id, formattedValues);
        message.success("Ad created successfully");
      }
      delete formattedValues.dates;
      delete formattedValues.status;
      setIsModalVisible(false);
      setSelectedAd(null);
      fetchAds();
    } catch (error) {
      message.error(error.response?.data?.message || "Operation failed");
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getProductByUserId(user._id);
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

  return (
    <div className="w-full">
      <div className="p-6 w-full ">
        <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
          <div className="flex gap-2">
            <Input
              placeholder="Search ads..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full md:w-64"
            />

            <Select
              defaultValue="all"
              onChange={handleStatusFilter}
              className="w-32"
              options={[
                { value: "all", label: "All Status" },
                { value: "active", label: "Active" },
                { value: "inactive", label: "Inactive" },
                { value: "scheduled", label: "Scheduled" },
              ]}
            />
          </div>

          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalVisible(true)}
          >
            Create New Ad
          </Button>
        </div>

        <Table
          dataSource={filteredAds}
          loading={loading}
          rowKey="id"
          scroll={{ x: true }}
          pagination={{ pageSize: 10 }}
        >
          <Column
            title="Title"
            dataIndex="title"
            sorter={(a, b) => a.title.localeCompare(b.title)}
          />

          <Column
            title="Status"
            dataIndex="status"
            render={(status) => (
              <Tag color={status === "active" ? "green" : "red"}>
                {status?.toUpperCase()}
              </Tag>
            )}
          />

          <Column
            title="Dates"
            render={(_, record) => (
              <span>
                {formatDate(record.startDate)} - {formatDate(record.endDate)}
              </span>
            )}
          />

          <Column
            title="Actions"
            key="actions"
            render={(_, record) => (
              <Space>
                <Button
                  icon={<EyeOutlined />}
                  onClick={() => {
                    setSelectedAd(record);
                    setPreviewVisible(true);
                  }}
                />

                <Button
                  type="link"
                  icon={<EditOutlined />}
                  onClick={() => {
                    setSelectedAd(record);
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

        <AdvertFormModal
          visible={isModalVisible}
          onCancel={() => {
            setIsModalVisible(false);
            setSelectedAd(null);
          }}
          onSubmit={handleFormSubmit}
          initialValues={selectedAd}
          products={products}
        />

        <AdPreviewModal
          visible={previewVisible}
          onCancel={() => setPreviewVisible(false)}
          ad={selectedAd}
        />
      </div>
      {/* <PastAdsTable /> */}
    </div>
  );
};

export default SellerAdvert;
