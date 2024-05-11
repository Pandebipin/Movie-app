import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Trending from "./Component/Pages/Trending/Trending.jsx";
import Movies from "./Component/Pages/Movies/Movie.jsx";
import Search from "./Component/Pages/Search/Search.jsx";
import Series from "./Component/Pages/Series/Series.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Trending />,
      },
      {
        path: "/movie",
        element: <Movies />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/series",
        element: <Series />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>
);
