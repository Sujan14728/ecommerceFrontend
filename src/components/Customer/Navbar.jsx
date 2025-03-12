import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-700">ShopLogo</h1>
        <ul className="flex space-x-6 text-gray-600">
          <Link to={"/"}>Home</Link>
          <Link to={"/shop"}>Shop</Link>
          <Link to={"/cart"}>Cart</Link>
          <Link to={"/wishlist"}>Wishlist</Link>
          <Link to={"/profile"}>Profile</Link>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
