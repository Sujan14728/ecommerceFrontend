import { useState, useEffect } from "react";
import { getCategories, getProducts } from "../lib/api";
import { useSelector } from "react-redux";
import ProductCard from "../components/Seller/Product/ProductCard";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const user = useSelector((state) => state.auth.user);
  const [flag, setFlag] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await getProducts();
        setProducts(productResponse.data);
        setFilteredProducts(productResponse.data);

        const categoryResponse = await getCategories();
        setCategories(categoryResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user?._id, flag]);

  const filterByCategory = (categoryId) => {
    setSelectedCategory(categoryId);
    setFilteredProducts(
      categoryId
        ? products.filter((p) => p.categoryId?._id === categoryId)
        : products
    );
  };

  return (
    <div className="w-[80%] mx-auto p-4">
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
      <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <ProductCard
            products={products}
            product={product}
            flag={flag}
            setFlag={setFlag}
          />
        ))}
      </div>
    </div>
  );
}
