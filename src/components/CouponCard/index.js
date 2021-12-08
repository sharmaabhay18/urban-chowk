import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "components/Button";

import styles from "./couponCode.module.scss";

export default class CouponCard extends Component {
  render() {
    const { name, isDelete, handleDelete, discount } = this.props;
    return (
      <div className={styles.cardContainer}>
        <div className={styles.cardContentStyle}>
          <h2 className={styles.cardNameStyle}>{name.toUpperCase()}</h2>
          <h2 className={styles.cardNameStyle}>{discount}</h2>
          {isDelete && (
            <div
              style={{
                margin: "10px 5px",
              }}
            >
              <Button
                onClick={handleDelete}
                variant="primary"
                className={styles.buttonStyle}
              >
                Delete
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

CouponCard.protoTypes = {
  name: PropTypes.string.isRequired,
  isDelete: PropTypes.bool,
  handleDelete: PropTypes.func,
  discount: PropTypes.string,
};
