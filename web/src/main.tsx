import "./main.css";
import "antd/dist/reset.css";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";

import { GenericError } from "~/components/FullPageError";
import { FullPageLoader } from "~/components/FullPageLoader";
import { APIProvider } from "~/contexts/APIProvider";
import { AuthProvider, ProtectedRoute } from "~/contexts/AuthProvider";
import { DataProvider } from "~/contexts/DataProvider";
import { PlayerProvider } from "~/contexts/PlayerProvider";
import { App } from "~/routes/App";
import { ArtistList } from "~/routes/ArtistList";
import { TrackList } from "~/routes/TrackList";
import { TrackSearch } from "~/routes/TrackSearch";

const Root = () => (
  <AuthProvider>
    <APIProvider>
      <DataProvider>
        <PlayerProvider>
          <Outlet />
        </PlayerProvider>
      </DataProvider>
    </APIProvider>
  </AuthProvider>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "redirect/callback", element: <FullPageLoader /> },
      {
        path: "*",
        element: <ProtectedRoute component={App} />,
        errorElement: <GenericError />,
        children: [
          { index: true, element: <Navigate to="/tracks" /> },
          { path: "tracks", element: <TrackList /> },
          { path: "artists", element: <ArtistList /> },
          { path: "albums", element: <TrackSearch /> },
          { path: "search", element: <TrackSearch /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
