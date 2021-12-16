import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Link from "components/Link";
import imageConstants from "utils/imageConstants";

import footerConstants from "./footerConstants";
import styles from "./footer.module.scss";

class Footer extends Component {
  renderAddressComponent = () => (
    <div className={styles.footerAddressContainer}>
      <h2>Contact Info</h2>
      <ul>
        <li className={styles.footerListItemStyle}>Urban Chowk Pvt Ltd</li>
        <li className={styles.footerListItemStyle}>525 River St,</li>
        <li className={styles.footerListItemStyle}>Hoboken, NJ</li>
        <li className={styles.footerListItemStyle}>07030</li>
      </ul>
    </div>
  );

  renderSocialComponent = () => (
    <div className={styles.footerSocialContainer}>
      <div>
        <h3>Follow Us On</h3>
        <div className={styles.footerSocialIconContainer}>
          <Link to={footerConstants.FACEBOOK_LINK}>
            <img
              src={imageConstants.FACEBOOK_ICON}
              alt="fb logo"
              className={styles.socialIconStyle}
            />
          </Link>
          <Link to={footerConstants.INSTAGRAM_LINK}>
            <img
              src={imageConstants.INSTAGRAM_ICON}
              alt="insta logo"
              className={styles.socialIconStyle}
            />
          </Link>

          <Link to={footerConstants.TWITTER_LINK}>
            <img
              src={imageConstants.TWITTER_ICON}
              alt="twitter logo"
              className={styles.socialIconStyle}
            />
          </Link>
        </div>
      </div>
    </div>
  );

  render() {
    return (
      <footer className={styles.footerContainer}>
        <img
          src={imageConstants.PRIMARY_ICON}
          alt="primary logo"
          className={styles.primaryIconStyle}
        />
        <div className={styles.footerContentContainer}>
          {this.renderAddressComponent()}
          {this.renderSocialComponent()}
        </div>
      </footer>
    );
  }
}

const mapStateToProps = ({ categoryReducer, itemReducer }) => {
  return {
    productPayload: itemReducer?.productPayload?.result?.result,
    categoryState: categoryReducer?.categoryList?.result?.result,
  };
};

export default withRouter(connect(mapStateToProps)(Footer));
