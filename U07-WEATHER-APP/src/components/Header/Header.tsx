import { Link } from "react-router-dom";
import { Search } from "../Search/Search";

export const Header = () => {
  return (
    <nav>
      <div className="logo">
        <h1>WeatherMate</h1>
      </div>
      <Search></Search>
      <div className="menu">
        <Link to="app" className="menu-link">
          Home
        </Link>{" "}
        <Link to="about" className="menu-link">
          About
        </Link>
      </div>
    </nav>
  );
};
