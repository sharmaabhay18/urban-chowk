import React, { Component } from "react";
import PropTypes from "prop-types";

import Button from "components/Button";
import QuantityCounter from "components/QuantityCounter";

import styles from "./itemDetail.module.scss";

export default class ItemDetail extends Component {
  renderItemDetailHeader = () => {
    const { name } = this.props;
    return (
      <div className={styles.itemDetailHeaderContainer}>
        <h1>{name}</h1>
      </div>
    );
  };

  renderItemDetailFooter = () => {
    const {
      handleOnClick,
      cost,
      name,
      imgSrc,
      counterId,
      sendQuantityData,
      quantity,
    } = this.props;

    const itemDetail = {
      cost,
      name,
      imgSrc,
      counterId,
    };

    return (
      <div className={styles.itemDetailFooter}>
        <h2 className={styles.itemDetailCostStyle}>$ {cost}</h2>
        <div className={styles.itemDetailPurchaseContainer}>
          <QuantityCounter
            quantity={quantity}
            sendQuantityData={sendQuantityData}
            counterId={counterId}
            quantityHeaderStyle={styles.itemDetailQuantityStyle}
            quantityBoxStyle={styles.itemDetailQuantityBoxStyle}
            quantityContainer={styles.itemDetailQuantityContainer}
          />
          <Button onClick={() => handleOnClick(itemDetail)} variant="secondary">
            Add To Cart{" "}
          </Button>
        </div>
      </div>
    );
  };

  render() {
    const { imgSrc, description } = this.props;
    return (
      <div className={styles.itemDetailContainer}>
        <div className={styles.itemDetailSubContainer}>
          <img
            src={imgSrc}
            alt="itemDetail"
            className={styles.itemDetailImageStyle}
          />
          <div className={styles.itemDetailContentContainer}>
            {this.renderItemDetailHeader()}
            <p className={styles.itemDetailDescriptionStyle}>{description}</p>
            {this.renderItemDetailFooter()}
          </div>
        </div>
      </div>
    );
  }
}

ItemDetail.protoTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  cost: PropTypes.string.isRequired,
  imgSrc: PropTypes.string,
  handleOnClick: PropTypes.func.isRequired,
  counterId: PropTypes.string.isRequired,
  sendQuantityData: PropTypes.func,
};
