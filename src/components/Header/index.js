import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { GiHamburgerMenu, GiShoppingCart } from "react-icons/gi";
import { TiLocation } from "react-icons/ti";
import { MdAccountCircle, MdOutlineDashboardCustomize } from "react-icons/md";
import { FaUserAlt, FaHome } from "react-icons/fa";

import {
  getAllItemAction,
  spinnerAction
} from "redux/actions"

import Link from "components/Link";
import SearchBar from "components/SearchBar";
import Button from "components/Button";

import imageConstants from "utils/imageConstants";
import config from "utils/configConstant";
import { checkAdmin } from "utils/helperFunction"

import NavigationBar from "./navigationBar";
import styles from "./header.module.scss";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHidden: true,
    };
    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    const { spinnerAction, getAllItemAction } = this.props;
    spinnerAction(true);
    getAllItemAction(() => spinnerAction(false));
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  toggleSettings = () => this.setState({ isHidden: !this.state.isHidden });

  handleClickOutside(event) {
    if (
      this.wrapperRef &&
      this.wrapperRef.current &&
      !this.wrapperRef.current.contains(event.target)
    ) {
      this.toggleSettings();
    }
  }

  renderLogoAndButton = () => {
    return (
      <React.Fragment>
        <Link className={styles.navTextStyle} to="/">
          <FaHome className={styles.homeIconStyle} color="white" />

          <img
            src={imageConstants.PRIMARY_ICON}
            alt="primary logo"
            className={styles.primaryIconStyle}
          />
        </Link>
        <div onClick={() => this.props.history.push("/")} className={styles.locationButtonContainer}>
          <TiLocation className={styles.locationIconStyle} color="white" />
          <Button className={styles.headerButtonStyle}>Hoboken, NJ</Button>
        </div>
      </React.Fragment>
    );
  };

  renderSearchBar = () => {
    const { itemData } = this.props;

    const payload =
      itemData &&
      itemData.map((i) => {
        return {
          value: i._id,
          label: i.name,
          route: `/product/${i._id}`,
        };
      });

    return <SearchBar payload={payload} itemData={itemData} />;
  };

  renderCartValue = () => {
    const { checkoutList } = this.props;

    const numberOfItemInCart =
      checkoutList && checkoutList !== undefined ? checkoutList.length : 0;
    return (
      <div className={styles.cartItemStyle}>
        <p className={styles.cartItemTextStyle}>{numberOfItemInCart}</p>
      </div>
    );
  };

  renderLoggedInHeader = () => (
    <div
      className={
        !this.state.isHidden
          ? styles.expandedDefaultHeader
          : styles.centerNavElement
      }
    >
      <div
        style={{ display: "flex" }}
        onClick={!this.state.isHidden ? this.toggleSettings : undefined}
      >
        <MdAccountCircle className={styles.headerIconStyle} color="white" />
        <Link className={styles.navTextStyle} to="/profile">
          Account
        </Link>
      </div>
    </div>
  );

  renderAdminHeader = () => {
    const data = localStorage.getItem(config.ROLE);
    if (data === "admin") {
      return (
        <div
          className={
            !this.state.isHidden
              ? styles.expandedDefaultHeader
              : styles.centerNavElement
          }
        >
          <div
            style={{ display: "flex" }}
            onClick={!this.state.isHidden ? this.toggleSettings : undefined}
          >
            <MdOutlineDashboardCustomize className={styles.headerIconStyle} color="white" />
            <Link className={styles.navTextStyle} to="/admin-dashboard">
              Admin Dashboard
            </Link>
          </div>
        </div>
      )
    }
  }

  renderDefaultHeader = () => {
    const { isHidden } = this.state;
    return (
      <div
        className={
          !isHidden ? styles.expandedDefaultHeader : styles.centerNavElement
        }
      >
        <div
          style={{ display: "flex" }}
          onClick={!isHidden ? this.toggleSettings : undefined}
        >
          <FaUserAlt className={styles.headerIconStyle} color="white" />
          <Link className={styles.navTextStyle} to="/signup">
            Sign Up
          </Link>
        </div>
        <span className={styles.slashStyle}> / </span>
        <div
          style={{ display: "flex" }}
          onClick={!isHidden ? this.toggleSettings : undefined}
        >
          <Link className={styles.navTextStyle} to="/login">
            Login
          </Link>
        </div>
      </div>
    );
  };

  renderRightNavBar = () => {
    const { isHidden } = this.state;
    const data = localStorage.getItem(config.AUTH_TOKEN);

    return (
      <React.Fragment>
        <div
          ref={!isHidden && this.wrapperRef}
          className={
            !isHidden ? styles.expandHamburgerStyle : styles.navContainer
          }
          style={
            isHidden && data
              ? {
                justifyContent: "space-evenly",
              }
              : null
          }
        >
          {!isHidden && (
            <div
              className={
                !isHidden ? styles.expandedCartHeader : styles.centerNavElement
              }
            >
              <div
                style={{ display: "flex" }}
                onClick={!isHidden ? this.toggleSettings : undefined}
              >
                <FaHome className={styles.headerIconStyle} color="white" />
                <Link className={styles.navTextStyle} to="/">
                  Home
                </Link>
              </div>
            </div>
          )}
          {data ? this.renderLoggedInHeader() : this.renderDefaultHeader()}
          {this.renderAdminHeader()}
          {!checkAdmin() && <div
            className={!isHidden ? styles.displayNone : styles.centerNavElement}
          >
            <div
              style={{ display: "flex" }}
              onClick={!isHidden ? this.toggleSettings : undefined}
            >
              <Link className={styles.navTextStyle} to="/checkout">
                <div className={styles.cartIconContainerForWeb}>
                  {this.renderCartValue()}
                  <GiShoppingCart
                    className={styles.cartIconStyle}
                    color="white"
                  />
                </div>
                Cart
              </Link>
            </div>
          </div>}
        </div>
        <div className={styles.iconContainer}>
          <div className={styles.cartIconContainer}>
            {this.renderCartValue()}
            <GiShoppingCart
              onClick={() => this.props.history.push("/checkout")}
              className={styles.cartIconStyle}
              color="white"
            />
          </div>
          <div className={styles.hamburgerIconContainer}>
            <GiHamburgerMenu
              onClick={this.toggleSettings}
              className={styles.hamburgerIcon}
              color="white"
            />
          </div>
        </div>
      </React.Fragment >
    );
  };

  render() {
    return (
      <React.Fragment>
        <div className={styles.headerContainer}>
          {this.renderLogoAndButton()}
          {!checkAdmin() && this.renderSearchBar()}
          {this.renderRightNavBar()}
        </div>
        <NavigationBar />
      </React.Fragment>
    );
  }
}



const mapDispatchToProps = {
  getAllItemAction,
  spinnerAction
};


const mapStateToProps = ({
  allItemsReducer: allItemsState,
  checkoutListReducer,
}) => {
  return {
    itemData: allItemsState.allItemData,
    checkoutList: checkoutListReducer.checkoutItems,
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
