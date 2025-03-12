import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../lib/store/slices/authSlice";
import { userLogout } from "../../lib/api";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const handleLogout = async () => {
    await userLogout();
    dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/auth");
  };
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
        <div className="flex gap-4">
          <div>
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-800"
              >
                Logout
              </button>
            ) : (
              <Link to="/auth" className="text-gray-600 hover:text-gray-800">
                Login
              </Link>
            )}
          </div>
          {isAuthenticated && user.userType === "seller" && (
            <Link to={"/seller/dashboard"}>Dashboard</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
