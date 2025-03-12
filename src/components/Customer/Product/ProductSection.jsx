import React, { useState } from "react";
import ProductList from "./ProductList";
import FilterProduct from "./FilterProduct";

const mockProducts = [
  {
    id: 1,
    name: "Product 1",
    price: 99,
    image: "https://source.unsplash.com/200x200/?product",
  },
  {
    id: 2,
    name: "Product 2",
    price: 149,
    image: "https://source.unsplash.com/200x200/?electronics",
  },
  {
    id: 3,
    name: "Product 3",
    price: 79,
    image: "https://source.unsplash.com/200x200/?shoes",
  },
];

const ProductSection = () => {
  const [products, setProducts] = useState(mockProducts || []);
  const [filteredProducts, setFilterProducts] = useState(products);
  return (
    <div>
      <FilterProduct
        products={products}
        setFilterProducts={setFilterProducts}
      />
      <ProductList products={filteredProducts} />
    </div>
  );
};

export default ProductSection;
