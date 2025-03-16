import React, { useEffect, useState } from "react";
import {
  getActiveAdByProductId,
  removeFromCart,
  updateCartItem,
} from "../../../lib/api";
import { FaTrashAlt } from "react-icons/fa";

const CartItem = ({ item, flag, setFlag, advertisedPrice }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const handleRemoveFromCart = async (productId) => {
    try {
      await removeFromCart(productId);
      setFlag(flag + 1);
    } catch (error) {
      console.error("Error removing product from cart:", error);
    }
  };

  const handleIncrease = async () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    await updateCartItem(item._id, newQuantity);
    setFlag(flag + 1);
  };

  const handleDecrease = async () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      await updateCartItem(item._id, newQuantity);
      setFlag(flag + 1);
    }
  };

  return (
    <div
      key={item?._id}
      className="flex justify-between items-center p-4 border-b"
    >
      <div className="flex items-center gap-4">
        <img
          src={item?.productId.imgUrl}
          alt={item?.productId.name}
          className="w-16 h-16 object-contain"
        />
        <div>
          <h3 className="font-semibold">{item?.productId.name}</h3>
          {!advertisedPrice ? (
            <span>${item?.productId?.price}</span>
          ) : (
            <div className="flex gap-2">
              <span className="line-through">${item?.productId?.price}</span>
              <span className="text-green-600 ">${advertisedPrice}</span>
            </div>
          )}
          <div className="flex items-center gap-4 mt-2">
            <button
              className="bg-gray-300 px-2 py-1 rounded-lg"
              onClick={handleDecrease}
              disabled={quantity <= 1}
            >
              -
            </button>
            <span className="px-2 py-1">{quantity}</span>
            <button
              className="bg-gray-300 px-2 py-1 rounded-lg"
              onClick={handleIncrease}
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={() => handleRemoveFromCart(item._id)}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          <FaTrashAlt />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
