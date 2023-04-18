import { ReactNode, useState, useEffect } from "react";
import { CurrentWeather } from "./components/CurrentWeather/CurrentWeather";
import { Forecast } from "./components/Forecast/Forecast";
import { Search } from "./components/Search/Search";

function App() {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);

  /* useEffect(() => {
    navigator.geolocation.getCurrentPosition(function(position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });

    console.log("Latitude is:", lat)
    console.log("Longitude is:", long)
  }, [lat, long]); */

  return (
    <>
      <CurrentWeather></CurrentWeather>
      <Forecast></Forecast>
    </>
  );
}

export default App;
