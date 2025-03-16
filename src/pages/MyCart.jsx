import React, { useState, useEffect } from "react";
import { createOrder, getActiveAds, getCartItems } from "../lib/api"; // Assume you have an API function for fetching active ads
import { useSelector } from "react-redux";
import CartItem from "../components/Customer/Cart/CartItem";
import dayjs from "dayjs";
import { Modal, notification } from "antd";
import { useNavigate } from "react-router-dom";

const MyCart = () => {
  const user = useSelector((state) => state.auth.user);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [flag, setFlag] = useState(0);
  const [adverts, setAdverts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch cart items and active adverts simultaneously
        const [cartResponse, advertsResponse] = await Promise.all([
          getCartItems(user._id),
          getActiveAds(),
        ]);

        setCartItems(cartResponse.data);
        setAdverts(advertsResponse.data);

        calculateTotal(cartResponse.data, advertsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [flag, user._id]);
  // Get advertised price for a product
  const getAdvertisedPrice = (productId) => {
    const currentDate = dayjs();
    const activeAdvert = adverts.find(
      (ad) =>
        ad.productId._id === productId &&
        dayjs(ad.startDate).isBefore(currentDate) &&
        dayjs(ad.endDate).isAfter(currentDate)
    );
    return activeAdvert ? activeAdvert.price : null;
  };

  // Calculate total price considering advertisements
  const calculateTotal = (items, advertisements) => {
    const total = items.reduce((sum, item) => {
      const activeAdvert = advertisements.find(
        (ad) =>
          ad.productId._id === item.productId._id &&
          dayjs(ad.startDate).isBefore(dayjs()) &&
          dayjs(ad.endDate).isAfter(dayjs())
      );

      const price = activeAdvert ? activeAdvert.price : item.productId.price;
      return sum + price * item.quantity;
    }, 0);

    setTotalPrice(total);
  };

  const handleCheckout = async () => {
    Modal.confirm({
      title: "Order Products",
      content: "Are you sure you want to place the order?",
      okText: "Yes",
      okType: "primary",
      async onOk() {
        try {
          setLoading(true);

          const processedItems = cartItems.map((item) => ({
            productId: item.productId._id,
            quantity: item.quantity,
            price: item.productId.price,
            advertisedPrice: getAdvertisedPrice(item.productId._id) || null, // Add advertised price if available
          }));

          const orderData = {
            customerId: user._id,
            items: processedItems,
            totalPrice: totalPrice,
          };

          console.log(orderData);
          const response = await createOrder(orderData);

          notification.success({
            message: "Order Placed!",
          });

          navigate("/profile?tab=3");
        } catch (error) {
          notification.error({
            message: "Order Failed",
            description:
              error.response?.data?.message || "Something went wrong",
          });
        } finally {
          setLoading(false);
        }
      },
    });
  };

  return (
    <div className="w-[80%] mx-auto p-4 flex md:flex-row flex-col md:justify-between gap-5 ">
      <div className="flex flex-col w-full md:w-[50%] ">
        <h1 className="text-3xl font-semibold mb-6">Your Cart</h1>
        {cartItems.length === 0 ? (
          <p className="text-center text-xl">Your cart is empty.</p>
        ) : (
          <div>
            {cartItems.map((item) => (
              <CartItem
                item={item}
                flag={flag}
                setFlag={setFlag}
                advertisedPrice={getAdvertisedPrice(item.productId._id)}
              />
            ))}
          </div>
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="mt-6 border p-4 rounded-lg w-full md:w-[50%] lg:w-[40%] bg-gray-100">
          <h2 className="text-xl font-semibold mb-4">Cart Summary</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border border-gray-300 text-left">Item</th>
                <th className="p-2 border border-gray-300">Quantity</th>
                <th className="p-2 border border-gray-300 text-right">Price</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => {
                const advertisedPrice = getAdvertisedPrice(item.productId._id);
                const price = advertisedPrice || item.productId.price;

                return (
                  <tr key={item._id} className="border border-gray-300">
                    <td className="p-2 border border-gray-300">
                      {item.productId.name}
                      {advertisedPrice && (
                        <span className="ml-2 text-green-600 text-sm">
                          (Special Offer!)
                        </span>
                      )}
                    </td>
                    <td className="p-2 border border-gray-300 text-center">
                      {item.quantity}
                    </td>
                    <td className="p-2 border border-gray-300 text-right">
                      {advertisedPrice ? (
                        <>
                          <span className="line-through text-gray-400 mr-2">
                            ${item.productId.price * item.quantity}
                          </span>
                          <span className="text-green-600">
                            ${advertisedPrice * item.quantity}
                          </span>
                        </>
                      ) : (
                        `$${item.productId.price * item.quantity}`
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <hr className="my-4" />
          <div className="flex justify-between items-center text-lg font-semibold">
            <span>Total Price:</span>
            <span>${totalPrice}</span>
          </div>
          <button
            onClick={handleCheckout}
            className="mt-4 w-full bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default MyCart;
