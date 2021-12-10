import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { connect } from "react-redux";

import { withRouter } from "react-router-dom";

import {
  // updateCheckoutListAction,
  getItemAction,
  spinnerAction,
} from "redux/actions";

import Spinner from "components/Spinner";
import ItemCard from "components/ItemCard";

// import {
//   notifySuccessToast,
//   getProductBasedOnCategoryName,
// } from "utils/helperFucntion";

import styles from "./productList.module.scss";

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
    };
  }
  // onClickSuccess = (productPayload) => {
  //   const { updateCheckoutListAction } = this.props;

  //   updateCheckoutListAction({
  //     ...productPayload,
  //     quantity: 1,
  //   });
  //   notifySuccessToast("Item added successfully to cart!", 500);
  // };

  async componentDidMount() {
    const {
      location: { state },
      match: {
        params: { type },
      },
      getItemAction,
      spinnerAction,
    } = this.props;
    this.updateWindowDimensions();

    if (type !== undefined) {
      spinnerAction(true);
      getItemAction(state && state.id, () => spinnerAction(false));
    }

    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions = () => this.setState({ height: window.innerHeight });

  render() {
    const {
      match: {
        params: { type },
      },
      history,
      fetching,
      itemData,
    } = this.props;

    const { height } = this.state;
    return (
      <div className={styles.productMainContainer}>
        <div className={styles.mainProductWrapContainer}>
          <div className={styles.titleContainer}>
            <div
              className={classNames(
                styles.wrapTitleContainer,
                styles.productWrapTitleContainer
              )}
            >
              <h3 style={{ textTransform: "capitalize", fontSize: "24px" }}>
                {type}
              </h3>
            </div>
          </div>
          {fetching ? (
            <div
              className={styles.spinnerStyleContainer}
              style={{
                height: height,
              }}
            >
              <Spinner className={styles.spinnerStyle} />
            </div>
          ) : itemData && itemData.length > 0 ? (
            <div className={styles.productWrapContainer}>
              {itemData.map((item, index) => {
                return (
                  <div key={index} className={styles.itemContainer}>
                    <ItemCard
                      key={index}
                      itemKey={index}
                      title={item.name}
                      imgSrc={item.icon}
                      price={item.price}
                      subTitle={item.description}
                      counterId={item._id}
                      handleOnButtonClick={() => {}}
                      handleOnCardClick={() => {
                        const [selectedProduct] = itemData.filter(
                          (product) => product._id === item._id
                        );

                        history.push(`/product/${item._id}`, {
                          selectedProduct: selectedProduct,
                          itemData: itemData,
                        });
                      }}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className={styles.emptyProductContainer}>
              <h1>Oops! All item sold out.</h1>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (
  { itemsReducer: itemsState },
  { suggestedProduct }
) => {
  const { itemData } = itemsState;
  let payload = itemData;
  if (suggestedProduct !== undefined) {
    payload = suggestedProduct;
  }

  return {
    fetching: itemsState.fetching,
    apiError: itemsState.apiError,
    itemData: payload,
  };
};

const mapDispatchToProps = {
  getItemAction,
  spinnerAction,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductList)
);

ProductList.propTypes = {
  productList: PropTypes.array,
};
