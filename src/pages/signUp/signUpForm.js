import React, { Component } from "react";

import { Formik, Form, Field } from "formik";

import InputField from "components/Input";
import Button from "components/Button";
import Spinner from "components/Spinner";
import EndpointMessage from "components/EndpointMessage";

import { SignUpSchema } from "utils/formValidation";
import Constants from "utils/constants";

import styles from "./signUp.module.scss";

export default class SignUpForm extends Component {
  renderSignUpButton = () => {
    const { fetching } = this.props;
    return (
      <Button type="submit" variant="primary" className={styles.buttonStyle}>
        {fetching ? <Spinner scale={0.4} color="#ea1a20" /> : "Sign Up"}
      </Button>
    );
  };

  render() {
    const { apiError, userPayload, signupAction, history, role } = this.props;
    const form = {
      name: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "",
      role: role ? role : "customer",
    };

    const handleApiCall = (values) => {
      signupAction(values, history);
    };

    return (
      <React.Fragment>
        <Formik
          initialValues={form}
          validationSchema={SignUpSchema}
          onSubmit={(values) => {
            handleApiCall(values);
          }}
          render={({ handleSubmit }) => (
            <Form onSubmit={handleSubmit} noValidate autoComplete="off">
              <div className={styles.formContainer}>
                <h1>SIGN UP</h1>
                <Field
                  id="outlined-name-input"
                  type="text"
                  placeholder="Enter Name"
                  name="name"
                  containerClassname={styles.containerStyle}
                  inputClassName={styles.inputClassName}
                  component={InputField}
                  isRequired
                />

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
                  id="outlined-mobile-input"
                  type="text"
                  placeholder="Enter Phone Number"
                  name="mobile"
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

                <Field
                  id="outlined-confirm-password-input"
                  type="password"
                  placeholder="Enter Confirm Password"
                  name="confirmPassword"
                  containerClassname={styles.containerStyle}
                  inputClassName={styles.inputClassName}
                  component={InputField}
                  isRequired
                />
                <EndpointMessage
                  errorFlag={(userPayload && userPayload.isError) || apiError}
                  endpointMessage={
                    (userPayload &&
                      userPayload.isError &&
                      userPayload.errorMessage) ||
                    Constants.ERROR_MESSAGE
                  }
                />
                {this.renderSignUpButton()}
              </div>
            </Form>
          )}
        />
      </React.Fragment>
    );
  }
}
