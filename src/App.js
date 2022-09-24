import { useState } from "react";
import Navbar from "./pages/Navbar";
import RoutesLink from "./routes"; //importing the Routes component
const darkModeLocalStorage = JSON.parse(localStorage.getItem("darkMode"));
function App() {
  // style for dark mode
  let style = {
    backgroundColor: "#1a202c",
    color: "white",
  };
  const [darkMode, setDarkMode] = useState(darkModeLocalStorage);
  const darkModeHandler = () => {
    setDarkMode(!darkMode);
    console.log("darkMode", darkMode);
    localStorage.setItem("darkMode", JSON.stringify(!darkMode));
  };
  style = darkMode ? style : {};
  return (
    <div className="App" style={style}>
      <Navbar darkMode={darkModeHandler} />
      <RoutesLink />
    </div>
  );
}

export default App;
