import React, { useState, useEffect } from "react";
import { getCartItems } from "../lib/api";
import { useSelector } from "react-redux";
import CartItem from "../components/Customer/Cart/CartItem";

const MyCart = () => {
  const user = useSelector((state) => state.auth.user);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [flag, setFlag] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        console.log("Fetching cart items...");
        const response = await getCartItems(user._id);
        console.log("Fetched data:", response.data);
        setCartItems(response.data);
        calculateTotal(response.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, [flag, user._id]);

  // Calculate total price
  const calculateTotal = (items) => {
    const total = items.reduce((sum, item) => {
      return sum + item.productId.price * item.quantity;
    }, 0);
    setTotalPrice(total);
  };

  useEffect(() => {
    console.log(flag);
  }, [flag]);

  return (
    <div className="w-[80%] mx-auto p-4 flex md:flex-row flex-col md:justify-between gap-5 ">
      <div className="flex flex-col w-full md:w-[50%] ">
        <h1 className="text-3xl font-semibold mb-6">Your Cart</h1>
        {cartItems.length === 0 ? (
          <p className="text-center text-xl">Your cart is empty.</p>
        ) : (
          <div>
            {cartItems.map((item) => (
              <CartItem item={item} flag={flag} setFlag={setFlag} />
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
              {cartItems.map((item) => (
                <tr key={item._id} className="border border-gray-300">
                  <td className="p-2 border border-gray-300">
                    {item.productId.name}
                  </td>
                  <td className="p-2 border border-gray-300 text-center">
                    {item.quantity}
                  </td>
                  <td className="p-2 border border-gray-300 text-right">
                    ${item.productId.price * item.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <hr className="my-4" />
          <div className="flex justify-between items-center text-lg font-semibold">
            <span>Total Price:</span>
            <span>${totalPrice}</span>
          </div>
          <button className="mt-4 w-full bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700">
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default MyCart;
