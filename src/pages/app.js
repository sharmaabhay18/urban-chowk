import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { connect } from "react-redux";

import "react-toastify/dist/ReactToastify.css";

import { getAllItemAction, spinnerAction } from "redux/actions";

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

import Header from "components/Header";
import Footer from "components/Footer";
import Error from "components/Error";

import styles from "./app.module.scss";

function App(props) {
  useEffect(() => {
    props.spinnerAction(true);
    props.getAllItemAction(() => props.spinnerAction(false));
  }, []);

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
      </Router>
    </React.Fragment>
  );
}
const mapDispatchToProps = {
  getAllItemAction,
  spinnerAction,
};

const mapStateToProps = ({
  spinnerReducer,
  allItemsReducer: allItemsState,
}) => {
  return {
    spinnerState: spinnerReducer.spinnerState,
    itemData: allItemsState.allItemData,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
