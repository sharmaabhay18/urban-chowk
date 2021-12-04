import React, { useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import EndpointMessage from "components/EndpointMessage";
import InputField from "components/Input";
import Constants from "utils/constants";
import Button from "components/Button";
import Spinner from "components/Spinner";
import { AddTestimonialScehma } from "utils/formValidation";
import { addTestimonialAction } from "redux/actions";

import { isAdminLoggedIn } from "utils/helperFunction";
import styles from "./addTestimonial.module.scss";

const AddTestimonial = ({ addTestimonialAction, apiError, fetching }) => {
  const history = useHistory();
  const form = {
    name: "",
    icon: "",
    description: "",
    image_url: "",
  };

  useEffect(() => {
    isAdminLoggedIn(history);
  }, []);

  const renderButton = () => {
    return (
      <Button type="submit" variant="primary" className={styles.buttonStyle}>
        {fetching ? <Spinner scale={0.4} color="#ea1a20" /> : "Submit"}
      </Button>
    );
  };

  return (
    <React.Fragment>
      <Button
        onClick={() => history.push("/admin-dashboard")}
        variant="primary"
        className={styles.buttonStyle}
      >
        Admin Dashboard
      </Button>
      <div className={styles.alignContainer}>
        <Formik
          initialValues={form}
          validationSchema={AddTestimonialScehma}
          onSubmit={(values) => {
            addTestimonialAction(values, history);
          }}
          render={({ handleSubmit }) => (
            <Form onSubmit={handleSubmit} noValidate autoComplete="off">
              <div className={styles.formContainer}>
                <h1>Add Testimonial</h1>
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
                  id="outlined-icon-input"
                  type="text"
                  placeholder="Enter Icon link"
                  name="icon"
                  containerClassname={styles.containerStyle}
                  inputClassName={styles.inputClassName}
                  component={InputField}
                  isRequired
                />

                <Field
                  id="outlined-description-input"
                  type="text"
                  placeholder="Enter Description"
                  name="description"
                  containerClassname={styles.containerStyle}
                  inputClassName={styles.inputClassName}
                  component={InputField}
                  isRequired
                />

                <Field
                  id="outlined-image_url-input"
                  type="text"
                  placeholder="Enter Image url"
                  name="image_url"
                  containerClassname={styles.containerStyle}
                  inputClassName={styles.inputClassName}
                  component={InputField}
                  isRequired
                />
                <EndpointMessage
                  errorFlag={apiError}
                  endpointMessage={Constants.ERROR_MESSAGE}
                />
                {renderButton()}
              </div>
            </Form>
          )}
        />
      </div>
    </React.Fragment>
  );
};

const mapDispatchToProps = {
  addTestimonialAction,
};

const mapStateToProps = ({ testimonialReducer: testimonialState }) => {
  return {
    fetching: testimonialState.fetching,
    apiError: testimonialState.apiError,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTestimonial);
