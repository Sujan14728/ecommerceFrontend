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
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLayout from "./layouts/AdminLayout";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminAdvert from "./pages/admin/AdminAdvert";
import AdminOrder from "./pages/admin/AdminOrder";
import AdminReviews from "./pages/admin/AdminReviews";
import SellerProfile from "./pages/seller/SellerProfile";
import AdminProfile from "./pages/admin/AdminProfile";
import AdminProduct from "./pages/admin/AdminProduct";

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
        {
          path: "/seller/profile",
          element: <SellerProfile />,
        },
      ],
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          element: <AdminDashboard />,
          index: true,
        },
        {
          path: "/admin/users",
          element: <AdminUsers />,
        },
        {
          path: "/admin/adverts",
          element: <AdminAdvert />,
        },
        {
          path: "/admin/products",
          element: <AdminProduct />,
        },
        {
          path: "/admin/orders",
          element: <AdminOrder />,
        },
        {
          path: "/admin/reviews",
          element: <AdminReviews />,
        },
        {
          path: "/admin/profile",
          element: <AdminProfile />,
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
