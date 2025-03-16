import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getActiveAds,
  getCategoryById,
  getProductByCategoryId,
  getProducts,
} from "../../lib/api";
import { Button, Card, Col, Row, Spin, Typography } from "antd";
import ProductCard from "../Seller/Product/ProductCard";
import dayjs from "dayjs";
const { Title, Paragraph, Text } = Typography;
const { Meta } = Card;
const CategoryProducts = () => {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [flag, setFlag] = useState(0);
  const [adverts, setAdverts] = useState([]);
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProductByCategoryId(id);
        setProducts(response.data);
        setFilteredProducts(response.data);
        const advertsResponse = await getActiveAds();
        setAdverts(advertsResponse.data);

        const categoryResponse = await getCategoryById(id);
        setCategory(categoryResponse);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, flag]);

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

  const filterBySearch = (searchQuery) => {
    setSearchText(searchQuery);
    filterProducts(searchQuery);
  };

  const filterProducts = (searchQuery) => {
    let filtered = products;
    if (searchQuery) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    console.log(filtered);
    setFilteredProducts(filtered);
  };

  if (loading) {
    return <Spin size="large" className="flex justify-center mt-8" />;
  }

  if (!category) {
    return <div className="text-center mt-8">Category not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button onClick={() => navigate(-1)} className="mb-4">
        Back to Categories
      </Button>
      <Title level={2} className="text-center mb-8">
        {category.name}
      </Title>
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
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.length === 0 ? (
          <Text className="text-center w-full">
            No products found in this category
          </Text>
        ) : (
          filteredProducts.map((product) => {
            const advertisedPrice = getAdvertisedPrice(product._id);
            return (
              <>
                <ProductCard
                  product={product}
                  flag={flag}
                  setFlag={setFlag}
                  advertisedPrice={advertisedPrice}
                />
              </>
            );
          })
        )}
      </div>
    </div>
  );
};

export default CategoryProducts;
