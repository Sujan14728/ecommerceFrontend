import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { message } from "antd";
import api, { getWishlistItems, removeFromWishlist } from "../lib/api"; // Assuming you have an API helper
import { CiTrash } from "react-icons/ci"; // Trash icon to remove product
import ProductCard from "../components/Seller/Product/ProductCard";
import Loading from "../utils/Loading";

const MyWishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.auth.user); // Assuming you store the user in redux
  const [flag, setFlag] = useState(0);
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await getWishlistItems(user._id); // Fetch wishlist by userId
        setWishlist(response.data); // Assuming your API returns the wishlist products
      } catch (error) {
        console.error("Error fetching wishlist:", error);
        message.error("Failed to load wishlist");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchWishlist();
    }
  }, [user, flag]);

  if (loading) {
    return (
      <div className="w-full min-h-[10rem] flex justify-center items-center ">
        <Loading />
      </div>
    );
  }

  return (
    <div className="w-[80%] mx-auto p-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">My Wishlist</h1>
      {wishlist?.length === 0 ? (
        <div>Your wishlist is empty.</div>
      ) : (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {wishlist?.map((item) => (
            <ProductCard
              product={item.productId}
              flag={flag}
              setFlag={setFlag}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyWishlist;
