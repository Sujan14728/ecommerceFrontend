import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { useSelector } from "react-redux"; // If using Redux for authentication state
import CustormerLayout from "./layouts/CustormerLayout";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import MyWishlist from "./pages/MyWishlist";
import MyCart from "./pages/MyCart";
import AuthPage from "./components/AuthPage";
import UserProfile from "./pages/UserProfile";
import SellerDashboard from "./pages/seller/SellerDashboard";
import SellerLayout from "./layouts/SellerLayout";
import SellerProducts from "./pages/seller/SellerProducts";
import { ProductPage } from "./pages/product/ProductPage";

const Router = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Get auth state from Redux
  const router = createBrowserRouter([
    {
      path: "/",
      element: <CustormerLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/shop",
          element: <Shop />,
        },
        {
          path: "/product/:id",
          element: <ProductPage />,
        },
        {
          path: "/wishlist",
          element: <ProtectedRoute />,
          children: [
            {
              path: "",
              element: <MyWishlist />,
            },
          ],
        },
        {
          path: "/cart",
          element: <ProtectedRoute />,
          children: [
            {
              path: "",
              element: <MyCart />,
            },
          ],
        },
        {
          path: "/profile",
          element: <ProtectedRoute />,
          children: [
            {
              path: "",
              element: <UserProfile />,
            },
          ],
        },
      ],
    },
    {
      path: "/seller",
      element: <SellerLayout />,
      children: [
        {
          path: "/seller/dashboard",
          element: <SellerDashboard />,
        },
        {
          path: "/seller/products",
          element: <SellerProducts />,
        },
      ],
    },
    {
      path: "/auth",
      element: isAuthenticated ? <Navigate to="/" /> : <AuthPage />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Router;
