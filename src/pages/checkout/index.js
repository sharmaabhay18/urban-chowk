import React, { Component } from "react";

import { connect } from "react-redux";

import CheckoutCard from "components/CheckoutCard";
import Button from "components/Button";

import {
  getCheckoutListAction,
  removeCheckoutListAction,
  updateCounterCheckoutAction,
} from "redux/actions";

import styles from "./checkout.module.scss";

class Checkout extends Component {
  componentDidMount() {
    this.props.getCheckoutListAction();
  }

  getData = (val) => {
    this.props.updateCounterCheckoutAction(val);
  };

  handleProceedButton = () => {
    const { history } = this.props;

    history.push("/payment ");
  };

  render() {
    const { checkoutList, removeCheckoutListAction } = this.props;

    return (
      <div className={styles.checkoutMainContainer}>
        <div className={styles.headerContainer}>
          <h3>Checkout Items</h3>
          <Button
            className={styles.editButtonStyle}
            variant="secondary"
            onClick={() => this.handleProceedButton()}
          >
            Proceed to Buy
          </Button>
        </div>
        {checkoutList && checkoutList.length > 0 ? (
          checkoutList.map((checkoutItem) => (
            <CheckoutCard
              key={checkoutItem.counterId}
              counterId={checkoutItem.counterId}
              imgSrc={checkoutItem.imgSrc}
              title={checkoutItem.name}
              description={checkoutItem.type}
              cost={checkoutItem.cost}
              quantity={checkoutItem.quantity}
              sendQuantityData={this.getData}
              onClickRemove={removeCheckoutListAction}
            />
          ))
        ) : (
          <h1>No Items Added</h1>
        )}

        <br />
      </div>
    );
  }
}

const mapDispatchToProps = {
  getCheckoutListAction,
  removeCheckoutListAction,
  updateCounterCheckoutAction,
};

const mapStateToProps = ({ checkoutListReducer: checkoutListState }) => {
  return { checkoutList: checkoutListState.checkoutItems };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
