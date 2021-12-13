import React, { Component } from "react";
import { connect } from "react-redux";

import moment from "moment";

import { getAdminOrderAction, spinnerAction, updateOrderStatus } from "redux/actions";
import config from "utils/configConstant";
import OrderCard from "components/OrderCard";

import { isAdminLoggedIn } from "utils/helperFunction";

import styles from "./adminDelivery.module.scss";

class Orders extends Component {
    handleSpinner = (flag) => this.props.spinnerAction(flag);

    componentDidMount() {
        const data = localStorage.getItem(config.AUTH_TOKEN);
        if (!data) return this.props.history.push("/");

        isAdminLoggedIn(this.props.history);

        this.handleSpinner(true);
        this.props.getAdminOrderAction(this.handleSpinner);
    }
    render() {
        const {
            customerOrder,
            updateOrderStatus
        } = this.props;

        const handleStatusUpdate = (id, status) => {
            this.handleSpinner(true);
            updateOrderStatus(status, id, this.handleSpinner);
        }

        const options = [
            'PENDING', 'CANCEL', 'DELIVERED'
        ];

        return (
            <React.Fragment>
                <div className={styles.mainContainer}>
                    <h1></h1>
                    <h2></h2>
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
                                            handleStatusUpdate={(status) => handleStatusUpdate(_id, status)}
                                            options={options}
                                        />
                                    );
                                }
                            )
                        ) : (
                            <h1 className={styles.alignCenter}>No Order Present!</h1>
                        )}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = {
    spinnerAction,
    getAdminOrderAction,
    updateOrderStatus
};

const mapStateToProps = ({ allOrderReducer }) => {
    return {
        customerOrder: allOrderReducer?.allOrderData,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
