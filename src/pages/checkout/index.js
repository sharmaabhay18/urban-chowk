import React, { Component } from "react";

import { connect } from "react-redux";

import CheckoutCard from "components/CheckoutCard";
import Button from "components/Button";

import {
  getCheckoutListAction,
  removeCheckoutListAction,
  updateCounterCheckoutAction,
  updateOrderListAction,
} from "redux/actions";
import config from "utils/configConstant";
import { notifyErrorToast, checkAdmin } from "utils/helperFunction";
import styles from "./checkout.module.scss";

class Checkout extends Component {
  componentDidMount() {
    if (checkAdmin()) return this.props.history.push("/");
    this.props.getCheckoutListAction();
  }

  getData = (val) => {
    this.props.updateCounterCheckoutAction(val);
  };

  handleProceedButton = () => {
    const { history, checkoutList, updateOrderListAction } = this.props;
    const data = localStorage.getItem(config.AUTH_TOKEN);
    if (!data) {
      return notifyErrorToast("You need to login to proceed!");
    }

    if (checkoutList !== undefined) {
      const itemPayload = checkoutList.map((item) =>
        Object.assign(
          {},
          {
            itemName: item.name,
            itemId: item.counterId,
            quantity: item.quantity,
          }
        )
      );
      const totalCost = checkoutList
        .map((item) => item.cost)
        .reduce((sum, current) => sum + current, 0);

      updateOrderListAction({ itemPayload: [...itemPayload], totalCost });

      history.push("/address");
    } else {
      notifyErrorToast("Checkout cart cannot be empty!");
    }
  };

  render() {
    const { checkoutList, removeCheckoutListAction } = this.props;

    return (
      <div className={styles.checkoutMainContainer}>
        <div className={styles.headerContainer}>
          <h1>Checkout Items</h1>
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
  updateOrderListAction,
};

const mapStateToProps = ({ checkoutListReducer: checkoutListState }) => {
  return { checkoutList: checkoutListState.checkoutItems };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
