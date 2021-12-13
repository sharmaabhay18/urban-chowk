import React, { useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { connect } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import EndpointMessage from "components/EndpointMessage";
import InputField from "components/Input";
import Constants from "utils/constants";
import Button from "components/Button";
import Spinner from "components/Spinner";
import { AddItemsScehma } from "utils/formValidation";
import { addItemAction } from "redux/actions";

import { isAdminLoggedIn } from "utils/helperFunction";
import styles from "./addItems.module.scss";

const AddItems = ({ addItemAction, apiError, fetching }) => {
  const history = useHistory();
  const location = useLocation();
  const form = {
    name: "",
    icon: "",
    description: "",
    categoryId: location.state.id,
    price: ""
  };

  useEffect(() => {
    isAdminLoggedIn(history);
    console.log(location.state.id);
  }, [history]);

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
          validationSchema={AddItemsScehma}
          onSubmit={(values) => {
            addItemAction(values, history);
          }}
          render={({ handleSubmit }) => (
            <Form onSubmit={handleSubmit} noValidate autoComplete="off">
              <div className={styles.formContainer}>
                <h1>Add Items</h1>
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
                  placeholder="Enter price"
                  name="price"
                  containerClassname={styles.containerStyle}
                  inputClassName={styles.inputClassName}
                  component={InputField}
                  isRequired                
                />

                <Field
                  id="outlined-image_url-input"
                  type="text"
                  placeholder="Category id"
                  name="categoryId"
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
  addItemAction,
};

const mapStateToProps = ({ itemsReducer: itemState }) => {
  return {
    fetching: itemState.fetching,
    apiError: itemState.apiError,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddItems);
