import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import Home from "pages/home";
import SignUp from "pages/signUp";
import Login from "pages/login";
import ForgetPassword from "pages/forgetPassword";
import AdminDashboard from "pages/adminDashboard";
import AdminTestimonial from "pages/adminTestimonial";
import AddTestimonial from "pages/addTestimonial";

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
          <Route exact path="/admin-dashboard" component={AdminDashboard} />
          <Route exact path="/admin-testimonial" component={AdminTestimonial} />
          <Route exact path="/add-testimonial" component={AddTestimonial} />
          <Route
            exact
            path="/admin-singup"
            component={(props) => <SignUp {...props} role="admin" />}
          />
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
