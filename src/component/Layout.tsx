import React from "react";
import { Link } from "react-router-dom";
import "./layout.css";
const Layout = () => {
  return (
    <div>
      <header className="header">
        <div className="logo">
          <Link to="/">Weather App</Link>
        </div>
        <nav className="navigation">
          <ul>
            <li>
              <Link to="/allweather">All Weather Info</Link>

              <Link to="/addWeather">Add Weather Info</Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Layout;
