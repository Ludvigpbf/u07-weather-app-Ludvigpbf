import { Link } from "react-router-dom";
import { dateBuilder } from "../../dateFunc";
import { useLocation } from "../../hooks/useLocation";
import { useWeather } from "../../hooks/useWeather";

export const CurrentWeather = () => {
  const apiUrlConfig = import.meta.env.VITE_API_URL;
  const apiKey = import.meta.env.VITE_API_KEY;
  const { lat, lng, status } = useLocation();
  const apiUrlWeather = `${apiUrlConfig}weather?lat=${lat}&lon=${lng}&units=metric&appid=${apiKey}`;
  const apiUrlForecast = `${apiUrlConfig}forecast?lat=${lat}&lon=${lng}&units=metric&appid=${apiKey}`;

  const weatherData = useWeather(apiUrlWeather);
  const forecastData = useWeather(apiUrlForecast);

  console.log(apiUrlWeather);
  console.log(apiUrlForecast);

  return (
    <>
      <Link to="/weather-details" className="this-weather">
        <div className="location-date">
          {status ? <p>Status: {status}</p> : <></>}
          <h2 className="city">{weatherData.city}</h2>
          <h3>{dateBuilder(new Date())}</h3>
        </div>
        <div className="temp">
          <h2>{weatherData.temperature}&#176;C</h2>
          <p>Feels like: {weatherData.feelsLike}&#176;C</p>
          <p>Weather: {weatherData.weather}</p>
          <p>Humidity: {weatherData.humidity}%</p>
          <p>Sunrise: {weatherData.sunrise}</p>
          <p>Sunset: {weatherData.sunset}</p>
          <p>Wind: {weatherData.windSpeed} m/s</p>
        </div>
      </Link>
    </>
  );
};
