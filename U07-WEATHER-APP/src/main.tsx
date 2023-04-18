import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/App.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { WeatherDetails } from "./components/WeatherDetails/WeatherDetails";
import { WorldWeather } from "./components/WorldWeather/WorldWeather";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header></Header>
        <section className="main-content">
          <Outlet></Outlet>
          <WorldWeather></WorldWeather>
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
      {
        path: "weather-details",
        element: <WeatherDetails></WeatherDetails>,
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
