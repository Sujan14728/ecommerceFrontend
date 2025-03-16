import { message } from "antd";
import React, { useEffect, useState } from "react";
import {
  addToCart,
  addToWishlist,
  getWishlistItems,
  removeFromWishlist,
} from "../../../lib/api";
import { useSelector } from "react-redux";
import { CiHeart, CiShoppingCart } from "react-icons/ci";

const ProductCard = ({ product, flag, setFlag, advertisedPrice }) => {
  const user = useSelector((state) => state.auth.user);
  const [wishlistedProducts, setWishlistedProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const wishlistResponse = await getWishlistItems(user._id);
      setWishlistedProducts(wishlistResponse.data);
    };
    fetchData();
  }, [user?._id, flag]);

  const handleAddToCart = async (productId) => {
    try {
      await addToCart(user._id, productId);

      message.success("Product added to cart successfully!");
    } catch (error) {
      console.error("Error adding product to cart:", error);
      message.error("Failed to add product to cart");
    }
  };

  const handleAddToWishlist = async (productId) => {
    try {
      if (
        wishlistedProducts.some(
          (product) => product?.productId?._id === productId
        )
      ) {
        // Remove from wishlist
        await removeFromWishlist(user._id, productId);
        setWishlistedProducts(
          wishlistedProducts.filter((product) => product._id !== productId)
        );
        message.success("Product removed from wishlist!");
      } else {
        // Add to wishlist
        await addToWishlist(user._id, productId);
        setFlag(flag + 1);
        message.success("Product added to wishlist!");
      }
      setFlag(flag + 1);
    } catch (error) {
      console.error("Error handling wishlist:", error);
      message.error("Failed to update wishlist");
    }
  };

  const isWishlisted = (productId) => {
    return wishlistedProducts.some(
      (product) => product?.productId?._id === productId
    );
  };
  return (
    <div className="relative bg-neutral-100 p-2 rounded-lg shadow-lg ">
      <a
        key={product._id}
        href={`/product/${product._id}`}
        className="w-full p-4 rounded-lg flex flex-col gap-4 "
      >
        <img
          src={product.imgUrl}
          alt={product.name}
          className="w-full h-32 object-contain rounded"
        />
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold mt-2">{product.name}</h3>
          <p className="text-gray-600">{product.brand}</p>
          {advertisedPrice ? (
            <div className="flex items-center gap-2">
              <span className="line-through text-gray-400">
                ${product.price}
              </span>
              <span className="text-green-600 font-bold">
                ${advertisedPrice}
              </span>
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                Sale
              </span>
            </div>
          ) : (
            <span className="font-semibold">${product.price}</span>
          )}
        </div>
      </a>
      <div className="flex justify-center gap-4 ">
        <CiHeart
          fontSize={28}
          className={`cursor-pointer ${
            isWishlisted(product._id) ? "text-red-500" : ""
          }`}
          onClick={() => handleAddToWishlist(product._id)}
        />
        <CiShoppingCart
          className="cursor-pointer"
          fontSize={28}
          onClick={() => handleAddToCart(product._id)}
        />
      </div>
    </div>
  );
};

export default ProductCard;
