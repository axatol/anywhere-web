import "antd/dist/antd.less";
import "./main.css";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  createBrowserRouter,
  Outlet,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import { Login } from "~/routes/Login";
import { App } from "~/routes/App";
import { AuthProvider, ProtectedRoute } from "~/components/AuthProvider";
import { APIProvider } from "~/components/APIProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <APIProvider>
          <Outlet />
        </APIProvider>
      </AuthProvider>
    ),
    children: [
      { path: "/redirect/callback" },
      { path: "/login", element: <Login /> },
      { path: "/", element: <ProtectedRoute component={App} /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
