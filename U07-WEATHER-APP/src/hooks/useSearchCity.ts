import { useState } from "react";

export const useSearchCity = (evt: React.KeyboardEvent) => {
  const apiUrlConfig = import.meta.env.VITE_API_URL;
  const apiKey = import.meta.env.VITE_API_KEY;
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const apiUrlSearch = `${apiUrlConfig}weather?q=${query}&appid=${apiKey}`;
  if (evt.key === "Enter") {
    fetch(apiUrlSearch)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
        setQuery("");
        console.log(result);
      });
  }
  console.log(apiUrlSearch);
};
