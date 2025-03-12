import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../lib/api";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    api.get("/products").then((res) => {
      setProducts(res.data);
      setFilteredProducts(res.data);
    });

    api.get("/categories").then((res) => setCategories(res.data));
  }, []);

  const filterByCategory = (categoryId) => {
    setSelectedCategory(categoryId);
    setFilteredProducts(
      categoryId
        ? products.filter((p) => p.categoryId === categoryId)
        : products
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shop</h1>
      <div className="mb-4">
        <select
          value={selectedCategory}
          onChange={(e) => filterByCategory(e.target.value)}
          className="border p-2 rounded-lg"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <a
            key={product._id}
            href={`/product/${product._id}`}
            className="border p-4 rounded-lg shadow-lg hover:shadow-xl"
          >
            <img
              src={product.imgUrl}
              alt={product.name}
              className="w-full h-40 object-cover rounded"
            />
            <h3 className="font-semibold mt-2">{product.name}</h3>
            <p className="text-gray-600">{product.brand}</p>
            <span className="font-bold text-blue-600">${product.price}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

export function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    api.get(`/products/${id}`).then((res) => setProduct(res.data));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
      <img
        src={product.imgUrl}
        alt={product.name}
        className="w-96 h-96 object-cover rounded"
      />
      <p className="text-gray-700 mt-2">{product.description}</p>
      <p className="font-bold text-xl text-blue-600">${product.price}</p>
      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
        Add to Cart
      </button>
    </div>
  );
}
