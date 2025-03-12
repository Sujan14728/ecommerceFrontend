import React, { useState } from "react";

const FilterProduct = ({ products, setFilterProducts }) => {
  const [filters, setFilters] = useState({
    category: "",
    price: "",
    name: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const applyFilters = () => {
    let filteredProducts = products;

    if (filters.name) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }

    if (filters.category) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === filters.category
      );
    }

    if (filters.price) {
      const [min, max] = filters.price.split("-").map(Number);
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= min && product.price <= max
      );
    }

    setFilterProducts(filteredProducts);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-lg font-bold mb-3">Filter Products</h2>

      <input
        type="text"
        name="name"
        placeholder="Search by name"
        value={filters.name}
        onChange={handleChange}
        className="w-full p-2 border rounded-md mb-2"
      />

      <select
        name="category"
        value={filters.category}
        onChange={handleChange}
        className="w-full p-2 border rounded-md mb-2"
      >
        <option value="">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="clothing">Clothing</option>
        <option value="shoes">Shoes</option>
      </select>

      <select
        name="price"
        value={filters.price}
        onChange={handleChange}
        className="w-full p-2 border rounded-md mb-2"
      >
        <option value="">All Prices</option>
        <option value="0-500">Under Rs.500</option>
        <option value="500-1000">Rs.500 - Rs.1000</option>
        <option value="1000-5000">Rs.1000 - Rs.5000</option>
        <option value="5000">More than Rs.5000</option>
      </select>

      {/* Apply Filter Button */}
      <button
        onClick={applyFilters}
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default FilterProduct;
