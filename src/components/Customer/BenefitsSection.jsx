// components/home/BenefitsSection.jsx
import { Row, Col, Typography } from "antd";
import {
  RocketOutlined,
  DollarOutlined,
  CustomerServiceOutlined,
} from "@ant-design/icons";
import { IoShieldOutline } from "react-icons/io5";

const { Title, Text } = Typography;

const benefits = [
  {
    icon: <RocketOutlined />,
    title: "Fast Delivery",
    text: "Free shipping on orders over $50",
  },
  {
    icon: <IoShieldOutline />,
    title: "Secure Payments",
    text: "100% secure payment processing",
  },
  {
    icon: <DollarOutlined />,
    title: "Money Back",
    text: "30-day return policy",
  },
  {
    icon: <CustomerServiceOutlined />,
    title: "24/7 Support",
    text: "Dedicated customer support",
  },
];

export const BenefitsSection = () => (
  <div className="container mx-auto px-4 py-16">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
      {benefits.map((benefit, index) => (
        <div
          key={index}
          className="rounded-lg bg-slate-50 shadow-md hover:bg-slate-200 cursor-pointer duration-300 "
        >
          <div className="text-center p-4">
            <div className="text-4xl text-blue-600 mb-4 flex justify-center">
              {benefit.icon}
            </div>
            <Title level={4} className="mb-2">
              {benefit.title}
            </Title>
            <Text type="secondary">{benefit.text}</Text>
          </div>
        </div>
      ))}
    </div>
  </div>
);
