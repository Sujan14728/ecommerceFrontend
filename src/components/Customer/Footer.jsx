import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import {
  Carousel,
  Card,
  Col,
  Typography,
  Button,
  Rate,
  Row,
  Input,
} from "antd";

const { Title, Paragraph } = Typography;
const { Meta } = Card;
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <Row gutter={[24, 24]}>
          <Col xs={24} md={6}>
            <Title level={4} className="text-white! mb-4">
              About Us
            </Title>
            <Paragraph className="text-gray-100">
              Premium e-commerce platform offering quality products with fast
              delivery and excellent customer service.
            </Paragraph>
          </Col>

          <Col xs={24} md={6}>
            <Title level={4} className="text-white! mb-4">
              Customer Service
            </Title>
            <div className="flex flex-col space-y-2 text-gray-100">
              <a href="/contact" className="hover:text-white">
                Contact Us
              </a>
              <a href="/shipping" className="hover:text-white">
                Shipping Policy
              </a>
              <a href="/returns" className="hover:text-white">
                Returns & Exchanges
              </a>
              <a href="/faq" className="hover:text-white">
                FAQs
              </a>
            </div>
          </Col>

          <Col xs={24} md={6}>
            <Title level={4} className="text-white! mb-4">
              Connect With Us
            </Title>
            <div className="flex space-x-4">
              <FacebookOutlined className="text-2xl hover:text-blue-500 cursor-pointer" />
              <TwitterOutlined className="text-2xl hover:text-blue-400 cursor-pointer" />
              <InstagramOutlined className="text-2xl hover:text-pink-500 cursor-pointer" />
              <YoutubeOutlined className="text-2xl hover:text-red-600 cursor-pointer" />
            </div>
          </Col>

          <Col xs={24} md={6}>
            <Title level={4} className="text-white! mb-4">
              Newsletter
            </Title>
            <div className="flex flex-col space-y-4">
              <Input placeholder="Enter your email" />
              <Button type="primary">Subscribe</Button>
            </div>
          </Col>
        </Row>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <Paragraph className="text-gray-400">
            © 2023 Your eShop. All rights reserved.
          </Paragraph>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
