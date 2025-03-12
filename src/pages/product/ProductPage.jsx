import { useEffect, useState } from "react";
import {
  addReview,
  deleteReview,
  getProductById,
  getReviewsForProduct,
  getUserReviews,
} from "../../lib/api";
import { useParams } from "react-router-dom";
import { CiStar } from "react-icons/ci";
import { useSelector } from "react-redux";
import { formatDate } from "../../utils/formatDate";
import { AiOutlineDelete } from "react-icons/ai";

export function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const user = useSelector((state) => state.auth.user);
  const [userReview, setUserReview] = useState(null);

  const [flag, setFlag] = useState(0);

  useEffect(() => {
    const fetchUserReview = async () => {
      const response = await getUserReviews(user._id);
      console.log(response);
      setUserReview(response.data);
    };
    fetchUserReview();
  }, [flag, user._id]);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await getProductById(id);
      setProduct(response.data);
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchReviews = async () => {
      const response = await getReviewsForProduct(id);
      setReviews(response.data);
    };

    fetchReviews();
  }, [id, flag]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!comment || rating === 0) {
      alert("Please provide both rating and comment.");
      return;
    }
    setIsSubmitting(true);
    try {
      const reviewData = {
        userId: user?._id,
        rating,
        comment,
      };
      const response = await addReview(id, reviewData);
      setReviews((prevReviews) => [...prevReviews, response.data]);
      setSuccessMessage("Review added successfully!");
      setRating(1);
      setComment("");
    } catch (err) {
      console.log(err);
      alert("Failed to submit review. Please try again.");
    } finally {
      setFlag(flag + 1);
      setIsSubmitting(false);
    }
  };

  const onDeleteClick = async (reviewId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this review?"
    );

    if (!confirmDelete) return;

    try {
      await deleteReview(reviewId);
      setFlag(flag + 1);
      setUserReview(null);
      alert("Review deleted successfully");
    } catch (error) {
      console.error("Error deleting review:", error);
      alert("Failed to delete review. Please try again.");
    }
  };
  if (!product) return <p>Loading...</p>;

  return (
    <div className="w-full pt-8 flex justify-center p-4">
      <div className="w-[80%] flex lg:flex-row flex-col justify-between gap-4">
        <div>
          <h1 className="w-full text-left text-[28px] font-[600]">
            Product Details
          </h1>
          <div className="w-80 flex flex-col items-center bg-slate-100 rounded-lg py-4">
            <img
              src={product.imgUrl}
              alt={product.name}
              className="w-48 h-48 object-contain rounded"
            />
            <h1 className="font-bold mb-2">{product.name}</h1>
            <span className="font-[500] text-gray-500">
              Category: {product.categoryId.name}
            </span>
            <hr className="border-[1px] w-full mt-2" />
            <p className="text-gray-700 mt-2">{product.description}</p>
            <p className="font-bold text-xl text-blue-600">${product.price}</p>
            <button className="flex gap-2 items-center mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Add to Cart
            </button>
          </div>
        </div>

        {/* Review Section */}
        <div className="w-full lg:w-[40%] mt-4 lg:mt-0">
          <h2 className="text-2xl font-bold mb-4">Write a Review</h2>
          <form onSubmit={handleReviewSubmit} className="space-y-4">
            <div className="flex items-center">
              <label className="mr-4 font-semibold">Rating:</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                  >
                    <CiStar
                      className={`
                    ${rating >= star ? "text-yellow-400" : "text-gray-300"}`}
                      fontSize={28}
                    />
                  </button>
                ))}
              </div>
            </div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your review here..."
              className="w-full p-4 border border-gray-300 rounded-lg resize-none"
              rows="4"
            />

            {successMessage && (
              <p className="text-green-500">{successMessage}</p>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            >
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </button>
          </form>

          {/* Your review */}
          {userReview !== null && (
            <div className="mt-8">
              <h3 className="text-xl font-bold">Your review</h3>
              <div className="border-b border-gray-300 py-4">
                <div className="flex flex-col justify-center gap-2">
                  <div className="font-semibold w-full flex justify-between ">
                    <span>{userReview?.userId?.email}</span>
                    <span className="font-normal text-gray-500 ">
                      {formatDate(userReview?.createdAt)}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((_, i) => (
                      <span
                        key={i}
                        className={`${
                          userReview?.rating > i
                            ? "text-yellow-400"
                            : "text-gray-400"
                        } `}
                      >
                        <CiStar fontSize={16} />
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-gray-600 mt-2">{userReview.comment}</p>
                  <button
                    className="w-6"
                    onClick={() => onDeleteClick(userReview._id)}
                  >
                    <AiOutlineDelete color="red" fontSize={20} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Reviews List */}
          <div className="mt-8">
            <h3 className="text-xl font-bold">Other Reviews</h3>
            {reviews?.length > 0 ? (
              reviews?.map((review) => {
                if (review?.userId._id === user._id) {
                  return;
                }
                return (
                  <div
                    key={review?._id}
                    className="border-b border-gray-300 py-4"
                  >
                    <div className="flex flex-col justify-center gap-2">
                      <div className="font-semibold w-full flex justify-between ">
                        <span>{review?.userId?.email}</span>
                        <span className="font-normal text-gray-500 ">
                          {formatDate(review?.createdAt)}
                        </span>
                      </div>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((_, i) => (
                          <span
                            key={i}
                            className={`${
                              review?.rating > i
                                ? "text-yellow-400"
                                : "text-gray-400"
                            } `}
                          >
                            <CiStar fontSize={16} />
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 mt-2">{review?.comment}</p>
                  </div>
                );
              })
            ) : (
              <p>No reviews yet. Be the first to write one!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
