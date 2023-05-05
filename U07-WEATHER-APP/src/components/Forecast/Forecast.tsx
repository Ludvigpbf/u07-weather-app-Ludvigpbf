import { Link } from "react-router-dom";
import { useLocation } from "../../hooks/useLocation";
import { useForecast } from "../../hooks/useForecast";
import { ForecastData, OutletProps } from "../../interfaces/interfaces";

export const Forecast = ({
  unit,
  setUnit,
  weatherData,
  calculateTemperature,
  setWeatherData,
  forecastData,
  toggleUnit,
}: OutletProps) => {
  const apiUrlConfig = import.meta.env.VITE_API_URL;
  const { lat, lng, status } = useLocation();
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiUrlForecast = `${apiUrlConfig}forecast?lat=${lat}&lon=${lng}&units=${unit}&appid=${apiKey}`;
  const { data } = useForecast(apiUrlForecast);

  const groupedData: { [key: string]: ForecastData["list"] } = {};

  data.list.forEach((item) => {
    const date = getCurrentDate(item.dt_txt.split(" ")[0]);
    const time = getCurrentTime(item.dt_txt.split(" ")[1]);
    const itemDate = new Date(item.dt_txt);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const nextFourDays = new Date(today.getTime() + 4 * 24 * 60 * 60 * 1000);

    if (itemDate >= today && itemDate <= nextFourDays) {
      if (!groupedData[date]) {
        groupedData[date] = [];
      }
      groupedData[date].push({ ...item, time });
    }
  });

  const forecastDates = Object.keys(groupedData);

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
      <h1>Forecast for {data.city.name}</h1>
      <div className="forecast-preview">
        {forecastDates.map((date) => (
          <div className="forecast-card" key={date}>
            <div className="weather-details-link">
              <h2>{data.city.name}</h2>
              <h3>{date}</h3>
              <div className="forecast-descriptions">
                <h4>Time:</h4>
                <h4>Temp:</h4>
                <h4>Weather:</h4>
              </div>
              {groupedData[date].map((forecast) => (
                <div className="forecast-info" key={forecast.dt}>
                  <p>{forecast.time}</p>
                  <p>
                    {Math.round(forecast.main.temp)}
                    {unit === "metric" ? "°C" : "°F"}
                  </p>
                  <img
                    src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
                    alt={forecast.weather[0].description}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
