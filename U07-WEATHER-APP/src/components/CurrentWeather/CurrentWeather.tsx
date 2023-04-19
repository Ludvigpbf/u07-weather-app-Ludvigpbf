import { Link } from "react-router-dom";
import { dateBuilder } from "../../dateFunc";
import { useState, useEffect } from "react";
import { useLocation } from "../../hooks/useLocation";
import { useWeather } from "../../hooks/useWeather";

export const CurrentWeather = () => {
  const apiUrlConfig = "https://api.openweathermap.org/data/2.5/";
  const apiKey = "f284c39dcce2f6b3cb3d8a9e6f963d5d";
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
        </div>
      </Link>
    </>
  );
};
