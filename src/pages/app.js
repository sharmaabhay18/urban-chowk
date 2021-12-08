import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { connect } from "react-redux";

import "react-toastify/dist/ReactToastify.css";

import Spinner from "components/Spinner";

import Home from "pages/home";
import SignUp from "pages/signUp";
import Login from "pages/login";
import ForgetPassword from "pages/forgetPassword";
import AdminDashboard from "pages/adminDashboard";
import AdminTestimonial from "pages/adminTestimonial";
import AddTestimonial from "pages/addTestimonial";
import Profile from "pages/account/profile";
import AdminCoupon from "pages/adminCoupon";
import AddCoupon from "pages/addCoupon";
import Header from "components/Header";
import Footer from "components/Footer";
import Error from "components/Error";

import styles from "./app.module.scss";

function App(props) {
  const renderSpinner = () => {
    const { spinnerState } = props;

    return (
      spinnerState && (
        <div className={styles.spinnerStyleContainer}>
          <Spinner className={styles.spinnerStyle} />
        </div>
      )
    );
  };

  return (
    <React.Fragment>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/admin-dashboard" component={AdminDashboard} />
          <Route exact path="/admin-testimonial" component={AdminTestimonial} />
          <Route exact path="/add-testimonial" component={AddTestimonial} />
          <Route exact path="/add-coupon" component={AddCoupon} />
          <Route exact path="/admin-coupon" component={AdminCoupon} />
          <Route
            exact
            path="/admin-singup"
            component={(props) => <SignUp {...props} role="admin" />}
          />
          <Route exact path="/forgetPassword" component={ForgetPassword} />
          <Route component={Error} />
        </Switch>
        <Footer />
        {renderSpinner()}
        <ToastContainer limit={1} newestOnTop={true} preventDuplicates={true} />
      </Router>
    </React.Fragment>
  );
}
const mapStateToProps = ({ spinnerReducer }) => {
  return {
    spinnerState: spinnerReducer.spinnerState,
  };
};

export default connect(mapStateToProps)(App);
