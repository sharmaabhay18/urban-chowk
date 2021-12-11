import React, { Component } from "react";
import { connect } from "react-redux";

import {
  updateCheckoutListAction,
  getItemAction,
  spinnerAction,
} from "redux/actions";
import ItemDetail from "components/ItemDetail";
import ProductList from "pages/productList";

import { notifySuccessToast, notifyErrorToast } from "utils/helperFunction";

import styles from "./productOverview.module.scss";

class ProductOverview extends Component {
  constructor(props) {
    super(props);
    this.state = { quantity: 1 };
  }

  componentDidMount() {
    const {
      getItemAction,
      spinnerAction,
      location: { state },
    } = this.props;

    spinnerAction(true);
    getItemAction(
      state && state.selectedProduct && state.selectedProduct.categoryId,
      () => spinnerAction(false)
    );
  }

  getData = (val) => {
    this.setState({ quantity: val.quantity });
    return val;
  };

  onClickSuccess = (productPayload, quantity) => {
    const { updateCheckoutListAction } = this.props;
    updateCheckoutListAction(
      {
        ...productPayload,
        quantity: quantity,
      },
      true
    );
    notifySuccessToast("Item added successfully to cart!", 500);
  };

  render() {
    const {
      match: {
        params: { id },
      },
      location: { state },
      productPayload,
    } = this.props;

    const { quantity } = this.state;
    return (
      <React.Fragment>
        {state && state.selectedProduct ? (
          <React.Fragment>
            <ItemDetail
              name={state.selectedProduct.name}
              description={state.selectedProduct.description}
              cost={state.selectedProduct.price}
              imgSrc={state.selectedProduct.icon}
              handleOnClick={(productPayload) =>
                quantity === 0
                  ? notifyErrorToast("Please add at least one quantity!")
                  : this.onClickSuccess(productPayload, quantity)
              }
              sendQuantityData={this.getData}
              counterId={id}
            />
            {productPayload && productPayload.length > 0 && (
              <div className={styles.cardTitleWrapContainer}>
                <h3>You May Also Like To See</h3>
                <ProductList suggestedProduct={productPayload} />
              </div>
            )}
          </React.Fragment>
        ) : (
          <div style={{ height: "300px" }} />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ itemsReducer }, { location: { state } }) => {
  const getProductList =
    itemsReducer?.itemData &&
    itemsReducer?.itemData.filter((item) => {
      return item._id !== state?.selectedProduct._id;
    });

  return {
    productPayload: getProductList,
  };
};

const mapDispatchToProps = {
  updateCheckoutListAction,
  getItemAction,
  spinnerAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductOverview);
