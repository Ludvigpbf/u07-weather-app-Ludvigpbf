import React, { useState } from "react";

export const Search = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (evt: React.KeyboardEvent) => {
    if (evt.key === "Enter") {
      fetch("${api.base}weather?q=${query}&appid=${api.key}&units=metric")
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  };

  return (
    <form action="">
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Enter a city.."
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        onKeyDown={search}
      />
      <button type="submit">
        <span className="material-symbols-outlined">send</span>
      </button>
    </form>
  );
};
