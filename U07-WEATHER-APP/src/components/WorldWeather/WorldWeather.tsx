import { useWorldWeather } from "../../hooks/useWorldWeather";
import { WeatherData, WorldWeatherProps } from "../../interfaces/interfaces";

export const WorldWeather = ({ unit }: WorldWeatherProps) => {
  const weatherData = useWorldWeather({ unit });

  return (
    <div className="world-weather-container">
      {weatherData.map((weather: WeatherData, index: number) => {
        const localTime = new Date(weather.localTime);
        const weekday = localTime.toLocaleDateString("en-US", {
          weekday: "long",
        });
        const date = localTime.toLocaleDateString([], {
          day: "2-digit",
          month: "2-digit",
        });
        const time = localTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        return (
          <div key={index} className="world-weather-card">
            <div className="weather-details-link">
              <h2>{weather.name}</h2>
              <p>
                {weekday} {date}
              </p>
              <p>{time}</p>
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                alt={weather.weather[0].description}
              />
              <h3>
                {Math.round(weather.main.temp)}
                {unit === "metric" ? "°C" : "°F"}
              </h3>
            </div>
          </div>
        );
      })}
    </div>
  );
};
