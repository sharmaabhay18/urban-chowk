import React, { Component } from "react";
import { connect } from "react-redux";

import {
  getAddressAction,
  addAddressAction,
  spinnerAction,
  getUserInfoAction,
} from "redux/actions";

import config from "utils/configConstant";
import Button from "components/Button";

import { checkAdmin } from "utils/helperFunction";
import styles from "./address.module.scss";
import AddressForm from "./addressForm";
import AddressTile from "./addressTile";

class Address extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
    };
  }

  handleSpinner = (flag) => this.props.spinnerAction(flag);

  componentDidMount() {
    const { getAddressAction, history } = this.props;
    const data = localStorage.getItem(config.AUTH_TOKEN);
    if (!data || checkAdmin()) return history.push("/");
    this.handleSpinner(true);
    getAddressAction(this.handleSpinner);
  }

  toggleEditAddress = (flag) => this.setState({ isEdit: flag });

  renderAddButton = () => {
    return (
      <Button
        type="submit"
        variant="primary"
        className={styles.addressButtonStyle}
        onClick={() => this.toggleEditAddress(true)}
      >
        Add New
      </Button>
    );
  };
  render() {
    const { isEdit } = this.state;
    const { addressPayload, userName, fetching, addAddressAction, history } =
      this.props;
    return (
      <div className={styles.addressMainContainer}>
        <div className={styles.headerContainer}>
          <h1>Select/Add Address </h1>
        </div>
        {!isEdit ? (
          <React.Fragment>
            <div className={styles.buttonContainer}>
              {this.renderAddButton()}
            </div>
            {!fetching ? (
              <AddressTile
                addressList={addressPayload}
                userName={userName}
                history={history}
              />
            ) : (
              <div
                style={{
                  height: "200px",
                }}
              />
            )}
          </React.Fragment>
        ) : (
          <AddressForm
            addAddressAction={addAddressAction}
            toggleEditAddress={this.toggleEditAddress}
            handleSpinner={this.handleSpinner}
          />
        )}
      </div>
    );
  }
}

const mapDispatchToProps = {
  getAddressAction,
  addAddressAction,
  spinnerAction,
  getUserInfoAction,
};

const mapStateToProps = ({
  addressReducer: addressState,
  userReducer: userState,
}) => {
  const { addressData } = addressState;

  return {
    fetching: addressState.fetching,
    apiError: addressState.apiError,
    addressPayload: addressData,
    userName: userState?.userPayload ? userState.userPayload?.name : "",
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Address);
