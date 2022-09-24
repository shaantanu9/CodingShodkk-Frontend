import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import React, { useEffect, useState } from "react";

import { Navigate } from "react-router-dom";
// import dotenv from "dotenv";
// const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
// const PORT = process.env.PORT;
const PORT = 3000;
const BACKEND_URL = `http://192.168.1.4:${PORT}`;
const getToken = localStorage.getItem("token");

const Register = () => {
  const [token, setToken] = useState(getToken);
  const obj = {
    name: "demo",
    phone: "1111111111",
    email: "jwt4222w@gmail.com",
    password: "asf232!2221A123",
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      phone: "",
      name: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(8, "Must be 8 characters or more")
        .required("Required"),
      phone: Yup.string().min(10).max(10).required("Required"),
      name: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      console.log("values", values);
      registerUser(values);
    },
  });

  const { errors, touched } = formik;

  //Register User
  const registerUser = async (values) => {
    console.log("first");
    function postData(url) {
      return axios
        .post(url, values)
        .then((res) => {
          console.log("res", res);
          setToken(res.data.token);
          localStorage.setItem("token", res.data.token);
          //   redirect to login page
          window.location.href = "/login";
          // return res.data.token;
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
    postData(`${BACKEND_URL}/users/register`);
  };

  return (
    <>
      <div className="flex justify-center items-center mt-3 bg-fuchsia-200 w-full h-[500px]">
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col justify-center items-center md:scale-125 space-y-4 mt-6"
        >
          {/* name */}
          <div className="flex justify-center items-center space-x-3">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
          </div>
          {errors.name && touched.name ? (
            <div className="text-red-500">{errors.name}</div>
          ) : null}

          {/* email */}

          <div className="flex justify-center items-center space-x-3">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
          </div>
          {errors.email && touched.email ? (
            <div className="text-red-500">{errors.email}</div>
          ) : null}
          {/* password */}
          <div className="flex justify-center items-center space-x-3">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
          </div>
          {errors.password && touched.password ? (
            <div className="text-red-500">{errors.password}</div>
          ) : null}
          {/* confirmPassword */}

          {/* Phone */}
          <div className="flex justify-center items-center space-x-3">
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              name="phone"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.phone}
            />
          </div>
          {errors.phone && touched.phone ? (
            <div className="text-red-500">{errors.phone}</div>
          ) : null}

          <input
            type="submit"
            className="bg-blue-500 p-2 rounded-md text-white"
            value="Register"
          />
        </form>
      </div>
    </>
  );
};

export default Register;
