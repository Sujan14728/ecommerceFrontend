import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Customer Authentication APIs
export const userSignup = async (customerData) => {
  try {
    const response = await api.post("/users", customerData);
    return response.data;
  } catch (error) {
    console.error("Error signing up user:", error);
    throw error;
  }
};

export const userLogin = async (credentials) => {
  try {
    const response = await api.post("/users/login", credentials);
    return response.data;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

export const userLogout = async () => {
  try {
    const response = await api.post("/users/logout");
    return response.data;
  } catch (error) {
    console.error("Error logging out user:", error);
    throw error;
  }
};

//Users api
export const getAllUsers = async () => {
  try {
    const response = await api.get("/users");
    return response.data;
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw error;
  }
};

export const getUserById = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with ID ${userId}:`, error);
    throw error;
  }
};

export const updateUser = async (userId, updatedData) => {
  try {
    const response = await api.put(`/users/${userId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating user with ID ${userId}:`, error);
    throw error;
  }
};

export const changeUserPassword = async (
  userId,
  currentPassword,
  newPassword
) => {
  try {
    const response = await api.put(`/users/password/${userId}`, {
      currentPassword,
      newPassword,
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating user with ID ${userId}:`, error);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await api.delete(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting user with ID ${userId}:`, error);
    throw error;
  }
};

//Product api
export const getProducts = async () => {
  try {
    const response = await api.get("/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

export const getProductByUserId = async (userId) => {
  console.log(userId);
  try {
    const response = await api.get(`/products/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

export const createProduct = async (productData) => {
  try {
    const response = await api.post("/products", productData);
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

export const updateProduct = async (id, updatedData) => {
  try {
    const response = await api.put(`/products/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    await api.delete(`/products/${id}`);
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

//Categories API
export const getCategories = async () => {
  try {
    const response = await api.get("/categories");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const getCategoryById = async (categoryId) => {
  try {
    const response = await api.get(`/categories/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching category with ID ${categoryId}:`, error);
    throw error;
  }
};

export const createCategory = async (categoryData) => {
  try {
    const response = await api.post("/categories", categoryData);
    return response.data;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

export const updateCategory = async (categoryId, updatedData) => {
  try {
    const response = await api.put(`/categories/${categoryId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating category with ID ${categoryId}:`, error);
    throw error;
  }
};

export const deleteCategory = async (categoryId) => {
  try {
    const response = await api.delete(`/categories/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting category with ID ${categoryId}:`, error);
    throw error;
  }
};

//Cart apis
export const getCartItems = async (userId) => {
  try {
    const response = await api.get(`/carts/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
};

export const addToCart = async (userId, productId, quantity = 1) => {
  try {
    const response = await api.post("/carts", { userId, productId, quantity });
    return response.data;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
};

export const updateCartItem = async (cartId, quantity = 1) => {
  try {
    const response = await api.put(`/carts/${cartId}`, { quantity });
    return response.data;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
};

export const removeFromCart = async (productId) => {
  try {
    await api.delete(`/carts/${productId}`);
  } catch (error) {
    console.error("Error removing product from cart:", error);
    throw error;
  }
};

export const clearCart = async () => {
  try {
    await api.delete("/carts");
  } catch (error) {
    console.error("Error clearing cart:", error);
    throw error;
  }
};

//Wishlist apis
export const addToWishlist = async (userId, productId) => {
  try {
    const response = await api.post("/wishlist", { userId, productId });
    return response.data;
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    throw error;
  }
};

export const removeFromWishlist = async (userId, productId) => {
  try {
    const response = await api.post("/wishlist/remove", { userId, productId });
    return response.data;
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    throw error;
  }
};

export const getWishlistItems = async (userId) => {
  try {
    const response = await api.get(`/wishlist/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching wishlist items:", error);
    throw error;
  }
};

//Reviews api
export const getAllReviews = async () => {
  try {
    const response = await api.get(`/reviews`);
    return response.data;
  } catch (error) {
    console.error("Error fetching reviews for product:", error);
    throw error;
  }
};

export const getReviewsForProduct = async (productId) => {
  try {
    const response = await api.get(`/reviews/product/${productId}/reviews`);
    return response.data;
  } catch (error) {
    console.error("Error fetching reviews for product:", error);
    throw error;
  }
};

export const addReview = async (productId, reviewData) => {
  try {
    const response = await api.post(
      `/reviews/product/${productId}/reviews`,
      reviewData
    );
    return response.data;
  } catch (error) {
    console.error("Error adding review:", error);
    throw error;
  }
};

export const updateReview = async (reviewId, updatedReviewData) => {
  try {
    const response = await api.put(
      `/reviews/review/${reviewId}`,
      updatedReviewData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating review:", error);
    throw error;
  }
};

export const getUserReviews = async (userId) => {
  try {
    const response = await api.get(`/reviews/user/${userId}/reviews`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching user reviews:", error);
    throw error;
  }
};

export const deleteReview = async (reviewId) => {
  try {
    const response = await api.delete(`/reviews/review/${reviewId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting review:", error);
    throw error;
  }
};

//Ads apis
export const getAds = async () => {
  try {
    const response = await api.get("/ads");
    return response.data;
  } catch (error) {
    console.error("Error fetching ads:", error);
    throw error;
  }
};

export const getPublicActiveAds = async () => {
  try {
    const response = await api.get("/ads/public/active");
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching ads:", error);
    throw error;
  }
};

export const getPastAds = async () => {
  try {
    const response = await api.get("/ads/past");
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching ads:", error);
    throw error;
  }
};

export const getActiveAdByProductId = async (productId) => {
  try {
    const response = await api.get(`/ads/active/product/${productId}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching ads:", error);
    throw error;
  }
};

export const getAdById = async (adId) => {
  try {
    const response = await api.get(`/ads/${adId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching ad:", error);
    throw error;
  }
};

export const createAd = async (sellerId, adData) => {
  try {
    const response = await api.post(`/ads/${sellerId}`, adData);
    return response.data;
  } catch (error) {
    console.error("Error creating ad:", error);
    throw error;
  }
};

export const updateAd = async (adId, adData) => {
  console.log(adData);
  try {
    const response = await api.put(`/ads/${adId}`, adData);
    return response.data;
  } catch (error) {
    console.error("Error updating ad:", error);
    throw error;
  }
};

export const updateAdStatus = async (adId, status) => {
  try {
    const response = await api.put(`/ads/status/${adId}`, { status });
    return response.data;
  } catch (error) {
    console.error("Error updating ad's status:", error);
    throw error;
  }
};

export const deleteAd = async (adId) => {
  try {
    const response = await api.delete(`/ads/${adId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting ad:", error);
    throw error;
  }
};

export const getAdsByUser = async (userId) => {
  try {
    const response = await api.get(`/ads/user/${userId}/ads`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user ads:", error);
    throw error;
  }
};

export const getActiveAds = async () => {
  try {
    const response = await api.get("/ads/active");
    return response.data;
  } catch (error) {
    console.error("Error fetching active ads:", error);
    throw error;
  }
};

export default api;
