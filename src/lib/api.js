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

export default api;
