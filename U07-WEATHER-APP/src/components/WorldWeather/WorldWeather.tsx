import { Link } from "react-router-dom";

import { useWorldWeather } from "../../hooks/useWorldWeather";
import { WeatherData } from "../../interfaces/interfaces";

export const WorldWeather = () => {
  const weatherData = useWorldWeather();
  console.log(weatherData);

  return (
    <div className="world-weather-container">
      {weatherData.map((weather: WeatherData, index: number) => (
        <div key={index} className="world-weather-card">
          <Link to="/weather-details" className="weather-details-link">
            <h2>{weather.name}</h2>
            <h3>{`${weather.localTime}`}</h3>
            <img
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
              alt={weather.weather[0].description}
            />
            <p>{Math.round(weather.main.temp)}°C</p>
          </Link>
        </div>
      ))}
    </div>
  );
};
