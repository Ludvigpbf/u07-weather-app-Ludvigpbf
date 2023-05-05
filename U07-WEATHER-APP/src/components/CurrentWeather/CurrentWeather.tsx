import { useCurrentTime } from "../../store/dateFunc";
import { useLocation } from "../../hooks/useLocation";
import { useWeather } from "../../hooks/useCurrentWeather";
import { useForecast } from "../../hooks/useForecast";
import { OutletProps, WeatherData } from "../../interfaces/interfaces";

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
  const apiUrlForecast = `${apiUrlConfig}forecast?lat=${lat}&lon=${lng}&units=${unit}&appid=${apiKey}`;

  const weatherData: WeatherData = useWeather(apiUrlWeather);
  console.log(weatherData);
  const forecastData = useForecast(apiUrlForecast);
  console.log(forecastData);
  const today = new Date().toISOString().slice(0, 10);

  const todayForecastData = forecastData.data.list.filter(
    (forecast: { dt_txt: string }) => forecast.dt_txt.slice(0, 10) === today
  );
  const convertWindSpeed = (windSpeed: number, currentUnit: string) => {
    if (currentUnit === "metric") {
      return `${windSpeed} m/s`;
    } else {
      return `${windSpeed} mph`;
    }
  };

  console.log(todayForecastData);
  const { time, day, date } = useCurrentTime();
  console.log(unit);
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
            <div className="max-min-temp">
              <p>{weatherData.main.temp_min}°C</p>
              <p>{weatherData.main.temp_max}°C</p>
            </div>
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
        {/* <div className="forecast-section">
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
                    {todayForecastData.map(
                      (forecast: {
                        dt: React.Key | null | undefined;
                        dt_txt: string | any[];
                        main: {
                          temp: number;
                          humidity:
                            | string
                            | number
                            | boolean
                            | React.ReactElement<
                                any,
                                string | React.JSXElementConstructor<any>
                              >
                            | React.ReactFragment
                            | React.ReactPortal
                            | null
                            | undefined;
                        };
                        weather: { description: string | undefined }[];
                        wind: { speed: number };
                        visibility: number;
                        rain: { [x: string]: any };
                      }) => (
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
                              {forecast.rain
                                ? `${forecast.rain["3h"]} mm`
                                : "0"}
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={7}>
                              <hr />
                            </td>
                          </tr>
                        </React.Fragment>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <p>No forecast data available for today.</p>
          )}
        </div> */}
      </div>
    </>
  );
};
/* function setUnit(arg0: string) {
  throw new Error("Function not implemented.");
} */
