import { Link } from "react-router-dom";
import { dateBuilder } from "../../dateFunc";
import { useState, useEffect } from "react";
import dotenv from "dotenv";

export const CurrentWeather = () => {
  const apiUrlConfig = "https://api.openweathermap.org/data/2.5/";
  const apiKey = "f284c39dcce2f6b3cb3d8a9e6f963d5d";
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [status, setStatus] = useState("");
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

    getLocation();
  }, []);

  return (
    <>
      <Link to="/weather-details" className="this-weather">
        <div className="location-date">
          {status ? <p>Status: {status}</p> : <></>}
          <p>Latitude: {lat}</p>
          <p>Longitude: {lng}</p>
          <h2>Stockholm</h2>
          <h3>{dateBuilder(new Date())}</h3>
        </div>
        <div className="temp">
          <h2>16C</h2>
        </div>
      </Link>
    </>
  );
};
