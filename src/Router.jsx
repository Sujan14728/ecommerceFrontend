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
import UserProfile from "./pages/UserProfile";
import AuthPage from "./components/AuthPage";

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
          element: (
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <MyWishlist />
            </ProtectedRoute>
          ),
        },
        {
          path: "/cart",
          element: (
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <MyCart />
            </ProtectedRoute>
          ),
        },
        {
          path: "/profile",
          element: (
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <UserProfile />
            </ProtectedRoute>
          ),
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
