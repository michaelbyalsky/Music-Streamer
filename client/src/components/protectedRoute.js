import React from "react";
import { Route, Redirect } from "react-router-dom";
import Auth from "../helpers/context";
export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { loggedInValue } = React.useContext(Auth);
  const [loggedIn, setLoggedIn] = loggedInValue;

  return (
    <Route
      {...rest}
      render={(props) => {
        if (loggedIn) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};
