import React, { useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import EndpointMessage from "components/EndpointMessage";
import InputField from "components/Input";
import Constants from "utils/constants";
import Button from "components/Button";
import Spinner from "components/Spinner";
import { AddCouponScehma } from "utils/formValidation";
import { addCouponAction } from "redux/actions";

import { isAdminLoggedIn } from "utils/helperFunction";
import styles from "./addCoupon.module.scss";

const AddCoupon = ({ addCouponAction, apiError, fetching, couponData }) => {
  const history = useHistory();
  const form = {
    code: "",
    discount: "",
  };

  useEffect(() => {
    isAdminLoggedIn(history);
  }, [history]);

  const renderButton = () => {
    return (
      <Button type="submit" variant="primary" className={styles.buttonStyle}>
        {fetching ? <Spinner scale={0.4} color="#ea1a20" /> : "Submit"}
      </Button>
    );
  };

  return (
    <React.Fragment>
      <Button
        onClick={() => history.push("/admin-dashboard")}
        variant="primary"
        className={styles.buttonStyle}
      >
        Admin Dashboard
      </Button>
      <div className={styles.alignContainer}>
        <Formik
          initialValues={form}
          validationSchema={AddCouponScehma}
          onSubmit={(values) => {
            addCouponAction(values, history);
          }}
          render={({ handleSubmit }) => (
            <Form onSubmit={handleSubmit} noValidate autoComplete="off">
              <div className={styles.formContainer}>
                <h1>Add Coupon</h1>
                <Field
                  id="outlined-name-input"
                  type="text"
                  placeholder="Enter Code"
                  name="code"
                  containerClassname={styles.containerStyle}
                  inputClassName={styles.inputClassName}
                  component={InputField}
                  isRequired
                />

                <Field
                  id="outlined-icon-input"
                  type="text"
                  placeholder="Enter Discount "
                  name="discount"
                  containerClassname={styles.containerStyle}
                  inputClassName={styles.inputClassName}
                  component={InputField}
                  isRequired
                />

                <EndpointMessage
                  errorFlag={apiError}
                  endpointMessage={
                    (couponData &&
                      couponData.isError &&
                      couponData.errorMessage) ||
                    Constants.ERROR_MESSAGE
                  }
                />
                {renderButton()}
              </div>
            </Form>
          )}
        />
      </div>
    </React.Fragment>
  );
};

const mapDispatchToProps = {
  addCouponAction,
};

const mapStateToProps = ({ couponReducer: couponState }) => {
  const { couponData } = couponState;

  return {
    fetching: couponState.fetching,
    apiError: couponState.apiError,
    couponData,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCoupon);
