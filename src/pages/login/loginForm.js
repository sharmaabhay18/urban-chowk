/* eslint-disable react/no-unescaped-entities */
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import { Formik, Form, Field } from "formik";

import InputField from "components/Input";
import Button from "components/Button";
import Spinner from "components/Spinner";
import EndpointMessage from "components/EndpointMessage";
import { LoginSchema } from "utils/formValidation";
import Constants from "utils/constants";

import styles from "./login.module.scss";

class LoginForm extends Component {
  renderLoginButton = (submitForm) => {
    const { fetching } = this.props;
    return (
      <Button
        onClick={submitForm}
        variant="primary"
        className={styles.buttonStyle}
      >
        {fetching ? <Spinner scale={0.4} color="#ea1a20" /> : "Login"}
      </Button>
    );
  };

  renderCreateAccountButton = () => {
    const { history } = this.props;
    return (
      <Button
        onClick={() => history.push("/signUp")}
        type="submit"
        variant="primary"
        className={styles.buttonStyle}
      >
        Create Account
      </Button>
    );
  };

  render() {
    const { apiError, userPayload, loginAction, role } = this.props;

    const form = {
      email: "",
      password: "",
      role: role,
    };

    const handleApiCall = (values) => {
      const { history } = this.props;
      loginAction(values, history);
    };

    const renderEmailLogin = () => (
      <Formik
        initialValues={form}
        validationSchema={LoginSchema}
        onSubmit={(values) => {
          handleApiCall(values);
        }}
      >
        {({ handleSubmit, submitForm }) => (
          <Form
            onSubmit={handleSubmit}
            noValidate
            autoComplete="off"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Field
              id="outlined-email-input"
              type="email"
              placeholder="Enter Email"
              name="email"
              containerClassname={styles.containerStyle}
              inputClassName={styles.inputClassName}
              component={InputField}
              isRequired
            />

            <Field
              id="outlined-password-input"
              type="password"
              placeholder="Enter Password"
              name="password"
              containerClassname={styles.containerStyle}
              inputClassName={styles.inputClassName}
              component={InputField}
              isRequired
            />
            {this.renderLoginButton(submitForm)}
          </Form>
        )}
      </Formik>
    );

    return (
      <div className={styles.formContainer}>
        <h1 className={styles.formHeaderStyle}>Login Page</h1>
        {renderEmailLogin()}
        <EndpointMessage
          errorFlag={(userPayload && userPayload.isError) || apiError}
          endpointMessage={
            (userPayload && userPayload.isError && userPayload.errorMessage) ||
            Constants.ERROR_MESSAGE
          }
        />
        <div className={styles.loginFooter}>
          <div>
            <p className={styles.loginFooterTextStyle}>
              Don't have an account?
            </p>

            {this.renderCreateAccountButton()}
          </div>
          <Link to="/forgetPassword"> Forget Password? </Link>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginForm);
