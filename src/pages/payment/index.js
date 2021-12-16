import React, { Component } from "react";
import { connect } from "react-redux";

import Button from "components/Button";
import { checkAdmin } from "utils/helperFunction";
import PaymentMode from "./paymentMode";
import CouponCode from "./couponCode";
import config from "utils/configConstant";


import {
  addOrderAction,
  spinnerAction,
  clearCheckoutListAction,
  clearOrderListAction,
} from "redux/actions";

import styles from "./payment.module.scss";

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      couponCode: "",
    };
  }

  componentDidMount() {
    const { history } = this.props;
    const data = localStorage.getItem(config.AUTH_TOKEN);
    if (!data || checkAdmin()) return history.push("/");
  }

  handleCouponCode = (couponCode) => this.setState({ couponCode });

  handleSpinner = (flag) => this.props.spinnerAction(flag);

  getFinalAmount = () => {
    const { couponData, orderPayload } = this.props;
    const { couponCode } = this.state;
    const [code] = couponData.filter(
      (c) => c?.code.toLowerCase() === couponCode.toLowerCase()
    );
    const couponCodeDiscount = code?.discount;
    const discount = Number(couponCodeDiscount);
    const baseCost = orderPayload.totalCost;
    const finalAmount =
      discount && discount !== undefined
        ? baseCost - (baseCost * discount) / 100
        : baseCost;

    return finalAmount;
  };

  handleOrder = (modeOfPayment, paymentId) => {
    const {
      history,
      addOrderAction,
      orderPayload,
      clearCheckoutListAction,
      clearOrderListAction,
    } = this.props;
    this.handleSpinner(true);

    const finalAmount = this.getFinalAmount();
    const finalOrderPayload = paymentId
      ? {
        ...orderPayload,
        modeOfPayment,
        payment_ref_id: paymentId,
        totalCost: finalAmount,
      }
      : {
        ...orderPayload,
        modeOfPayment,
        totalCost: finalAmount,
      };

    addOrderAction(finalOrderPayload, history, this.handleSpinner);
    clearCheckoutListAction();
    clearOrderListAction();
  };

  render() {
    const { couponCode } = this.state;

    return (
      <div className={styles.paymentMainContainer}>
        <div className={styles.headerContainer}>
          <h1>Payment</h1>
        </div>
        <CouponCode
          couponCode={couponCode}
          handleCouponCode={this.handleCouponCode}
        />
        <PaymentMode />
        <div className={styles.proceedButtonContainer}>
          <Button
            type="submit"
            variant="primary"
            className={styles.proceedButtonStyle}
            onClick={() => {
              this.handleOrder("Cash On Delivery");
            }}
          >
            Buy
          </Button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  addOrderAction,
  spinnerAction,
  clearCheckoutListAction,
  clearOrderListAction,
};

const mapStateToProps = ({
  checkoutListReducer: checkoutListState,
  couponReducer: couponState,
  localOrderReducer,
}) => {
  const { couponData } = couponState;
  return {
    checkoutList: checkoutListState.checkoutItems,
    couponData,
    orderPayload: localOrderReducer.orderDetails,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
