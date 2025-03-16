import { useState, useEffect } from "react";
import { getActiveAds, getCategories, getProducts } from "../lib/api";
import { useSelector } from "react-redux";
import ProductCard from "../components/Seller/Product/ProductCard";
import dayjs from "dayjs";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchText, setSearchText] = useState("");
  const [adverts, setAdverts] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const [flag, setFlag] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productResponse, categoryResponse, advertsResponse] =
          await Promise.all([
            getProducts(),
            getCategories(),
            getActiveAds(), // Fetch active advertisements
          ]);

        setProducts(productResponse.data);
        setFilteredProducts(productResponse.data);
        setCategories(categoryResponse.data);
        setAdverts(advertsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user?._id, flag]);

  // Check for active advertisements for a product
  const getAdvertisedPrice = (productId) => {
    const currentDate = dayjs();
    const activeAdvert = adverts.find(
      (ad) =>
        ad.productId._id === productId &&
        dayjs(ad.startDate).isBefore(currentDate) &&
        dayjs(ad.endDate).isAfter(currentDate)
    );

    return activeAdvert ? activeAdvert.price : null;
  };

  // Rest of the filter functions remain the same
  const filterByCategory = (categoryId) => {
    setSelectedCategory(categoryId);
    filterProducts(categoryId, searchText);
  };

  const filterBySearch = (searchQuery) => {
    setSearchText(searchQuery);
    filterProducts(selectedCategory, searchQuery);
  };

  const filterProducts = (categoryId, searchQuery) => {
    let filtered = products;

    if (categoryId) {
      filtered = filtered.filter((p) => p.categoryId?._id === categoryId);
    }

    if (searchQuery) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  return (
    <div className="w-[80%] mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shop</h1>
      <div className="flex gap-4 w-full justify-center">
        <div className="mb-4 lg:w-[60%] w-full">
          <input
            type="text"
            value={searchText}
            onChange={(e) => filterBySearch(e.target.value)}
            placeholder="Search products..."
            className="border p-2 rounded-lg w-full"
          />
        </div>

        <div className="mb-4 w-fit">
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
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.map((product) => {
          const advertisedPrice = getAdvertisedPrice(product._id);
          return (
            <ProductCard
              key={product._id}
              product={product}
              flag={flag}
              setFlag={setFlag}
              advertisedPrice={advertisedPrice}
            />
          );
        })}
      </div>
    </div>
  );
}
