import React from "react";
import "./userpage.css";
import { Heading } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Redirect } from "react-router-dom";
import Login from "../Login/login"

const UserPage = (props) => {
  let userInfo = JSON.parse(localStorage.getItem("auth-token"));
  console.log(userInfo)
  let handleLogout = () => {
    localStorage.setItem("auth-token", "");
    props.history.replace("/");
  };

  return (
    <div>
       {userInfo ? <div>
        <Button
        colorScheme="teal"
        variant="outline"
        className="user-page-btn"
        onClick={handleLogout}
      >
        Log Out
      </Button>
      <Heading>Welcome back {userInfo.data.username}!</Heading>
      <Text fontSize="xl">
        This is your profile page.Enjoy your time here :D
      </Text>

       </div> : <Login />}
    
     
    
     
    </div>
  );
};

export default UserPage;
