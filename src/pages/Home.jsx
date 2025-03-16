// import AdsCarousel from "../components/Customer/AdsCarousel";
// import Hero from "../components/Customer/Hero";

// const Home = () => {
//   return (
//     <div className="bg-gray-100">
//       <Hero />
//       <AdsCarousel />
//     </div>
//   );
// };

// export default Home;

import {
  Carousel,
  Card,
  Col,
  Typography,
  Button,
  Rate,
  Row,
  Image,
} from "antd";
import { useEffect, useState } from "react";
import { getCategories, getPublicActiveAds } from "../lib/api";
import { useNavigate } from "react-router-dom";
import { NewsletterSubscription } from "../components/Customer/NewsletterSubscription";
import { BenefitsSection } from "../components/Customer/BenefitsSection";

const { Title, Paragraph, Text } = Typography;
const { Meta } = Card;

// Home Page Component
const HomePage = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await getPublicActiveAds();
        setAds(response.data);
      } catch (err) {
        console.log(err);
        setError("Failed to load advertisements");
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, []);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <Title level={1} className="text-white mb-4">
                Discover Amazing Products
              </Title>
              <Paragraph className="text-xl mb-6">
                Explore our curated collection of premium electronics and
                accessories
              </Paragraph>
              <Button type="primary" size="large">
                Shop Now
              </Button>
            </div>
            <div className="md:w-1/2">
              <Carousel
                autoplay
                effect="fade"
                dots={{ className: "custom-dots" }}
              >
                {ads?.map((ad) => (
                  <div key={ad._id} className="relative h-96">
                    <Image
                      src={ad.image}
                      alt={ad.title}
                      preview={false}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center">
                      <div className="text-white p-8 max-w-2xl">
                        <h3 className="text-4xl font-bold mb-4">{ad.title}</h3>
                        <p className="text-xl mb-6">{ad.description}</p>
                        <div className="flex items-center gap-4">
                          <span className="text-3xl font-bold text-green-400">
                            ${ad.price}
                          </span>
                          {ad.productId && (
                            <a
                              href={`/product/${ad.productId._id}`}
                              className="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-100 transition"
                            >
                              View Product
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-100">
        <div className="container mx-auto px-4 py-8 ">
          <Title level={2} className="text-center mb-8">
            Shop by Category
          </Title>
          <div className="flex flex-wrap gap-5 ">
            {categories.map((category) => (
              <div
                key={category._id}
                className=" min-w-[200px] text-center cursor-pointer"
              >
                <div
                  hoverable
                  onClick={() => navigate(`/category/${category._id}`)}
                  className="p-4 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow "
                >
                  {category.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BenefitsSection />
      <NewsletterSubscription />
    </div>
  );
};

export default HomePage;
