import React, { Component } from "react";

import styles from "./payment.module.scss";

export default class PaymentMode extends Component {
  render() {
    return (
      <div className={styles.modeContainer}>
        <div className={styles.paymentStyle}>
          <h3>Payment Mode - Cash On Delivery</h3>
          <p>We are currently accepting only cash on delivery</p>
        </div>
      </div>
    );
  }
}
