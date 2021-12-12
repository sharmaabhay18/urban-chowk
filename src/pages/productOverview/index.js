import React, { Component } from "react";
import { connect } from "react-redux";

import {
  updateCheckoutListAction,
  getItemAction,
  spinnerAction,
  getItemByIdAction
} from "redux/actions";
import ItemDetail from "components/ItemDetail";
import ProductList from "pages/productList";

import { notifySuccessToast, notifyErrorToast } from "utils/helperFunction";
import { checkAdmin } from "utils/helperFunction";

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
      history,
      match: { params },
      getItemByIdAction
    } = this.props;

    if (checkAdmin()) {
      notifyErrorToast("Please login as cutomer")
      return history.push("/")
    };

    spinnerAction(true);
    if (state === undefined) {
      params && params.id && getItemByIdAction(params?.id, () => spinnerAction(false))
    } else {
      getItemAction(
        state && state.selectedProduct && state.selectedProduct.categoryId,
        () => spinnerAction(false)
      );
    }


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
      productPayload,
      selectedProduct,
    } = this.props;

    const { quantity } = this.state;
    return (
      <React.Fragment>
        {selectedProduct && selectedProduct ? (
          <React.Fragment>
            <ItemDetail
              name={selectedProduct.name}
              description={selectedProduct.description}
              cost={selectedProduct.price}
              imgSrc={selectedProduct.icon}
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
          <div className={styles.emptyProductContainer}>
            <h1>Oops! No such Item available.</h1>
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ itemsReducer }, { match: { params }, location: { state } }) => {
  let getProductList;
  let selectedProduct;

  if (itemsReducer?.itemData !== undefined) {
    getProductList =
      itemsReducer?.itemData &&
      itemsReducer?.itemData.filter((item) => {
        return item._id !== params?.id;
      });
    if (state !== undefined) {
      selectedProduct = state.selectedProduct;
    } else {
      if (params?.id) {
        const [payload] = itemsReducer && itemsReducer?.itemData.filter(
          (product) => product._id === params?.id
        );
        selectedProduct = payload
      }
    }
  }
  return {
    productPayload: getProductList,
    selectedProduct: selectedProduct
  };
};

const mapDispatchToProps = {
  updateCheckoutListAction,
  getItemAction,
  spinnerAction,
  getItemByIdAction
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductOverview);
