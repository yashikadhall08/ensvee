import React from "react";
import { Heading } from "@chakra-ui/react";
import { useState, useContext } from "react";
import "./signup.css";
import { Link } from "react-router-dom";
import UserContext from "../context/userContext.js";

const axios = require("axios");
const Signup = (props) => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
    repassword: "",
  });
  const [fnameError, setFnameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [repasswordError, setrepasswordError] = useState("");
  const [isValid, setIsValid] = useState(false);

  let handleSignUp = async () => {
    console.log(userInfo);
    handleValidate("fname", userInfo.username);
    handleValidate("email", userInfo.email);
    handleValidate("password", userInfo.password);
    handleValidate("repassword", userInfo.repassword);

    if (
      userInfo.username.length > 0 &&
      userInfo.email.length > 0 &&
      userInfo.password.length > 0 &&
      userInfo.repassword.length > 0 &&
      fnameError.length +
        emailError.length +
        passwordError.length +
        repasswordError.length ==
        0
    ) {
      console.log("Valid Details");
      setIsValid(true);
    } else {
      setIsValid(false);
    }
    if (isValid) {
      await axios.post("https://ensveee.herokuapp.com/signup", userInfo);
      props.history.replace("/");
    }
  };

  let handleValidate = (field, value) => {
    if (value == undefined) value = "";
    console.log(field);
    if (field == "fname") {
      if (userInfo.username.length <= 0) {
        setFnameError("Invalid Name");
        console.log(fnameError);
      } else {
        setFnameError("");
      }
    } else if (field == "email") {
      if (userInfo.email.length > 0 && !userInfo.email.includes("@")) {
        setEmailError("Invalid Email");
        console.log(emailError);
      } else {
        setEmailError("");
      }
    } else if (field == "password") {
      if (userInfo.password.length > 0 && userInfo.password.length < 8) {
        setPasswordError("Your password length is less than 8");
        console.log(passwordError);
      } else {
        setPasswordError("");
      }
    } else if (field == "repassword") {
      if (
        userInfo.repassword.length > 0 &&
        userInfo.repassword !== userInfo.password
      ) {
        setrepasswordError("Doesn't match with password");
        console.log(repasswordError);
      } else {
        setrepasswordError("");
      }
    }
  };

  return (
    <div className="sign-up-big-div">
      <div className="sign-up-main-div">
        <Heading className="sign-up-head">Sign Up</Heading>
        <p className="sign-up-welcome-text">Dont have an account?</p>

        <p className="sign-up-lable-text-fname">Full Name</p>
        <input
          type="text"
          className="fname-input"
          onChange={(e) =>
            setUserInfo({ ...userInfo, username: e.target.value })
          }
        ></input>

        <p className="error-fname">{fnameError}</p>

        <p className="sign-up-lable-text-email">Your Email</p>
        <input
          type="text"
          className="email-input"
          onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
        ></input>

        <p className="error-email">{emailError}</p>

        <p className="sign-up-lable-text-password">Password</p>
        <input
          type="password"
          className="password-input"
          onChange={(e) =>
            setUserInfo({ ...userInfo, password: e.target.value })
          }
        ></input>

        <p className="error-password">{passwordError}</p>

        <p className="sign-up-lable-text-rpassword">Repeat Password</p>
        <input
          type="password"
          className="repassword-input"
          onChange={(e) =>
            setUserInfo({ ...userInfo, repassword: e.target.value })
          }
        ></input>

        <p className="error-repassword">{repasswordError}</p>

        <button className="sign-up-btn" onClick={handleSignUp}>
          Sign Up
        </button>
      </div>
      <div className="sign-up-right-div">
        <p>
          <Link to="/" className="go-to-login">
            I have an account! Click here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
