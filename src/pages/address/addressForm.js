import React, { Component } from "react";
import { Formik, Form, Field } from "formik";

import InputField from "components/Input";
import Button from "components/Button";

import { AddressSchema } from "utils/formValidation";

import styles from "./address.module.scss";

export default class AddressForm extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedState: "", cities: [], selectedCity: "" };
  }

  renderButton = () => {
    return (
      <Button type="submit" variant="primary" className={styles.buttonStyle}>
        Done
      </Button>
    );
  };

  render() {
    const form = {
      address: "",
      city: "",
      state: "",
      pincode: "",
      landmark: "",
    };
    const { addAddressAction, toggleEditAddress, handleSpinner } = this.props;
    return (
      <div>
        <Formik
          initialValues={form}
          validationSchema={AddressSchema}
          onSubmit={(values) => {
            handleSpinner(true);
            addAddressAction(values, toggleEditAddress, handleSpinner);
          }}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit} noValidate autoComplete="off">
              <div className={styles.formContainer}>
                <h2>Add Address</h2>
                <Field
                  id="outlined-address-input"
                  type="text"
                  placeholder="Enter Address"
                  name="address"
                  containerClassname={styles.containerStyle}
                  labelStyle={{
                    top: "0.9rem",
                  }}
                  inputClassName={styles.inputStyle}
                  component={InputField}
                  isRequired
                />

                <Field
                  id="outlined-state-input"
                  type="text"
                  name="state"
                  placeholder="Enter State"
                  value={this.state.selectedState.value}
                  component={InputField}
                  containerClassname={styles.containerStyle}
                  labelStyle={{
                    top: "0.9rem",
                  }}
                  inputClassName={styles.inputStyle}
                  isRequired
                />

                <Field
                  id="outlined-city-input"
                  type="text"
                  name="city"
                  value={this.state.selectedCity.value}
                  component={InputField}
                  containerClassname={styles.containerStyle}
                  labelStyle={{
                    top: "0.9rem",
                  }}
                  inputClassName={styles.inputStyle}
                  isRequired
                  placeholder="Enter City"
                />

                <Field
                  id="outlined-pincode-input"
                  type="text"
                  placeholder="Enter Pin Code"
                  name="pincode"
                  containerClassname={styles.containerStyle}
                  labelStyle={{
                    top: "0.9rem",
                  }}
                  isRequired
                  inputClassName={styles.inputStyle}
                  component={InputField}
                />
                <Field
                  id="outlined-landmark-input"
                  type="text"
                  placeholder="Enter Landmark"
                  name="landmark"
                  containerClassname={styles.containerStyle}
                  labelStyle={{
                    top: "0.9rem",
                  }}
                  inputClassName={styles.inputStyle}
                  component={InputField}
                />
                {this.renderButton()}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}
