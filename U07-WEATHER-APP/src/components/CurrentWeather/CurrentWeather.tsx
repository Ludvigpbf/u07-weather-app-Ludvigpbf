import { Link } from "react-router-dom";
import { useCurrentTime } from "../../dateFunc";
import { useLocation } from "../../hooks/useLocation";
import { useWeather } from "../../hooks/useWeather";

export const CurrentWeather = () => {
  const apiUrlConfig = import.meta.env.VITE_API_URL;
  const apiKey = import.meta.env.VITE_API_KEY;
  const { lat, lng, status } = useLocation();
  const apiUrlWeather = `${apiUrlConfig}weather?lat=${lat}&lon=${lng}&units=metric&appid=${apiKey}`;
  const apiUrlForecast = `${apiUrlConfig}forecast?lat=${lat}&lon=${lng}&units=metric&appid=${apiKey}`;

  const weatherData = useWeather(apiUrlWeather);
  const { time, day, date } = useCurrentTime();

  console.log(apiUrlWeather);
  console.log(apiUrlForecast);

  return (
    <>
      <Link to="/weather-details" className="this-weather">
        <div className="main-info">
          <div className="location-date">
            {status ? <p>Status: {status}</p> : <></>}
            <h2 className="city">{weatherData.city}</h2>
            <h3>{`${day} ${date} ${time}`}</h3>
          </div>
          <div className="main-temp">
            <h2 id="current-temp">{weatherData.temperature}&#176;C</h2>
          </div>
        </div>
        <div className="extra-info">
          <div className="column">
            <div className="data-row">
              <p className="description">Feels like:</p>
              <p className="data">{weatherData.feelsLike}&#176;C</p>
            </div>
            <hr />
            <div className="data-row">
              <p className="description">Weather:</p>
              <p className="data">{weatherData.weather}</p>
            </div>
            <hr />
            <div className="data-row">
              <p className="description">Humidity:</p>
              <p className="data">{weatherData.humidity}%</p>
            </div>
            <hr />
            <div className="data-row">
              <p className="description">Visibility:</p>
              <p className="data">{weatherData.visibility}km</p>
            </div>
          </div>
          <div className="column">
            <div className="data-row">
              <p className="description">Sunrise:</p>
              <p className="data">{weatherData.sunrise}</p>
            </div>
            <hr />
            <div className="data-row">
              <p className="description">Sunset:</p>
              <p className="data">{weatherData.sunset}</p>
            </div>
            <hr />
            <div className="data-row">
              <p className="description">Wind:</p>
              <p className="data">{weatherData.windSpeed} m/s</p>
            </div>
            <hr />
            <div className="data-row">
              <p className="description">Rain:</p>
              <p className="data">{weatherData.rain} mm/1h</p>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};
