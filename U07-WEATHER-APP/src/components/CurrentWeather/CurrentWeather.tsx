import { Link } from "react-router-dom";
import { useCurrentTime } from "../../store/dateFunc";
import { useLocation } from "../../hooks/useLocation";
import { useWeather } from "../../hooks/useCurrentWeather";
import { useForecast } from "../../hooks/useForecast";
import React, { useState } from "react";

export const CurrentWeather = () => {
  const apiUrlConfig = import.meta.env.VITE_API_URL;
  const apiKey = import.meta.env.VITE_API_KEY;
  const { lat, lng, status } = useLocation();
  const [unit, setUnit] = useState("metric");
  const apiUrlWeatherMetric = `${apiUrlConfig}weather?lat=${lat}&lon=${lng}&units=${unit}&appid=${apiKey}`;
  const apiUrlForecastMetric = `${apiUrlConfig}forecast?lat=${lat}&lon=${lng}&units=${unit}&appid=${apiKey}`;

  const weatherData = useWeather(apiUrlWeatherMetric);
  const forecastData = useForecast(apiUrlForecastMetric);
  const today = new Date().toISOString().slice(0, 10);

  const todayForecastData = forecastData.data.list.filter(
    (forecast) => forecast.dt_txt.slice(0, 10) === today
  );

  console.log(todayForecastData);
  const { time, day, date } = useCurrentTime();

  return (
    <>
      <div className="this-weather">
        <div className="main-info">
          <div className="location-date">
            {status ? <p>Status: {status}</p> : <></>}
            <h2 className="city">{weatherData.city}</h2>
            <h3>{`${day} ${date} ${time}`}</h3>
          </div>
          <div className="main-temp">
            <img
              src={`http://openweathermap.org/img/wn/${weatherData.icon}.png`}
              alt={weatherData.weather}
            />
            <h2 id="current-temp">{weatherData.temperature}°C</h2>
            <div className="max-min-temp">
              <p>min: 3°C</p>
              <p>max: 8°C</p>
            </div>
          </div>
        </div>
        <div className="extra-info">
          <div className="column">
            <div className="data-row">
              <p className="description">Feels like:</p>
              <p className="data">{weatherData.feelsLike}°C</p>
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
        <div className="forecast-section">
          {todayForecastData.length > 0 ? (
            <div className="forecast-current-day-card">
              <h3>Todays Forecast</h3>
              <div className="forecast-current-day">
                <table>
                  <thead>
                    <tr>
                      <th>Time</th>
                      <th>Temp</th>
                      <th>Weather</th>
                      <th>Humidity</th>
                      <th>Wind</th>
                      <th>Visibility</th>
                      <th>Rain/3h</th>
                    </tr>
                  </thead>
                  <tbody>
                    {todayForecastData.map((forecast) => (
                      <React.Fragment key={forecast.dt}>
                        <tr>
                          <td>{forecast.dt_txt.slice(11, 16)}</td>
                          <td>{Math.round(forecast.main.temp)}°C</td>
                          <td>
                            <img
                              src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
                              alt={forecast.weather[0].description}
                            />
                          </td>
                          <td>{forecast.main.humidity}%</td>
                          <td>{Math.round(forecast.wind.speed)} m/s</td>
                          <td>{forecast.visibility / 1000} km</td>
                          <td>
                            {forecast.rain ? `${forecast.rain["3h"]} mm` : "0"}
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={7}>
                            <hr />
                          </td>
                        </tr>
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <p>No forecast data available for today.</p>
          )}
        </div>
      </div>
    </>
  );
};
