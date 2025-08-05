import { createBrowserRouter, RouterProvider } from "react-router";
import { createRoot } from "react-dom/client";
import Main from "./pages/Main.jsx";
import Details from "./pages/Details.jsx";
import HomepageLayout from "./layout/HomepageLayout.jsx";
import DetailsLayout from "./layout/DetailsLayout.jsx";
import FilterLayout from "./layout/FilterLayout.jsx";
import FilterResults from "./pages/FilterResults.jsx";
import { FiltersProvider } from "./context/FiltersContext.jsx";
import { PropertyProvider } from "./context/PropertyContext.jsx";
import "./index.css";
import LoginPage from "./pages/LoginPage.jsx";
import RegPage from "./pages/RegPage.jsx";
import AuthLayout from "./layout/AuthLayout.jsx";
import { Toaster } from "react-hot-toast";
import ProfileLayout from "./layout/ProfileLayout.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import WishlistLayout from "./layout/WishlistLayout.jsx";
import WishlistPage from "./pages/WishlistPage.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";
import ProtectedAuthRoute from "./pages/ProtectedAuthRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomepageLayout />,
    children: [
      {
        path: "/",
        index: true,
        element: <Main />,
      },
    ],
  },
  {
    path: "/details",
    element: <DetailsLayout />,
    children: [
      {
        path: ":id",
        element: <Details />,
      },
    ],
  },
  {
    path: "wishlist",
    element: <WishlistLayout />,
    children: [
      {
        path: "/wishlist",
        element: (
          <ProtectedRoute>
            <WishlistPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/filters",
    element: <FilterLayout />,
    children: [
      {
        path: "/filters",
        element: <FilterResults />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: (
          <ProtectedAuthRoute>
            <LoginPage />
          </ProtectedAuthRoute>
        ),
      },
      {
        path: "register",
        element: (
          <ProtectedAuthRoute>
            <RegPage />
          </ProtectedAuthRoute>
        ),
      },
    ],
  },
  {
    path: "/profile",
    element: <ProfileLayout />,
    children: [
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <FiltersProvider>
    <PropertyProvider>
      <Toaster position="top-right" />
      <RouterProvider router={router} />
    </PropertyProvider>
  </FiltersProvider>
);
