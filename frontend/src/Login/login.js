import React from "react";
import { useState, useContext } from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Radio, RadioGroup } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import "./login.css";
import UserContext from "../context/userContext.js";
import { Link } from "react-router-dom";
const axios = require("axios");

const Login = (props) => {
  const [userInfo, setUserInfo] = useState({});
  let [loginError, setLoginError] = useState("");

  let handleSumit = async (e) => {
    const loginResponse = await axios.post(
      "https://ensveee.herokuapp.com/login",
      userInfo
    );
    console.log(loginResponse.data.message);

    // console.log(loginResponse.data.accessToken);
    if (loginResponse.data.message === "Verified") {
      localStorage.setItem("auth-token", JSON.stringify(loginResponse));
      props.history.replace("/userpage");
    } else {
      setLoginError("Invalid email / password");
      console.log(loginError)
    }
  };

  return (
    <div className="sign-in-big-div">
      <div className="sign-in-main-div">
        <Heading className="sign-in-head">Sign In</Heading>
        <p className="welcome-text">Welcome we missed you</p>
        <input
          type="text"
          className="sign-in-input-email"
          onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
        ></input>
        <p className="lable-text-email">Your Email</p>
        <input
          type="password"
          className="sign-in-input-password"
          onChange={(e) =>
            setUserInfo({ ...userInfo, password: e.target.value })
          }
        ></input>
        <p className="lable-text-password">Password</p>
        <input type="radio" className="remember-me"></input>
        <p className="error">{loginError}</p>
        <label for="html" className="remember-me-text">
          Remember me
        </label>
        <p className="forgot-password">Forgot Password</p>
        <button className="btn" onClick={handleSumit}>
          Sign In
        </button>
        <div className="line1"></div>
        <p className="or-continue-with">or continue with</p>
        <div className="line2"></div>
      </div>
      <div className="sign-in-right-div">
        <p>
          <Link to="/signup" className="go-to-signup">
            Don’t have an account? Click here
          </Link>
        </p>
      </div>
      <button className="btn2">Sign in with Steam</button>
      <button className="btn3"></button>
    </div>
  );
};

export default Login;
