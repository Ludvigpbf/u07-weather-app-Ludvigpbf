import { CurrentWeather } from "./components/CurrentWeather/CurrentWeather";
import { Forecast } from "./components/Forecast/Forecast";
import { WorldWeather } from "./components/WorldWeather/WorldWeather";
import { Header } from "./components/Header/Header";

import { useState } from "react";

function App() {
  const [weatherData, setWeatherData] = useState({
    city: "",
    temperature: 0,
    feelsLike: "",
    weather: "",
    icon: "",
    humidity: "",
    sunrise: "",
    sunset: "",
    windSpeed: "",
    rain: "",
    visibility: "0",
  });

  const [unit, setUnit] = useState("metric");
  const calculateTemperature = (temperature: number) => {
    return unit === "metric"
      ? Math.round(temperature)
      : Math.round((temperature * 9) / 5 + 32);
  };

  return (
    <>
      <Header></Header>
      <CurrentWeather /* weatherData={weatherData} unit={unit} */
      ></CurrentWeather>
      <Forecast></Forecast>

      <WorldWeather></WorldWeather>
    </>
  );
}

export default App;
