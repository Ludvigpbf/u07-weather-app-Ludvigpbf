import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ForecastData } from "../../types/types";

import { useLocation } from "../../hooks/useLocation";
import { useForecast } from "../../hooks/useForecast";

export const Forecast = () => {
  const apiUrlConfig = "https://api.openweathermap.org/data/2.5/";
  const { lat, lng, status } = useLocation();
  const apiKey = "f284c39dcce2f6b3cb3d8a9e6f963d5d";
  const apiUrlForecast = `${apiUrlConfig}forecast?lat=${lat}&lon=${lng}&units=metric&appid=${apiKey}`;
  const { data } = useForecast(apiUrlForecast);

  console.log(data);

  return (
    <div className="forecast">
      <h1>Next 5 days</h1>
      <div className="forecast-preview">
        {data.list.map((forecast) => (
          <div key={forecast.dt} className="forcast-card">
            <Link to="/weather-details" className="weather-details-link">
              <h2>{data.city.name}</h2>
              <h3>{forecast.dt_txt}</h3>
              <p>{forecast.main.temp}&#176;C</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
