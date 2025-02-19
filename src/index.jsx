import "babel-polyfill";

import React from "react";
import ReactDOM from "react-dom";
import "./_index.scss";

import App from "./app/App";
import UserService from "./app/services/UserService";
import ConstantList from "./app/appConfig";
import HttpService from "app/services/HttpService";
import "./i18n";

const renderApp = () =>
  ReactDOM.render(<App />, document.getElementById("root"));

// for IE-11 support un-comment cssVars() and it's import in this file
// and in EgretTheme file

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
if (ConstantList.AUTH_MODE === "Keycloak") {
  UserService.initKeycloak(renderApp);
} else {
  renderApp();
}
HttpService.configure();
