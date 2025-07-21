import { createBrowserRouter, RouterProvider } from "react-router";
import { createRoot } from "react-dom/client";
import Main from "./pages/Main.jsx";
import Details from "./pages/Details.jsx";
import "./index.css";
import HomepageLayout from "./layout/HomepageLayout.jsx";
import DetailsLayout from "./layout/DetailsLayout.jsx";

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
      // {
      //   path: "/details/:id",
      //   element: <Details />,
      // },
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
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
