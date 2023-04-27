import { Link } from "react-router-dom";
import { Search } from "../Search/Search";

export const Header = () => {
  return (
    <nav>
      <div className="logo">
        <Link to="/" className="menu-link">
          WeatherMate <img src="src/images/Group 13.png" alt="logo" />
        </Link>
      </div>
      <Search></Search>
      <div className="menu">
        <Link to="/" className="menu-link">
          Home
        </Link>
        <Link to="about" className="menu-link">
          About
        </Link>
      </div>
    </nav>
  );
};
