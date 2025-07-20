import { createBrowserRouter, RouterProvider } from "react-router";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import Main from "./pages/Main.jsx";
import Details from "./pages/Details.jsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "/details/:id",
        element: <Details />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
