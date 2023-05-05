import { Header } from "./components/Header/Header";
import { useState } from "react";
import {
  AppProps,
  ForecastData,
  OutletProps,
  WeatherData,
  WorldWeatherProps,
} from "./interfaces/interfaces";
import { WeatherContext } from "./store/WeatherContext";
import { useForecast } from "./hooks/useForecast";
import { Outlet } from "./components/Outlet/Outlet";
import { Routes, Route } from "react-router-dom";
import { About } from "./components/About/About";

interface AppOutletProps
  extends AppProps,
    OutletProps,
    WeatherData,
    ForecastData,
    WorldWeatherProps {}

function App(props: AppOutletProps) {
  const { weatherData, setWeatherData } = props;
  const [unit, setUnit] = useState<string>("metric");
  const { data: forecastData } = useForecast("");
  const toggleUnit = () => {
    setUnit((unit) => (unit === "metric" ? "imperial" : "metric"));
  };
  console.log(unit);
  return (
    <WeatherContext.Provider
      value={{
        weatherData,
        setWeatherData,
        unit,
        setUnit,
        forecastData,
      }}
    >
      <Header
        {...{
          forecastData,
          unit,
          setUnit,
          weatherData,
          setWeatherData,
          toggleUnit,
        }}
      />
      <Outlet
        {...{
          forecastData,
          unit,
          setUnit,
          weatherData,
          setWeatherData,
          toggleUnit,
        }}
      ></Outlet>
    </WeatherContext.Provider>
  );
}

export default App;
