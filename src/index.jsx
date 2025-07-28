import { createBrowserRouter, RouterProvider } from "react-router";
import { createRoot } from "react-dom/client";
import Main from "./pages/Main.jsx";
import Details from "./pages/Details.jsx";
import HomepageLayout from "./layout/HomepageLayout.jsx";
import DetailsLayout from "./layout/DetailsLayout.jsx";
import "./index.css";
import FilterLayout from "./layout/FilterLayout.jsx";
import FilterResults from "./pages/FilterResults.jsx";
import { FiltersProvider } from "./context/FiltersContext.jsx";
import { PropertyProvider } from "./context/PropertyContext.jsx";

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
    path: "/filters",
    element: <FilterLayout />,
    children: [
      {
        path: "/filters",
        element: <FilterResults />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <FiltersProvider>
    <PropertyProvider>
      <RouterProvider router={router} />
    </PropertyProvider>
  </FiltersProvider>
);
