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
        <h2 className={styles.addressNameStyle}>{name}</h2>
        <h2 className={styles.addressCardAddressStyle}>{address}</h2>
        <h2 className={styles.addressCardAddressStyle}>
          {state} , {city}
        </h2>
        <h2 className={styles.addressCardAddressStyle}>{pincode}</h2>
        {landmark && (
          <h2 className={styles.addressCardLandmarkStyle}>
            Landmark: {landmark}
          </h2>
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
