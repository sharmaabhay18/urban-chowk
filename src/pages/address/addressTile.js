import React, { Component } from "react";
import { connect } from "react-redux";

import AddressCard from "components/AddressCard";

import { updateOrderListAction, deleteAddressAction } from "redux/actions";

import styles from "./address.module.scss";

class AddressTile extends Component {
  render() {
    const {
      addressList,
      userName,
      history,
      updateOrderListAction,
      orderPayload,
      deleteAddressAction,
    } = this.props;

    const handleDeleteBtn = (id) => {
      deleteAddressAction(id);
    };

    return (
      <React.Fragment>
        <div className={styles.addressTileMainContainer}>
          <div className={styles.addressTileContainer}>
            {addressList && addressList.length !== 0 ? (
              addressList.map(
                (
                  { address, landmark, city, state, pincode, _id },
                  index,
                  array
                ) => (
                  <AddressCard
                    key={index}
                    name={userName}
                    address={address}
                    landmark={landmark}
                    state={state}
                    city={city}
                    pincode={pincode}
                    handleDeleteBtn={() => handleDeleteBtn(_id)}
                    handleOnClick={() => {
                      const addressPayload = {
                        address,
                        city,
                        state,
                        pincode,
                      };

                      updateOrderListAction({
                        ...orderPayload,
                        selectedAddress: { ...addressPayload },
                      });
                      history.push("/payment");
                    }}
                  />
                )
              )
            ) : (
              <div
                style={{
                  height: "200px",
                  width: "100%",
                  marginLeft: "-20px",
                }}
              >
                <h3>Please add at least one address.</h3>
              </div>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = {
  updateOrderListAction,
  deleteAddressAction,
};

const mapStateToProps = ({ localOrderReducer }) => {
  return {
    orderPayload: localOrderReducer.orderDetails,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddressTile);
