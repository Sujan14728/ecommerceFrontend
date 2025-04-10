import React, { useState, useEffect } from "react";
import { Table, Rate, Input, Button, Modal, Tag, message } from "antd";
import { SearchOutlined, MessageOutlined } from "@ant-design/icons";
import { deleteReview, getAllReviews } from "../../lib/api";
import { useSelector } from "react-redux";

const SellerReviews = () => {
  const user = useSelector((state) => state.auth.user);
  const sellerId = user?._id;
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [flag, setFlag] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await getAllReviews();
        console.log(response.data);
        const sellerReviews = response.data.filter(
          (review) => review.productId?.userId === sellerId
        );
        setReviews(sellerReviews);
        setFilteredReviews(sellerReviews);
      } catch (err) {
        console.log(err);
        message.error("Failed to fetch reviews");
      } finally {
        setLoading(false);
      }
    };

    if (sellerId) {
      fetchReviews();
    } else {
      setLoading(false);
    }
  }, [flag, sellerId]); // Include sellerId in dependencies

  useEffect(() => {
    setFilteredReviews(
      reviews.filter(
        (review) =>
          `${review.userId?.firstName} ${review.userId?.lastName}`
            .toLowerCase()
            .includes(searchText?.toLowerCase()) ||
          review.productId?.name
            .toLowerCase()
            .includes(searchText?.toLowerCase())
      )
    );
  }, [searchText, reviews]);

  const handleDelete = async (reviewId) => {
    Modal.confirm({
      title: "Are you sure you want to delete this review?",
      content: "Once deleted, this action cannot be undone.",
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          await deleteReview(reviewId);
          setReviews(reviews.filter((review) => review._id !== reviewId)); // Use _id instead of key
          setFlag(flag + 1);
        } catch (error) {
          console.error("Error deleting review:", error);
        }
      },
    });
  };

  const columns = [
    {
      title: "Customer",
      key: "customer",
      render: (record) =>
        `${record.userId?.firstName} ${record?.userId?.lastName}`,
    },
    {
      title: "Product",
      render: (record) => record?.productId?.name,
      key: "product",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating) => <Rate disabled defaultValue={rating} />,
    },
    { title: "Comment", dataIndex: "comment", key: "comment" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button
          icon={<MessageOutlined />}
          onClick={() => {
            handleDelete(record._id);
          }}
        >
          Delete
        </Button>
      ),
    },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-full">
      <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>

      <div className="flex gap-4 mb-4">
        <Input
          placeholder="Search by Customer or Product"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-72"
        />
      </div>

      <Table
        columns={columns}
        dataSource={filteredReviews}
        pagination={{ pageSize: 5 }}
        rowKey="_id" // Ensure rowKey is set to _id
      />
    </div>
  );
};

export default SellerReviews;
