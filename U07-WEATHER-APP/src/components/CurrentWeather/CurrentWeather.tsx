import { useCurrentTime } from "../../store/dateFunc";
import { useLocation } from "../../hooks/useLocation";
import { useWeather } from "../../hooks/useCurrentWeather";

import { OutletProps, WeatherData } from "../../interfaces/interfaces";
import React from "react";

export const CurrentWeather = ({
  unit,
  setUnit,
  setWeatherData,
  toggleUnit,
}: OutletProps) => {
  const apiUrlConfig = import.meta.env.VITE_API_URL;
  const apiKey = import.meta.env.VITE_API_KEY;
  const { lat, lng, status } = useLocation();

  const apiUrlWeather = `${apiUrlConfig}weather?lat=${lat}&lon=${lng}&units=${unit}&appid=${apiKey}`;
  const weatherData: WeatherData = useWeather(apiUrlWeather);

  const convertWindSpeed = (windSpeed: number, currentUnit: string) => {
    if (currentUnit === "metric") {
      return `${windSpeed} m/s`;
    } else {
      return `${windSpeed} mph`;
    }
  };

  const { time, day, date } = useCurrentTime();

  return (
    <>
      <div className="this-weather">
        <div className="main-info">
          <div className="location-date">
            {status ? <p>Status: {status}</p> : <></>}
            <h2 className="city">{weatherData?.name}</h2>
            <h3>{`${day} ${date} ${time}`}</h3>
          </div>
          <div className="main-temp">
            {weatherData?.weather && (
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                alt={weatherData.weather[0].description}
              />
            )}
            {weatherData?.main && (
              <h2 id="current-temp">
                {Math.round(weatherData.main.temp)}
                {unit === "metric" ? "°C" : "°F"}
              </h2>
            )}
            {/* <div className="max-min-temp">
              <p>{weatherData.main.temp_min}°C</p>
              <p>{weatherData.main.temp_max}°C</p>
            </div> */}
          </div>
        </div>
        <div className="extra-info">
          <div className="column">
            <div className="data-row">
              <p className="description">Feels like:</p>
              {weatherData?.main && weatherData?.main.feels_like && (
                <p className="data">
                  {Math.round(weatherData.main.feels_like)}
                  {unit === "metric" ? "°C" : "°F"}
                </p>
              )}
            </div>
            <hr />
            <div className="data-row">
              <p className="description">Weather:</p>
              <p className="data">{weatherData?.weather?.[0]?.description}</p>
            </div>
            <hr />
            <div className="data-row">
              <p className="description">Humidity:</p>
              {weatherData?.main && weatherData?.main.humidity && (
                <p className="data">{weatherData?.main.humidity}%</p>
              )}
            </div>
            <hr />
            <div className="data-row">
              <p className="description">Visibility:</p>
              <p className="data">
                {(weatherData?.visibility / 1000).toFixed(0)} km
              </p>
            </div>
          </div>
          <div className="column">
            <div className="data-row">
              <p className="description">Sunrise:</p>
              <p className="data">{weatherData?.sys?.sunrise}</p>
            </div>
            <hr />
            <div className="data-row">
              <p className="description">Sunset:</p>
              <p className="data">{weatherData?.sys?.sunset}</p>
            </div>
            <hr />
            <div className="data-row">
              <p className="description">Wind:</p>
              <p className="data">
                {convertWindSpeed(weatherData?.wind?.speed, unit)}
              </p>
            </div>
            <hr />
            <div className="data-row">
              <p className="description">Rain:</p>
              <p className="data">{weatherData?.rain?.["1h"] ?? 0} mm/1h</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
