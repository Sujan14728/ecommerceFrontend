import ProductCard from "./ProductCard";

const ProductList = ({ products }) => {
  console.log(products);
  return (
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-bold text-center mb-6">Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
