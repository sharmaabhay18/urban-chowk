import React, { Component } from "react";
import { connect } from "react-redux";

import { signupAction } from "redux/actions";

import { isUserAuthenticated } from "utils/helperFunction";

import SignUpForm from "./signUpForm.js";

import styles from "./signUp.module.scss";

class SignUp extends Component {
  componentDidMount() {
    const { history } = this.props;

    isUserAuthenticated(history);
  }
  render() {
    const { signupAction, fetching, apiError, userPayload, history, role } =
      this.props;

    return (
      <div className={styles.signUpMainContainer}>
        <SignUpForm
          signupAction={signupAction}
          fetching={fetching}
          apiError={apiError}
          userPayload={userPayload}
          history={history}
          role={role}
        />
      </div>
    );
  }
}

const mapDispatchToProps = {
  signupAction,
};

const mapStateToProps = ({ signupReducer: signUpState }) => {
  const { userPayload } = signUpState;

  return {
    fetching: signUpState.fetching,
    apiError: signUpState.apiError,
    userPayload: userPayload,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
