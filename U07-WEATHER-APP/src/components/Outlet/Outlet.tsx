import { OutletProps } from "../../interfaces/interfaces";
import { CurrentWeather } from "../CurrentWeather/CurrentWeather";
import { Forecast } from "../Forecast/Forecast";
import { WorldWeather } from "../WorldWeather/WorldWeather";

export const Outlet = ({
  unit,
  setUnit,
  weatherData,
  setWeatherData,
  forecastData,
  toggleUnit,
}: OutletProps) => {
  return (
    <>
      <CurrentWeather
        unit={unit}
        setUnit={setUnit}
        weatherData={weatherData}
        setWeatherData={setWeatherData}
        forecastData={forecastData}
        toggleUnit={toggleUnit}
      ></CurrentWeather>
      <Forecast
        unit={unit}
        setUnit={setUnit}
        weatherData={weatherData}
        setWeatherData={setWeatherData}
        forecastData={forecastData}
        toggleUnit={toggleUnit}
      ></Forecast>
      <WorldWeather unit={unit}></WorldWeather>
    </>
  );
};
