import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Note from "./components/Note.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Notes from "./components/Notes.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Notes />,
      },
      {
        path: "notes/:id",
        element: <Note />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
