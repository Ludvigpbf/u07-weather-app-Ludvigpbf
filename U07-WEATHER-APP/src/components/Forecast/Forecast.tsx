import { Link } from "react-router-dom";

import { useLocation } from "../../hooks/useLocation";
import { useForecast } from "../../hooks/useForecast";

import { ForecastData } from "../../interfaces/interfaces";

export const Forecast = () => {
  const apiUrlConfig = import.meta.env.VITE_API_URL;
  const { lat, lng, status } = useLocation();
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiUrlForecastMetric = `${apiUrlConfig}forecast?lat=${lat}&lon=${lng}&units=metric&units=imperial&appid=${apiKey}`;
  const { data } = useForecast(apiUrlForecastMetric);

  const groupedData: { [key: string]: ForecastData["list"] } = {};

  data.list.forEach((item) => {
    const date = item.dt_txt.split(" ")[0];
    if (!groupedData[date]) {
      groupedData[date] = [];
    }
    groupedData[date].push(item);
  });

  console.log(data);

  return (
    <div className="forecast">
      <h1>Next 5 days</h1>
      <div className="forecast-preview">
        {Object.entries(groupedData).map(([date, forecasts]) => (
          <div className="forecast-card" key={date}>
            <h2>{data.city.name}</h2>
            <h3>{date}</h3>
            {forecasts.map((forecast) => (
              <Link
                to="/weather-details"
                className="weather-details-link"
                key={forecast.dt}
              >
                <p>{forecast.main.temp}&#176;C</p>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
