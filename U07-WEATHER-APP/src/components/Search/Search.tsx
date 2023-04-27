import React, { useState } from "react";
import { WeatherData } from "../../interfaces/interfaces";

export const Search = () => {
  const apiUrlConfig = import.meta.env.VITE_API_URL;
  const apiKey = import.meta.env.VITE_API_KEY;

  const [query, setQuery] = useState("");
  /*  const [weather, setWeather] = useState<WeatherData | null>(null); */
  const [unit, setUnit] = useState("metric");

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

  const calculateTemperature = (temperature: number) => {
    return unit === "metric"
      ? Math.round(temperature)
      : Math.round((temperature * 9) / 5 + 32);
  };

  const useSearchCity = async (evt: React.KeyboardEvent | React.FormEvent) => {
    evt.preventDefault();
    const apiUrlSearch = `${apiUrlConfig}weather?q=${query}&units=${unit}&appid=${apiKey}`;
    console.log("apiUrlSearch:", apiUrlSearch);

    try {
      const response = await fetch(apiUrlSearch);
      const data = await response.json();
      if (data.main) {
        /* setWeather(result); */

        const sunriseTime = new Date(data.sys.sunrise * 1000);
        const sunsetTime = new Date(data.sys.sunset * 1000);
        const sunriseHours = sunriseTime.getHours().toString().padStart(2, "0");
        const sunriseMinutes = sunriseTime
          .getMinutes()
          .toString()
          .padStart(2, "0");
        const sunsetHours = sunsetTime.getHours().toString().padStart(2, "0");
        const sunsetMinutes = sunsetTime
          .getMinutes()
          .toString()
          .padStart(2, "0");
        const visibilityInKm = (data.visibility ?? 0) / 1000;
        setWeatherData({
          city: data.name,
          temperature: Math.round(data.main.temp),
          feelsLike: Math.round(data.main.feels_like).toString(),
          weather: data.weather[0].description,
          humidity: data.main.humidity.toString(),
          sunrise: `${sunriseHours}:${sunriseMinutes}`,
          sunset: `${sunsetHours}:${sunsetMinutes}`,
          windSpeed: data.wind.speed.toString(),
          rain: (data.rain?.["1h"] ?? 0).toString(),
          visibility: visibilityInKm.toFixed(2),
          icon: data.weather[0].icon,
        });
      }
      setQuery("");
    } catch (error) {
      console.log(error);
    }
    console.log(weatherData);
  };

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === "metric" ? "imperial" : "metric"));
  };

  return (
    <>
      <form onSubmit={useSearchCity}>
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Enter a city.."
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />
        <button type="submit">
          <span className="material-symbols-outlined">send</span>
        </button>
      </form>

      <div className="toggle-button">
        <button onClick={toggleUnit}>{unit === "metric" ? "°C" : "°F"}</button>
        <p>
          {weatherData &&
            `${calculateTemperature(weatherData.temperature)} ${
              unit === "metric" ? "°C" : "°F"
            }`}
        </p>
      </div>
    </>
  );
};
