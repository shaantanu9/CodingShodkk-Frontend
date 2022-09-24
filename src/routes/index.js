import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import PrivateRoute from "./PrivateRoute";
import Logout from "../pages/Logout";
import Register from "../pages/Register";
const token = localStorage.getItem("token");

const routesArray = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: (
      <PrivateRoute>
        <Login />
      </PrivateRoute>
    ),
  },
  {
    path: "/logout",
    element: <Logout />,
  },
];

function RoutesLink() {
  return (
    <Routes>
      {routesArray.map((route) => (
        <Route
          key={route.path}
          exact
          path={route.path}
          element={route.element}
        />
      ))}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default RoutesLink;
