import { useState, useEffect } from "react";

export const useWeather = (apiUrl: string) => {
  const [weatherData, setWeatherData] = useState({
    city: "",
    temperature: "",
    feelsLike: "",
    weather: "",
    humidity: "",
    sunrise: "",
    sunset: "",
    windSpeed: "",
    rain: "",
    visibility: 0,
  });

  useEffect(() => {
    const getWeatherData = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.main) {
          const sunriseTime = new Date(data.sys.sunrise * 1000);
          const sunsetTime = new Date(data.sys.sunset * 1000);
          const visibilityInKm = data.visibility / 1000;
          setWeatherData({
            city: data.name,
            temperature: Math.round(data.main.temp).toString(),
            feelsLike: Math.round(data.main.feels_like).toString(),
            weather: data.weather[0].description,
            humidity: data.main.humidity,
            sunrise: `${sunriseTime.getHours()}:${sunriseTime.getMinutes()}`,
            sunset: `${sunsetTime.getHours()}:${sunsetTime.getMinutes()}`,
            windSpeed: data.wind.speed,
            rain: data.rain?.["1h"] ?? 0,
            visibility: visibilityInKm,
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
