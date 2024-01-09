import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Note from "./components/Note.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Notes from "./components/Notes.jsx";
import SharedNoteView from "./components/SharedNoteView.jsx";
import { SignIn } from "./components/SignIn.jsx";
import { SignUp } from "./components/Signup.jsx";
import { useNavigate } from "react-router-dom";

const isAuthenticated = () => {
  const accessToken = localStorage.getItem("accessToken");
  return accessToken !== null;
};

const AuthenticatedRoute = ({ element }) => {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isAuthenticated()) {
      // redirect to sign-in page if not authenticated
      navigate("/sign-in");
    }
  }, [navigate]);

  return isAuthenticated() ? element : null;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthenticatedRoute element={<App />} />,
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
  {
    path: "/notes/shared/:id",
    element: <SharedNoteView />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
