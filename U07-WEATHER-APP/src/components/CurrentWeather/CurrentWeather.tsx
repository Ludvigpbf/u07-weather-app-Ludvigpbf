import { Link } from "react-router-dom";
import { dateBuilder } from "../../dateFunc";
export const CurrentWeather = () => {
  return (
    <>
      <Link to="/weather-details" className="this-weather">
        <div className="location-date">
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
