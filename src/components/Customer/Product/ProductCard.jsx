const ProductCard = ({ product }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-cover rounded-lg"
      />
      <h3 className="mt-2 text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-600">${product.price}</p>
      <button className="mt-3 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 w-full">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
