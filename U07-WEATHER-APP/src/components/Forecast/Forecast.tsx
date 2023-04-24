import { Link } from "react-router-dom";

import { useLocation } from "../../hooks/useLocation";
import { useForecast } from "../../hooks/useForecast";

export const Forecast = () => {
  const apiUrlConfig = import.meta.env.VITE_API_URL;
  const { lat, lng, status } = useLocation();
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiUrlForecastMetric = `${apiUrlConfig}forecast?lat=${lat}&lon=${lng}&units=metric&units=imperial&appid=${apiKey}`;
  const { data } = useForecast(apiUrlForecastMetric);

  console.log(data);

  return (
    <div className="forecast">
      <h1>Next 5 days</h1>
      <div className="forecast-preview">
        <div className="forecast-card">
          <Link to="/weather-details" className="weather-details-link">
            <h2>city</h2>
            <h3>date and time</h3>
            <p>&#176;C</p>
          </Link>
        </div>
      </div>
    </div>
  );
};
