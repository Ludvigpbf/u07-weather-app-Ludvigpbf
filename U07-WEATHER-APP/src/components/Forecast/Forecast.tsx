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
    const date = getCurrentDate(item.dt_txt.split(" ")[0]);
    const time = getCurrentTime(item.dt_txt.split(" ")[1]);
    if (!groupedData[date]) {
      groupedData[date] = [];
    }
    groupedData[date].push({ ...item, time });
  });

  function getCurrentDate(date: string) {
    const d = new Date(date);
    const month = (d.getMonth() + 1).toString();
    const todaysDate = d.getDate().toString().padStart(2, "0");
    return `${todaysDate}/${month}`;
  }

  function getCurrentTime(time: string) {
    const [hours, minutes] = time.split(":");
    return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`;
  }

  return (
    <div className="forecast">
      <h1>Next 5 days</h1>
      <div className="forecast-preview">
        {Object.entries(groupedData).map(([date, forecasts]) => (
          <div className="forecast-card" key={date}>
            <Link to="/weather-details" className="weather-details-link">
              <h2>{data.city.name}</h2>
              <h3>{date}</h3>

              {forecasts.map((forecast) => (
                <div className="forecast-temp" key={forecast.dt}>
                  <p>{forecast.time}</p>
                  <span>-</span>
                  <p>{Math.round(forecast.main.temp)}&#176;C</p>
                </div>
              ))}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
