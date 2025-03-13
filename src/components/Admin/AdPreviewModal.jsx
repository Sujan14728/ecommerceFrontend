import { Modal, Descriptions, Image, Tag, Typography } from "antd";
import moment from "moment";

const { Title, Text, Paragraph } = Typography;

const AdPreviewModal = ({ visible, onCancel, ad }) => {
  // Helper function to format dates
  const formatDate = (date) => moment(date).format("MMM D, YYYY HH:mm");

  return (
    <Modal
      title="Advert Preview"
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={800}
      centered
    >
      {ad && (
        <div className="space-y-4">
          {/* Main Content */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Image Section */}
            <div className="w-full md:w-1/3">
              {ad.image ? (
                <Image
                  src={ad.image}
                  alt={ad.title}
                  className="rounded-lg"
                  preview={false}
                />
              ) : (
                <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Text type="secondary">No image available</Text>
                </div>
              )}
            </div>

            {/* Text Content */}
            <div className="flex-1">
              <Title level={4} className="!mb-2">
                {ad.title}
              </Title>

              <div className="mb-4">
                {ad.productId && (
                  <div className="mb-2">
                    <Text strong>Product: </Text>
                    <Text>{ad.productId.name}</Text>
                  </div>
                )}

                <Text strong>Ad Price: </Text>
                <Text className="text-lg text-green-600">
                  ${ad.price.toFixed(2)}
                </Text>
              </div>

              <Paragraph className="whitespace-pre-wrap">
                {ad.description}
              </Paragraph>

              {ad.url && (
                <div className="mt-2">
                  <Text strong>Link: </Text>
                  <a
                    href={ad.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600"
                  >
                    {ad.url}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Metadata */}
          <Descriptions bordered column={1} size="small">
            <Descriptions.Item label="Status">
              <Tag
                color={
                  ad.status === "active"
                    ? "green"
                    : ad.status === "inactive"
                    ? "red"
                    : "orange"
                }
              >
                {ad.status.toUpperCase()}
              </Tag>
            </Descriptions.Item>

            <Descriptions.Item label="Start Date">
              {formatDate(ad.startDate)}
            </Descriptions.Item>

            <Descriptions.Item label="End Date">
              {ad.endDate ? formatDate(ad.endDate) : "No end date"}
            </Descriptions.Item>

            {ad.productId && (
              <Descriptions.Item label="Current Product Price">
                <Text delete={ad.price !== ad.productId.price}>
                  ${ad.productId.price.toFixed(2)}
                </Text>
              </Descriptions.Item>
            )}
          </Descriptions>
        </div>
      )}
    </Modal>
  );
};

export default AdPreviewModal;
