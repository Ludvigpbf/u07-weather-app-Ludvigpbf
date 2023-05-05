import React, { useState } from "react";

import { OutletProps } from "../../interfaces/interfaces";
import { Link } from "react-router-dom";

export const Search = ({
  unit,
  setUnit,
  weatherData,
  setWeatherData,
  forecastData,
  toggleUnit,
}: OutletProps) => {
  const apiUrlConfig = import.meta.env.VITE_API_URL;
  const apiKey = import.meta.env.VITE_API_KEY;

  const [query, setQuery] = useState("");
  console.log(unit);
  const useSearchCity = async (evt: React.KeyboardEvent | React.FormEvent) => {
    evt.preventDefault();
    const apiUrlSearch = `${apiUrlConfig}weather?q=${query}&units=${unit}&appid=${apiKey}`;
    try {
      const response = await fetch(apiUrlSearch);
      const data = await response.json();
      if (data.main) {
        const sunriseTime = new Date(data.sys.sunrise * 1000);
        const sunsetTime = new Date(data.sys.sunset * 1000);
        const sunriseHours = sunriseTime.getHours().toString().padStart(2, "0");
        const sunriseMinutes = sunriseTime
          .getMinutes()
          .toString()
          .padStart(2, "0");
        const sunsetHours = sunsetTime.getHours().toString().padStart(2, "0");
        const sunsetMinutes = sunsetTime
          .getMinutes()
          .toString()
          .padStart(2, "0");
        const visibilityInKm = (data.visibility ?? 0) / 1000;
      }
      setQuery("");
    } catch (error) {
      console.log(error);
    }
    console.log(weatherData);
  };

  /*  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    useSearchCity(event);
  };
 */
  return (
    <>
      {/* <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Enter a city.."
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />
        <Link to={`/searched-city?query=${query}`}>
          <button type="submit">
            <span className="material-symbols-outlined">send</span>
          </button>
        </Link>
      </form>
 */}
      <div className="toggle-button">
        <button onClick={toggleUnit}>{unit === "metric" ? "°F" : "°C"}</button>
      </div>
    </>
  );
};
