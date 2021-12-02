import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import Home from "pages/home";
import SignUp from "pages/signUp";
import Login from "pages/login";
import ForgetPassword from "pages/forgetPassword";

import Header from "components/Header";
import Footer from "components/Footer";
import Error from "components/Error";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/forgetPassword" component={ForgetPassword} />
          <Route component={Error} />
        </Switch>
        <Footer />
        <ToastContainer limit={1} newestOnTop={true} preventDuplicates={true} />
      </Router>
    </React.Fragment>
  );
}

export default App;
