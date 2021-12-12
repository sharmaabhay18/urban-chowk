import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

import classNames from "classnames";

import { logoutAction } from "redux/actions";

import { loadState, saveState } from "utils/localStorage";
import { checkAdmin } from "utils/helperFunction"
import Button from "components/Button";

import styles from "./account.module.scss";

class AccountNavBar extends Component {
  handleSignOut = () => {
    const { history, logoutAction } = this.props;

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
  };

  render() {
    const {
      history,
      location: { pathname },
    } = this.props;

    return (
      <div className={styles.linkContainer}>
        <Button
          className={
            /^(\/profile)/.test(pathname)
              ? classNames(styles.linkStyle, styles.linkBorder)
              : styles.linkStyle
          }
          variant="secondary"
          onClick={() => history.push("/profile")}
        >
          Profile
        </Button>

        {!checkAdmin() && <Button
          className={
            /^(\/order)/.test(pathname)
              ? classNames(styles.linkStyle, styles.linkBorder)
              : styles.linkStyle
          }
          variant="secondary"
          onClick={() => history.push("/order-details")}
        >
          Orders
        </Button>}

        <Button
          className={styles.linkStyle}
          variant="secondary"
          onClick={this.handleSignOut}
        >
          Sign Out
        </Button>
      </div>
    );
  }
}

const mapDisptachToProps = {
  logoutAction,
};

export default withRouter(connect(null, mapDisptachToProps)(AccountNavBar));
