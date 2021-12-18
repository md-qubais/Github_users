import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

//here we are accessing the children and the rest of the properties
const PrivateRoute = ({ children, ...rest }) => {
  const {isAuthenticated,user}=useAuth0();
  const isUser = isAuthenticated && user;
  //here below ...rest is like exact={true}
  return (
    <Route
      {...rest}
      render={() => {
        return isUser ? children : <Redirect to="/login"></Redirect>;
      }}
    ></Route>
  );
};
export default PrivateRoute;
