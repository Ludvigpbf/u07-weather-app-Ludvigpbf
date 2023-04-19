import { useState, useEffect } from "react";
import { WeatherData } from "../interfaces/interfaces";

export const useWorldWeather = () => {
  const apiUrlConfig = import.meta.env.VITE_API_URL;
  const apiKey = import.meta.env.VITE_API_KEY;
  const cities = [
    "London, uk",
    "New york, us",
    "Paris, fr",
    "Berlin, de",
    "Dubai, uae",
    "Tokyo, jp",
  ];

  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const data = await Promise.all(
          cities.map(async (city) => {
            const apiUrlWeather = `${apiUrlConfig}weather?q=${city}&units=metric&appid=${apiKey}`;
            const response = await fetch(apiUrlWeather);
            return response.json();
          })
        );
        setWeatherData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchWeatherData();
  }, []);

  return weatherData;
};

export default useWorldWeather;
