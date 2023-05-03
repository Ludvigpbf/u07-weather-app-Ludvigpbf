import { useState, useEffect } from "react";
import { WeatherData } from "../interfaces/interfaces";

export const useWeather = (apiUrl: string) => {
  const [weatherData, setWeatherData] = useState<WeatherData>(
    {} as WeatherData
  );

  useEffect(() => {
    const getWeatherData = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.main) {
          const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString(
            [],
            { hour: "2-digit", minute: "2-digit" }
          );
          const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString(
            [],
            { hour: "2-digit", minute: "2-digit" }
          );
          setWeatherData({
            id: data.id,
            timezone: data.timezone,
            cod: data.cod,
            coord: {
              lon: data.coord.lon,
              lat: data.coord.lat,
            },
            weather: data.weather,
            base: data.base,
            main: {
              temp: data.main.temp,
              feels_like: data.main.feels_like,
              pressure: data.main.pressure,
              humidity: data.main.humidity,
              temp_min: data.main.temp_min,
              temp_max: data.main.temp_max,
              sea_level: data.main.sea_level,
              grnd_level: data.main.grnd_level,
            },
            visibility: data.visibility ?? 0,
            wind: {
              speed: data.wind.speed,
              deg: data.wind.deg,
              gust: data.wind.gust,
            },
            clouds: {
              all: data.clouds.all,
            },
            rain: {
              "1h": data.rain?.["1h"] ?? 0,
              "3h": data.rain?.["3h"] ?? 0,
            },
            snow: {
              "1h": data.snow?.["1h"] ?? 0,
              "3h": data.snow?.["3h"] ?? 0,
            },
            dt: data.dt,
            sys: {
              type: data.sys.type,
              id: data.sys.id,
              message: data.sys.message,
              country: data.sys.country,
              sunrise: sunrise,
              sunset: sunset,
            },
            name: "",
            localTime: "",
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
