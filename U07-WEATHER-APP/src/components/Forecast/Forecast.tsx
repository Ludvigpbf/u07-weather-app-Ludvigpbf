import { Link } from "react-router-dom";

export const Forecast = () => {
  return (
    <div className="forecast">
      <h1>Next 5 days</h1>
      <div className="forecast-preview">
        <div className="forcast-card">
          <Link to="/weather-details" className="weather-details-link">
            <h3>Mon</h3>
            <img src="" alt="" />
            <p>3C</p>
          </Link>
        </div>
        <div className="forcast-card">
          <Link to="/weather-details" className="weather-details-link">
            <h3>Mon</h3>
            <img src="" alt="" />
            <p>3C</p>
          </Link>
        </div>
        <div className="forcast-card">
          <Link to="/weather-details" className="weather-details-link">
            <h3>Mon</h3>
            <img src="" alt="" />
            <p>3C</p>
          </Link>
        </div>
        <div className="forcast-card">
          <Link to="/weather-details" className="weather-details-link">
            <h3>Mon</h3>
            <img src="" alt="" />
            <p>3C</p>
          </Link>
        </div>
        <div className="forcast-card">
          <Link to="/weather-details" className="weather-details-link">
            <h3>Mon</h3>
            <img src="" alt="" />
            <p>3C</p>
          </Link>
        </div>
      </div>
    </div>
  );
};
