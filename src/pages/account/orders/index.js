import React, { Component } from "react";
import { connect } from "react-redux";

import moment from "moment";

import { getOrderAction, spinnerAction } from "redux/actions";
import config from "utils/configConstant";
import AccountNavBar from "pages/account/accountNavBar";
import AccountHeader from "pages/account/accountHeader";
import OrderCard from "components/OrderCard";

import { checkAdmin } from "utils/helperFunction"

import styles from "./orders.module.scss";

class Orders extends Component {
  handleSpinner = (flag) => this.props.spinnerAction(flag);

  componentDidMount() {
    const data = localStorage.getItem(config.AUTH_TOKEN);
    if (!data || checkAdmin()) return this.props.history.push("/");

    this.handleSpinner(true);
    this.props.getOrderAction(this.handleSpinner);
  }
  render() {
    const {
      location: { pathname },
      customerOrder,
    } = this.props;
    const routeName = pathname.replace("/", "");

    return (
      <div>
        <AccountHeader routeName={routeName} />
        <div className={styles.mainContainer}>
          <AccountNavBar />
          <div className={styles.orderContainer}>
            <h3>Orders</h3>
            {customerOrder && customerOrder.length !== 0 ? (
              customerOrder.map(
                ({
                  _id,
                  status,
                  totalCost,
                  itemPayload,
                  created_on,
                }) => {
                  return (
                    <OrderCard
                      key={_id}
                      id={_id}
                      status={status}
                      items={itemPayload.map((item) =>
                        Object.assign(
                          {},
                          {
                            itemName: item.itemName,
                            itemQuantity: item.quantity,
                          }
                        )
                      )}
                      price={totalCost && Number(totalCost).toFixed(2)}
                      paymentType={"COD"}
                      orderDate={moment(created_on).format("YYYY-MM-DD")}
                    />
                  );
                }
              )
            ) : (
              <h1 className={styles.alignCenter}>No Order Placed!</h1>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  spinnerAction,
  getOrderAction,
};

const mapStateToProps = ({ orderReducer }) => {
  return {
    customerOrder: orderReducer?.orderData,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
