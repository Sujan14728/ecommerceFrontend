// components/AdsCarousel.jsx
import { Carousel, Skeleton, Image, Alert } from "antd";
import { useEffect, useState } from "react";
import { getPublicActiveAds } from "../../lib/api";

const AdsCarousel = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
  console.log(ads);

  if (error) return <Alert message={error} type="error" className="m-4" />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Featured Offers</h2>
      <Skeleton active loading={loading}>
        <Carousel autoplay effect="fade" dots={{ className: "custom-dots" }}>
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
      </Skeleton>
    </div>
  );
};

export default AdsCarousel;
