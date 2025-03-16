import { Modal, Form, Input, Select, DatePicker } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const AdvertFormModal = ({
  visible,
  onCancel,
  onSubmit,
  initialValues,
  products,
}) => {
  const [form] = Form.useForm();
  const [currentPrice, setCurrentPrice] = useState(null);

  console.log(initialValues);

  // Set initial values when modal opens
  useEffect(() => {
    if (initialValues?.productId) {
      const selectedProduct = products.find(
        (p) => p._id === initialValues.productId
      );
      setCurrentPrice(selectedProduct?.price);
    }
  }, [initialValues, products]);

  // Handle product selection change
  const handleProductChange = (productId) => {
    const selectedProduct = products.find((p) => p._id === productId);
    setCurrentPrice(selectedProduct?.price);
    form.setFieldsValue({ price: selectedProduct?.price }); // Auto-fill current price
  };

  // Handle form submission
  const handleSubmit = (values) => {
    const [startDate, endDate] = values.dates;
    onSubmit({
      ...values,
      startDate: startDate ? startDate.toISOString() : null,
      endDate: endDate ? endDate.toISOString() : null,
      productId: values.productId,
      price: Number(values.price),
    });
  };

  return (
    <Modal
      title={initialValues ? "Edit Ad" : "Create New Ad"}
      open={visible}
      onCancel={onCancel}
      onOk={() => form.submit()}
      width={800}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          ...initialValues,
          dates:
            initialValues?.startDate && initialValues?.endDate
              ? [dayjs(initialValues.startDate), dayjs(initialValues.endDate)]
              : null,

          productId: initialValues?.productId._id,
        }}
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Product"
          name="productId"
          rules={[{ required: true, message: "Please select a product!" }]}
        >
          <Select
            showSearch
            optionFilterProp="children"
            placeholder="Select product"
            onChange={handleProductChange}
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
          >
            {products.map((product) => (
              <Select.Option key={product._id} value={product._id}>
                {product.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {currentPrice && (
          <div className="mb-4">
            <span className="text-gray-600">Current Price: </span>
            <span className="font-semibold">${currentPrice}</span>
          </div>
        )}

        <Form.Item
          label="Advert Price"
          name="price"
          rules={[
            { required: true, message: "Please input price!" },
            () => ({
              validator(_, value) {
                if (value > 0) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Price must be greater than 0")
                );
              },
            }),
          ]}
        >
          <Input
            type="number"
            placeholder="Enter advert price"
            step="1"
            addonBefore="$"
          />
        </Form.Item>

        {/* Rest of your existing form items */}
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please input ad title!" }]}
        >
          <Input placeholder="Enter ad title" />
        </Form.Item>

        <Form.Item
          label="Banner"
          name="image"
          rules={[{ required: true, message: "Please input banner url!" }]}
        >
          <Input placeholder="Enter banner url" />
        </Form.Item>

        <Form.Item
          label="Webpage Url"
          name="url"
          rules={[{ required: true, message: "Please input url of webpage!" }]}
        >
          <Input placeholder="Enter url of webpage" />
        </Form.Item>

        <Form.Item
          label="Content"
          name="description"
          rules={[{ required: true, message: "Please input ad content!" }]}
        >
          <TextArea rows={4} placeholder="Enter ad content" />
        </Form.Item>
        <Form.Item
          label="Dates"
          name="dates"
          rules={[{ required: true, message: "Please select date range!" }]}
        >
          <RangePicker className="w-full" />
        </Form.Item>
        {/* {user.userType === "admin" && (
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "Please select status!" }]}
          >
            <Select
              options={[
                { value: "active", label: "Active" },
                { value: "inactive", label: "Inactive" },
              ]}
            />
          </Form.Item>
        )} */}
      </Form>
    </Modal>
  );
};

export default AdvertFormModal;
