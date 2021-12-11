import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./address.module.scss";
import Button from "components/Button";

export default class AddressCard extends Component {
  render() {
    const {
      name,
      address,
      landmark,
      handleDeleteBtn,
      handleOnClick,
      state,
      city,
      pincode,
    } = this.props;
    return (
      <div className={styles.addressCardContainer} onClick={handleOnClick}>
        <h4 className={styles.addressNameStyle}>{name}</h4>
        <h4 className={styles.addressCardAddressStyle}>{address}</h4>
        <h4 className={styles.addressCardAddressStyle}>
          {state} , {city}
        </h4>
        <h4 className={styles.addressCardAddressStyle}>{pincode}</h4>
        {landmark && (
          <h4 className={styles.addressCardLandmarkStyle}>
            Landmark: {landmark}
          </h4>
        )}
        <Button
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteBtn();
          }}
          variant="primary"
          className={styles.buttonStyle}
        >
          Delete
        </Button>
      </div>
    );
  }
}

AddressCard.protoTypes = {
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  landmark: PropTypes.string,
  handleOnClick: PropTypes.func.isRequired,
  pincode: PropTypes.string,
  handleDeleteBtn: PropTypes.func,
};
