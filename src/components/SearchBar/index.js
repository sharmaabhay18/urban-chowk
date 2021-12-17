import React, { Component } from "react";

import Select, { components } from "react-select";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";

import { getItemAction, spinnerAction } from "redux/actions";

import styles from "./searchBar.module.scss";

class SearchBar extends Component {
  render() {
    const { payload, itemData, history, spinnerAction, getItemAction } =
      this.props;

    const ValueContainer = ({ children, ...props }) => {
      return (
        components.ValueContainer && (
          <components.ValueContainer {...props}>
            {!!children && (
              <img
                src="https://img.icons8.com/ios-filled/25/000000/search.png"
                alt="tesst"
                className={styles.searchBarIconStyle}
              />
            )}
            {children}
          </components.ValueContainer>
        )
      );
    };

    return (
      <label><Select
        value=""
        onChange={(searchItem) => {
          const [selectedProduct] = itemData.filter(
            (product) => product._id === searchItem.value
          );

          spinnerAction(true);
          getItemAction(selectedProduct && selectedProduct.categoryId, () =>
            spinnerAction(false)
          );
          history.replace(searchItem.route, {
            selectedProduct: selectedProduct,
          });
        }}
        isSearchable
        placeholder="Search Item..."
        options={payload}
        styles={selectStyles}
        components={{ ValueContainer }}
      /></label>
    );
  }
}

const mapStateToProps = ({ itemReducer }) => {
  const productPayload = itemReducer?.productPayload?.result?.result;

  const searchPayload =
    productPayload &&
    productPayload.map((product) =>
      Object.assign(
        {},
        {
          route: `/product/${product._id}`,
          label: product.name,
          value: product._id,
        }
      )
    );

  return {
    searchPayload: searchPayload,
    productPayload: productPayload,
  };
};

const mapDispatchToProps = {
  getItemAction,
  spinnerAction,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SearchBar)
);

const selectStyles = {
  container: (base) => ({
    ...base,
  }),
  indicatorsContainer: (base) => ({
    display: "none",
  }),
  placeholder: (base) => ({
    ...base,
    color: "#767676"
  }),
  menu: (base) => ({
    ...base,
    "@media (min-width: 0) and (max-width: 340px)": {
      width: "220px",
      marginLeft: "10px",
    },
    "@media (min-width: 340px) and (max-width: 767px)": {
      width: "280px",
      marginLeft: "10px",
    },
    "@media (min-width: 768px) and (max-width: 991px)": {
      width: "350px",
      marginLeft: "25px",
    },
    "@media (min-width: 992px) and (max-width: 1200px)": {
      width: "380px",
    },
    width: "450px",
  }),
  control: (base, state) => {
    return {
      ...base,
      "@media (min-width: 0) and (max-width: 340px)": {
        width: "160px",
        margin: "0px 10px",
      },
      "@media (min-width: 340px) and (max-width: 767px)": {
        width: "200px",
        margin: "0px 10px",
      },
      "@media (min-width: 768px) and (max-width: 991px)": {
        width: "300px",
        margin: "0px 25px",
      },
      "@media (min-width: 992px) and (max-width: 1300px)": {
        width: "380px",
      },
      width: "450px",
      boxShadow: "none",
      height: "35px",
      border: "0px",
      borderRadius: "50px",
      fontSize: 16,
      textAlign: "left",
      cursor: "pointer",
      paddingLeft: "10px",
    };
  },
};
