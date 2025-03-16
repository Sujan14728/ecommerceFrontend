import { Form, Input, Button, Typography } from "antd";

const { Title, Paragraph } = Typography;

export const NewsletterSubscription = () => (
  <div className="bg-gray-600 text-white! py-16">
    <div className="container mx-auto px-4 text-center">
      <Title level={3} className=" mb-4 text-white!">
        Subscribe to Our Newsletter
      </Title>
      <Paragraph className="text-lg mb-6 text-white!">
        Get updates about new products and special offers
      </Paragraph>
      <Form layout="inline" className="justify-center">
        <Form.Item className="mb-4 md:mb-0">
          <Input placeholder="Enter your email" size="large" className="w-64" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" size="large">
            Subscribe
          </Button>
        </Form.Item>
      </Form>
    </div>
  </div>
);
