import React, { Component } from "react";
import PropTypes from "prop-types";

import styles from "./quantityCounter.module.scss";

export default class QuantityCounter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantityPaylod: {
        counterId: props.counterId ? props.counterId : 1,
        quantity: props.quantity ? props.quantity : 1,
      },
    };
  }

  _handleIncrement = (e) => {
    e.stopPropagation();
    let currentQuantity = this.state.quantityPaylod.quantity;
    this.setState(
      {
        quantityPaylod: {
          ...this.state.quantityPaylod,
          quantity: currentQuantity + 1,
        },
      },
      () => this.props.sendQuantityData(this.state.quantityPaylod)
    );
  };

  _handleDecrement = (e) => {
    e.stopPropagation();
    let currentQuantity = this.state.quantityPaylod.quantity;
    currentQuantity > 1 &&
      this.setState(
        {
          quantityPaylod: {
            ...this.state.quantityPaylod,
            quantity: currentQuantity - 1,
          },
        },
        () => this.props.sendQuantityData(this.state.quantityPaylod)
      );
  };

  render() {
    const { quantityHeaderStyle, quantityBoxStyle, quantityContainer } =
      this.props;
    return (
      <div
        className={
          quantityContainer ? quantityContainer : styles.quantityContainer
        }
      >
        <span className={quantityHeaderStyle && quantityHeaderStyle}>Quantity</span>
        <button
          onClick={this._handleDecrement}
          className={
            quantityBoxStyle ? quantityBoxStyle : styles.quantityBoxContainer
          }
        >
          {" "}
          -{" "}
        </button>
        <span className={quantityHeaderStyle && quantityHeaderStyle}>
          {" "}
          {this.state.quantityPaylod.quantity}
        </span>
        <button
          onClick={this._handleIncrement}
          className={
            quantityBoxStyle ? quantityBoxStyle : styles.quantityBoxContainer
          }
        >
          {" "}
          +{" "}
        </button>
      </div>
    );
  }
}

QuantityCounter.propTypes = {
  counterId: PropTypes.string.isRequired,
  sendQuantityData: PropTypes.func,
  quantityHeaderStyle: PropTypes.string,
  quantityBoxStyle: PropTypes.string,
  quantityContainer: PropTypes.string,
};
