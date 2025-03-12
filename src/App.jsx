import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CustormerLayout from "./layouts/CustormerLayout";
import Home from "./pages/Home";
import MyWishlist from "./pages/MyWishlist";
import MyCart from "./pages/MyCart";
import UserProfile from "./pages/UserProfile";
import Shop from "./pages/Shop";
import AuthPage from "./components/AuthPage";

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
        element: <MyWishlist />,
      },
      {
        path: "/cart",
        element: <MyCart />,
      },
      {
        path: "/profile",
        element: <UserProfile />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
