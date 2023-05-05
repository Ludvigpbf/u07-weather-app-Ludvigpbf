import { useContext } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SearchedCity } from "./components/SearchedCity/SearchedCity";
import { About } from "./components/About/About";
import { CurrentWeather } from "./components/CurrentWeather/CurrentWeather";
import { WorldWeather } from "./components/WorldWeather/WorldWeather";
import { Forecast } from "./components/Forecast/Forecast";
import App from "./App";
import "./styles/App.css";
import { WeatherContext } from "./store/WeatherContext";

const AppWrapper = () => {
  const { unit, setUnit, weatherData, setWeatherData, forecastData } =
    useContext(WeatherContext);

  const toggleUnit = () => {
    setUnit(unit === "metric" ? "imperial" : "metric");
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <section className="main-content">
            <App
              weatherData={weatherData}
              forecastData={forecastData}
              unit={unit}
              setUnit={setUnit}
              setWeatherData={setWeatherData}
              toggleUnit={toggleUnit}
              localTime={""}
              coord={{
                lon: 0,
                lat: 0,
              }}
              weather={[]}
              base={""}
              main={{
                temp: 0,
                feels_like: 0,
                pressure: 0,
                humidity: 0,
                temp_min: 0,
                temp_max: 0,
                sea_level: 0,
                grnd_level: 0,
              }}
              visibility={0}
              wind={{
                speed: 0,
                deg: 0,
                gust: 0,
              }}
              clouds={{
                all: 0,
              }}
              dt={0}
              sys={{
                type: 0,
                id: 0,
                message: 0,
                country: "",
                sunrise: "",
                sunset: "",
              }}
              timezone={0}
              id={0}
              name={""}
              cod={0}
              city={{
                name: "",
                country: "",
              }}
              list={[]}
            ></App>
          </section>
        </>
      ),
      children: [
        {
          path: "about",
          element: <About></About>,
        },
        {
          path: "searched-city",
          element: (
            <SearchedCity
              weatherData={weatherData}
              forecastData={forecastData}
              unit={unit}
              setUnit={setUnit}
              setWeatherData={setWeatherData}
              toggleUnit={toggleUnit}
            ></SearchedCity>
          ),
        },
        {
          path: "/",
          element: (
            <>
              <CurrentWeather
                weatherData={weatherData}
                forecastData={forecastData}
                unit={unit}
                setUnit={setUnit}
                setWeatherData={setWeatherData}
                toggleUnit={toggleUnit}
              ></CurrentWeather>
              <Forecast
                weatherData={weatherData}
                forecastData={forecastData}
                unit={unit}
                setUnit={setUnit}
                setWeatherData={setWeatherData}
                toggleUnit={toggleUnit}
              ></Forecast>
              <WorldWeather unit={unit}></WorldWeather>
            </>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <AppWrapper />
);
