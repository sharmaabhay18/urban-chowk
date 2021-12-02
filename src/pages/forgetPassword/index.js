import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import { connect } from "react-redux";

import { forgotPassword } from "redux/actions";

import InputField from "components/Input";
import Button from "components/Button";
import EndpointMessage from "components/EndpointMessage";
import Spinner from "components/Spinner";
import { ForgetPasswordSchema } from "utils/formValidation";
import Constants from "utils/constants";

import styles from "./forgetPassword.module.scss";

class ForgetPassword extends Component {
  renderSubmitButton = () => {
    return (
      <Button type="submit" variant="primary" className={styles.buttonStyle}>
        {this.props.fetching ? (
          <Spinner scale={0.4} color="#ea1a20" />
        ) : (
          "Login"
        )}
      </Button>
    );
  };

  render() {
    const { apiError, userPayload, forgotPassword } = this.props;
    const form = {
      email: "",
    };
    return (
      <div className={styles.mainContainer}>
        <Formik
          initialValues={form}
          validationSchema={ForgetPasswordSchema}
          onSubmit={(values, { resetForm }) => {
            forgotPassword(values, resetForm);
          }}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit} noValidate autoComplete="off">
              <div className={styles.formContainer}>
                <h4>Forget Password</h4>
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
                <EndpointMessage
                  errorFlag={(userPayload && userPayload.isError) || apiError}
                  endpointMessage={
                    (userPayload &&
                      userPayload.isError &&
                      userPayload.errorMessage) ||
                    Constants.ERROR_MESSAGE
                  }
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
  forgotPassword,
};

const mapStateToProps = ({ forgotPasswordReducer: userState }) => {
  const { userPayload } = userState;

  return {
    fetching: userState.fetching,
    apiError: userState.apiError,
    userPayload,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPassword);
