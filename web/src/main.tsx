import "antd/dist/antd.less";
import "./main.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Login } from "~/routes/Login";
import { RedirectCallback } from "~/routes/RedirectCallback";
import { Home } from "~/routes/Home";
import { NotFoundError } from "./components/FullPageError";
import { AuthProvider } from "./components/AuthProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    ),
    children: [
      { path: "/login", element: <Login /> },
      { path: "/redirect/callback", element: <RedirectCallback /> },
      { path: "/", element: <Home /> },
    ],
  },
  { path: "*", element: <NotFoundError /> },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
