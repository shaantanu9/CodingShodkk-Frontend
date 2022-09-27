import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Backend URL from .env file
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
console.log("BACKEND_URL from LoginPage", BACKEND_URL);

const getToken = localStorage.getItem("token");
const Login = () => {
  const Navigate = useNavigate();
  const [token, setToken] = useState(getToken);
  const [tokenError, setTokenError] = useState(null);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(8, "Must be 8 characters or more")
        .required("Required"),
    }),
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      console.log("values", values);
      loginUser(values);
    },
  });

  //Login User
  const loginUser = async (values) => {
    function postData(url) {
      return axios
        .post(url, values)
        .then((res) => {
          console.log("res", res);
          setToken(res.data.token);
          localStorage.setItem("token", res.data.token);
          //   redirect to home page
          return Navigate("/");
        })
        .catch((err) => {
          console.log("err", err.response);
          setTokenError(err.response.data.message);
        });
    }
    postData(`${BACKEND_URL}/users/login`);
  };

  // form inputs alignment styles
  const formStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <>
      <div className="flex justify-center items-center mt-3 bg-fuchsia-200 w-full h-[500px]">
        <form
          onSubmit={formik.handleSubmit}
          style={formStyle}
          // className="flex flex-col justify-center items-center md:scale-125 space-y-4 mt-6"
        >
          <div className="flex justify-center items-center space-x-3">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              className="border-2 rounded-md pl-2"
            />
            {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="flex justify-center items-center space-x-3">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              className="border-2 rounded-md pl-2"
            />
            {formik.touched.password && formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}
          </div>
          <div className="flex justify-center items-center space-x-3">
            <input
              className="bg-blue-500 text-white rounded-md p-1"
              type="submit"
              onClick={formik.handleSubmit}
              value="Submit"
            />
          </div>
        </form>
        {
          // if token error is true then show error message
          tokenError && (
            <div className="text-red-500">
              <p>{tokenError}</p>
            </div>
          )
        }
      </div>
    </>
  );
};

export default Login;
