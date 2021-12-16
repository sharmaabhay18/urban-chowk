import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import { store } from "redux/store";

import "./index.module.scss";
import App from "./pages/app";

require('dotenv').config()

console.log("process====>", process.env.REACT_APP_FIREBASE_API_KEY)

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
