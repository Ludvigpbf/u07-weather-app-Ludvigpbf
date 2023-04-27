import { useState, useEffect } from "react";
import { WeatherData } from "../interfaces/interfaces";

export const useWeather = (apiUrl: string) => {
  const [weatherData, setWeatherData] = useState({
    city: "",
    temperature: "",
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

  useEffect(() => {
    const getWeatherData = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.main) {
          const sunriseTime = new Date(data.sys.sunrise * 1000);
          const sunsetTime = new Date(data.sys.sunset * 1000);
          const sunriseHours = sunriseTime
            .getHours()
            .toString()
            .padStart(2, "0");
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
            temperature: Math.round(data.main.temp).toString(),
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
      } catch (error) {
        console.log(error);
      }
    };
    getWeatherData();
  }, [apiUrl]);

  return weatherData;
};
