import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { GithubProvider } from "./context/context";
import { Auth0Provider } from "@auth0/auth0-react";

//dev-1-ph9x4c.us.auth0.com
//o4dcoOLfl4sDZbOv3kb9aZUX2NHIN6R3

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-1-ph9x4c.us.auth0.com"
      clientId="o4dcoOLfl4sDZbOv3kb9aZUX2NHIN6R3"
      redirectUri={window.location.origin}
    >
      <GithubProvider>
        <App />
      </GithubProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
