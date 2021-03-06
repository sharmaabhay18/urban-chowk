import React, { Component } from "react";

import { connect } from "react-redux";

import { loginAction } from "redux/actions";

import { isUserAuthenticated } from "utils/helperFunction";

import styles from "./login.module.scss";

import LoginForm from "./loginForm";

class Login extends Component {
  componentDidMount() {
    const { history } = this.props;
    isUserAuthenticated(history);
  }

  render() {
    const { loginAction, fetching, apiError, userPayload, role } = this.props;

    return (
      <div className={styles.loginMainContainer}>
        <LoginForm
          loginAction={loginAction}
          fetching={fetching}
          apiError={apiError}
          userPayload={userPayload}
          role={role}
        />
      </div>
    );
  }
}

const mapDispatchToProps = {
  loginAction,
};

const mapStateToProps = ({ loginReducer: loginState }) => {
  const { loggedInUser } = loginState;

  return {
    fetching: loginState.fetching,
    apiError: loginState.apiError,
    userPayload: loggedInUser,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
