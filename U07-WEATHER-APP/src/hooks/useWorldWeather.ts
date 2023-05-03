import { useState, useEffect } from "react";
import { OutletProps, WeatherData } from "../interfaces/interfaces";

export const useWorldWeather = ({ unit }: OutletProps) => {
  const apiUrlConfig = import.meta.env.VITE_API_URL;
  const apiKey = import.meta.env.VITE_API_KEY;
  const cities = [
    { name: "London", country: "uk", lat: 51.5074, lon: -0.1278 },
    { name: "New York", country: "us", lat: 40.7128, lon: -74.006 },
    { name: "Paris", country: "fr", lat: 48.8566, lon: 2.3522 },
    { name: "Berlin", country: "de", lat: 52.52, lon: 13.405 },
    { name: "Dubai", country: "uae", lat: 25.2048, lon: 55.2708 },
    { name: "Tokyo", country: "jp", lat: 35.6762, lon: 139.6503 },
  ];

  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const getApiUrlWeather = (city: {
    name: string;
    country: string;
    lat: number;
    lon: number;
  }) => {
    return `${import.meta.env.VITE_API_URL}weather?q=${city.name},${
      city.country
    }&units=${unit}&appid=${apiKey}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const weatherData = await Promise.all(
          cities.map(async (city) => {
            const apiUrlWeather = getApiUrlWeather(city);
            const response = await fetch(apiUrlWeather);
            const data = await response.json();
            if (data.cod === 200) {
              const timezoneOffsetInSeconds = data.timezone;
              const localTimeInMilliseconds =
                Date.now() + timezoneOffsetInSeconds * 1000;
              const localTime = new Date(localTimeInMilliseconds);
              const formattedLocalTime = localTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              });
              const formattedLocalDate = localTime.toLocaleDateString([], {
                day: "2-digit",
                month: "2-digit",
              });
              data.localTime = `${localTime.toLocaleDateString("en-US", {
                weekday: "long",
              })} ${formattedLocalDate} ${formattedLocalTime}`;
              return data;
            } else {
              throw new Error(data.message);
            }
          })
        );
        setWeatherData(weatherData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [unit]);
  console.log(unit);
  return weatherData;
};

export default useWorldWeather;
