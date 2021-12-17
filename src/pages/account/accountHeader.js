import React, { Component } from "react";

import styles from "./account.module.scss";

export default class AccountHeader extends Component {
  render() {
    const { routeName } = this.props;
    return (
      <div className={styles.accountHeaderContainer}>
        <h1>Home / {routeName}</h1>
      </div>
    );
  }
}
