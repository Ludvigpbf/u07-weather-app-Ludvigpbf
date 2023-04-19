import { useState, useEffect } from "react";

export const useWeather = (apiUrl: string) => {
  const [weatherData, setWeatherData] = useState({
    city: "",
    temperature: "",
    feelsLike: "",
    weather: "",
  });

  useEffect(() => {
    const getWeatherData = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.main) {
          setWeatherData({
            city: data.name,
            temperature: Math.round(data.main.temp).toString(),
            feelsLike: Math.round(data.main.feels_like).toString(),
            weather: data.weather[0].description,
          });
        }
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getWeatherData();
  }, [apiUrl]);

  return weatherData;
};
