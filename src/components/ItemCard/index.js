import React, { Component } from "react";
import PropTypes from "prop-types";

import Button from "components/Button";
import styles from "./itemCard.module.scss";

class ItemCard extends Component {
  render() {
    const {
      title,
      subTitle,
      price,
      imgSrc,
      handleOnCardClick,
      handleOnButtonClick,
      itemKey,
    } = this.props;

    const itemDetail = {
      cost: price,
      name: title,
      type: subTitle,
      imgSrc,
    };

    return (
      <div
        key={itemKey}
        onClick={handleOnCardClick}
        className={styles.itemCardContainer}
      >
        <img src={imgSrc} alt="item" className={styles.itemCardImageStyle} />
        <div className={styles.itemCardContentContainer}>
          <h5 className={styles.itemCardTitleStyle}>{title}</h5>
          <h5 className={styles.itemCardSubTitleStyle}>{subTitle}</h5>
          <div className={styles.itemCardFooterStyle}>
            <h5 className={styles.itemCardPriceStyle}>₹ {price}</h5>
            <Button
              onClick={(event) => {
                event.stopPropagation();
                handleOnButtonClick(itemDetail);
              }}
            >
              ADD TO CART
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default ItemCard;

ItemCard.protoTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  imgSrc: PropTypes.string,
  price: PropTypes.string.isRequired,
  handleOnButtonClick: PropTypes.func.isRequired,
  handleOnCardClick: PropTypes.func.isRequired,
};
