import React from "react";

const Hero = () => {
  return (
    <div
      className="relative h-[400px] flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://source.unsplash.com/1600x900/?shopping')",
      }}
    >
      <div className="bg-black bg-opacity-50 text-white text-center p-10 rounded-lg">
        <h1 className="text-4xl font-bold">Welcome to Our Store</h1>
        <p className="mt-2">Find the best products at unbeatable prices</p>
        <button className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-full text-white">
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default Hero;
