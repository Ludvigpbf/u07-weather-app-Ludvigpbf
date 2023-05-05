import { Link } from "react-router-dom";
import { Search } from "../Search/Search";
import { OutletProps } from "../../interfaces/interfaces";
import logo from "../../images/mate.png";

export const Header = ({
  unit,
  setUnit,
  weatherData,
  setWeatherData,
  forecastData,
  toggleUnit,
}: OutletProps) => {
  console.log(unit);
  return (
    <nav>
      <div className="logo">
        <Link to="/" className="menu-link">
          WeatherMate <img src={logo} alt="logo" />
        </Link>
      </div>
      <Search
        unit={unit}
        setUnit={setUnit}
        weatherData={weatherData}
        setWeatherData={setWeatherData}
        forecastData={forecastData}
        toggleUnit={toggleUnit}
      ></Search>
      <div className="menu">
        <Link to="/" className="menu-link">
          Home
        </Link>
        <Link to="/about" className="menu-link">
          About
        </Link>
      </div>
    </nav>
  );
};
