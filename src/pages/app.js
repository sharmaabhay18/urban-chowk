import React, { useEffect } from "react";
import axios from "axios";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { connect } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

import { logoutAction } from "redux/actions";

import Spinner from "components/Spinner";

import Home from "pages/home";
import SignUp from "pages/signUp";
import Login from "pages/login";
import ProductList from "pages/productList";
import ProductOverview from "pages/productOverview";
import Payment from "pages/payment";
import ForgetPassword from "pages/forgetPassword";
import AdminDashboard from "pages/adminDashboard";
import AdminTestimonial from "pages/adminTestimonial";
import AddTestimonial from "pages/addTestimonial";
import Profile from "pages/account/profile";
import Order from "pages/account/orders";
import AdminCoupon from "pages/adminCoupon";
import AddCoupon from "pages/addCoupon";
import Checkout from "pages/checkout";
import Address from "pages/address";
import AdminDelivery from "pages/adminDelivery"

import Header from "components/Header";
import Footer from "components/Footer";
import Error from "components/Error";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { loadState, saveState } from "utils/localStorage";

import styles from "./app.module.scss";

function App({ spinnerState, logoutAction }) {

  const history = useHistory();

  const location = useLocation()

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        const persistedCheckoutItems = loadState();
        const isDataCleared = new Promise((resolve, reject) => {
          localStorage.clear();
          resolve();
        });
        isDataCleared.then(() => {
          saveState(persistedCheckoutItems);
          logoutAction();
          delete axios.defaults.headers.common["Authorization"];
          return history.replace("/");
        });

      }
    });
  }, [location]);

  const renderSpinner = () => {


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

      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/category/:type" component={ProductList} />
        <Route exact path="/product/:id" component={ProductOverview} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/order-details" component={Order} />
        <Route exact path="/checkout" component={Checkout} />
        <Route exact path="/payment" component={Payment} />
        <Route exact path="/admin-dashboard" component={AdminDashboard} />
        <Route exact path="/admin-testimonial" component={AdminTestimonial} />
        <Route exact path="/add-testimonial" component={AddTestimonial} />
        <Route exact path="/add-coupon" component={AddCoupon} />
        <Route exact path="/admin-coupon" component={AdminCoupon} />
        <Route exact path="/address" component={Address} />
        <Route exact path="/admin-delivery" component={AdminDelivery} />
        <Route
          exact
          path="/admin-signup"
          component={(props) => <SignUp {...props} role="admin" />}
        />
        <Route exact path="/forgetPassword" component={ForgetPassword} />
        <Route component={Error} />
      </Switch>
      <Footer />
      {renderSpinner()}
      <ToastContainer limit={1} newestOnTop={true} preventDuplicates={true} />

    </React.Fragment>
  );
}
const mapDispatchToProps = {
  logoutAction
};

const mapStateToProps = ({
  spinnerReducer,
}) => {
  return {
    spinnerState: spinnerReducer.spinnerState,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
