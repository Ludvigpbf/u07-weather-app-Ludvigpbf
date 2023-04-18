import { Link } from "react-router-dom";

export const WorldWeather = () => {
  return (
    <div className="world-weather-container">
      <div className="world-weather-card">
        <Link to="/weather-details" className="weather-details-link">
          <h3>Mon</h3>
          <img src="" alt="" />
          <p>3C</p>
        </Link>
      </div>
    </div>
  );
};
