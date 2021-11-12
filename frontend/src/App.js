import * as React from "react";
import Login from "./Login/login";
import { ChakraProvider } from "@chakra-ui/react";
import Signup from "./SignUp/signup";
import UserPage from "./UserPage/userpage";
import { BrowserRouter as Router, Route, Link, Routes,Switch } from "react-router-dom";

function App({ Component }) {
  return (
    <ChakraProvider>
      <Router>
        <Switch>
          <Route path="/" component={Login} exact />
          <Route path="/signup" component={Signup} exact />
          <Route path="/userpage" component={UserPage} exact />
        </Switch>
      </Router>
    </ChakraProvider>
  );
}
export default App;
