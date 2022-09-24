import { Link, Navigate } from "react-router-dom";
import { BsMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import { useState } from "react";
import "./navbar.css";
const Navbar = ({ darkMode }) => {
  return (
    <>
      <div className="navbar flex justify-between items-center bg-blue-500 p-3">
        <div className="flex">
          <h1>BookMark</h1>
        </div>
        <div className="flex justify-between items-start space-x-7 p-2">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/login">Login</Link>
          <Link to="/logout">Logout</Link>
          <Link to="/register">Register</Link>
        </div>
        {/* Set DarkMode */}
        <button
          onClick={darkMode}
          className="px-1 m-1 rounded-lg  border-2 border-blue-500 hover:bg-white hover:text-blue-500 text-white bg-blue "
        >
          DarkMode
        </button>
        {/* Set DarkMode */}
        {/* <DarkMode /> */}
      </div>
    </>
  );
};
export default Navbar;

function DarkMode() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div id="darkmode" className="scale-50 justify-center items-center ">
      <input
        type="checkbox"
        className="checkbox"
        id="checkbox"
        onChange={darkMode}
      />
      <label htmlFor="checkbox" className="label">
        <BsMoonStarsFill color="white" />
        <BsFillSunFill color="yellow" />
        <div className="ball"></div>
      </label>
    </div>
  );
}
