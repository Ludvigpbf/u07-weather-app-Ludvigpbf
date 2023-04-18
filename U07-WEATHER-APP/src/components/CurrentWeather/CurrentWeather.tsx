import { Link } from "react-router-dom";
import { dateBuilder } from "../../dateFunc";
import { useState, useEffect } from "react";

export const CurrentWeather = () => {
  const apiUrlConfig = "https://api.openweathermap.org/data/2.5/";
  const apiKey = "f284c39dcce2f6b3cb3d8a9e6f963d5d";
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [status, setStatus] = useState("");
  const [city, setCity] = useState("");
  const [temperature, setTemperature] = useState("");
  const apiUrl = `${apiUrlConfig}weather?lat=${lat}&lon=${lng}&units=metric&appid=${apiKey}`;

  console.log(apiUrl);

  useEffect(() => {
    const getLocation = () => {
      if (!navigator.geolocation) {
        setStatus("Geolocation is not supported by your browser!");
      } else {
        setStatus("Loading...");
      }
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus("");
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
    };
    const getCityName = async () => {
      try {
        const response = await fetch(
          `${apiUrlConfig}weather?lat=${lat}&lon=${lng}&units=metric&appid=${apiKey}`
        );
        const data = await response.json();
        setCity(data.name);
        setTemperature(Math.round(data.main.temp).toString());
      } catch (error) {
        console.log(error);
      }
    };

    getLocation();
    getCityName();
  }, [lat, lng]);

  return (
    <>
      <Link to="/weather-details" className="this-weather">
        <div className="location-date">
          {status ? <p>Status: {status}</p> : <></>}
          <h2 className="city">{city}</h2>
          <h3>{dateBuilder(new Date())}</h3>
        </div>
        <div className="temp">
          <h2>{temperature}&#176;C</h2>
        </div>
      </Link>
    </>
  );
};
