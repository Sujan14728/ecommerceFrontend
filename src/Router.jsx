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

const Router = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Get auth state from Redux
  console.log(isAuthenticated);
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
      path: "/auth",
      element: isAuthenticated ? <Navigate to="/" /> : <AuthPage />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Router;
