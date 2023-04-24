import React, { useState } from "react";
import { WeatherData } from "../../interfaces/interfaces";

export const Search = () => {
  const apiUrlConfig = import.meta.env.VITE_API_URL;
  const apiKey = import.meta.env.VITE_API_KEY;

  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);

  const useSearchCity = (evt: React.KeyboardEvent) => {
    evt.preventDefault();
    const apiUrlSearch = `${apiUrlConfig}weather?q=${query}&appid=${apiKey}`;
    console.log("apiUrlSearch:", apiUrlSearch);
    if (evt.key === "Enter") {
      console.log(apiUrlSearch);
      fetch(apiUrlSearch)
        .then((res) => res.json())
        .then((result: WeatherData) => {
          setWeather(result);
          setQuery("");
          console.log("result:", result);
        })
        .catch((error) => console.log("error:", error));
    }
  };

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Enter a city.."
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          onKeyDown={useSearchCity}
        />
        <button type="submit">
          <span className="material-symbols-outlined">send</span>
        </button>
      </form>

      <div>
        <p></p>
      </div>
    </>
  );
};
