import React, { Component } from "react";
import { connect } from "react-redux";

import { Formik, Form, Field } from "formik";

import { getCouponAction, spinnerAction } from "redux/actions";

import InputField from "components/Input";
import Button from "components/Button";
import { notifyErrorToast, notifySuccessToast } from "utils/helperFunction";
import styles from "./payment.module.scss";

class CouponCode extends Component {
  componentDidMount() {
    const { spinnerAction, getCouponAction } = this.props;
    spinnerAction(true);
    getCouponAction((v) => spinnerAction(v));
  }

  renderSubmitButton = () => {
    return (
      <Button type="submit" variant="primary" className={styles.buttonStyle}>
        Apply
      </Button>
    );
  };

  render() {
    const { couponCode, handleCouponCode } = this.props;

    const form = {
      coupon: couponCode,
    };
    return (
      <div
        className={styles.modeContainer}
        style={{
          margin: "10px 0px 40px -40px",
        }}
      >
        <Formik
          initialValues={form}
          onSubmit={(values, { resetForm }) => {
            const { couponData } = this.props;
            const [code] =
              couponData &&
              couponData.filter(
                (c) => c.code.toLowerCase() === values?.coupon?.toLowerCase()
              );
            if (code === undefined) {
              notifyErrorToast("Coupon Code not valid!");
            } else {
              notifySuccessToast("Coupon Code applied successfully");
            }
            resetForm();
          }}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit} noValidate autoComplete="off">
              <div className={styles.couponFormContainer}>
                <Field
                  id="outlined-coupon-input"
                  type="text"
                  placeholder="Add Coupon Code"
                  name="coupon"
                  containerClassname={styles.containerStyle}
                  onTextChange={(couponCode) => {
                    handleCouponCode(couponCode);
                  }}
                  inputClassName={styles.inputStyle}
                  component={InputField}
                  isRequired
                />
                {this.renderSubmitButton()}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

const mapDispatchToProps = {
  getCouponAction,
  spinnerAction,
};

const mapStateToProps = ({ couponReducer: couponState }) => {
  const { couponData } = couponState;
  return {
    couponData,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CouponCode);
