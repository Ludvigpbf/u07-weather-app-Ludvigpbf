import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/App.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Header } from "./components/Header/Header";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <section className="main-content">
          <App></App>
        </section>
      </>
    ),
    children: [
      {
        path: "app",
        element: <App></App>,
      },
      {
        path: "about",
        element: <p>About us..</p>,
      },
    ],
  },
  {
    path: "app",
    element: <App></App>,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RouterProvider router={router} />
);
