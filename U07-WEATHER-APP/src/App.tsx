import { ReactNode, useState, useEffect } from "react";
import { CurrentWeather } from "./components/CurrentWeather/CurrentWeather";
import { Forecast } from "./components/Forecast/Forecast";
import { Search } from "./components/Search/Search";

function App() {
  return (
    <>
      <CurrentWeather></CurrentWeather>
      <Forecast></Forecast>
    </>
  );
}

export default App;
