// features/ads/components/PastAdsTable.jsx
import { Table, Tag, DatePicker } from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { getPastAds } from "../../lib/api";

const PastAdsTable = () => {
  const [pastAds, setPastAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState([]);

  useEffect(() => {
    fetchPastAds();
  }, [dateRange]);

  const fetchPastAds = async () => {
    try {
      //   const params = {
      //     startDate: dateRange[0]?.format("YYYY-MM-DD"),
      //     endDate: dateRange[1]?.format("YYYY-MM-DD"),
      //   };

      const response = await getPastAds();
      setPastAds(response.data);
    } catch (error) {
      console.error("Error fetching past ads:", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: "Product",
      dataIndex: ["productId", "name"],
    },
    {
      title: "Date Range",
      render: (_, record) => (
        <span>
          {dayjs(record.startDate).format("MMM D, YYYY")} -
          {dayjs(record.endDate).format("MMM D, YYYY")}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: () => <Tag color="volcano">Ended</Tag>,
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Past Advertisements</h2>
        <DatePicker.RangePicker
          onChange={(dates) => setDateRange(dates)}
          disabledDate={(current) => current > dayjs()}
        />
      </div>

      <Table
        columns={columns}
        dataSource={pastAds}
        loading={loading}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
        scroll={{ x: true }}
      />
    </div>
  );
};

export default PastAdsTable;
