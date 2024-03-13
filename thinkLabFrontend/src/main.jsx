import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import FormPage from "./pages/FormPage.jsx";
import ListPage from "./pages/ListPage.jsx";
import LayoutPage from "./pages/LayoutPage.jsx";
import ItemPage from "./pages/ItemPage.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<LayoutPage />}>
      <Route index element={<FormPage />} />
      <Route path="list" element={<ListPage />} />
      <Route path="list/:cellId" element={<ItemPage />} />
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
