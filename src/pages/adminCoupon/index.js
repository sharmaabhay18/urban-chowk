import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import { getCouponAction, spinnerAction, deleteCouponAction } from "redux/actions";

import { isAdminLoggedIn } from "utils/helperFunction";
import Button from "components/Button";
import Spinner from "components/Spinner";
import CouponCard from "components/CouponCard";

import styles from "./adminCoupon.module.scss";

const AdminCoupon = ({
  couponData,
  getCouponAction,
  fetching,
  deleteCouponAction,
  spinnerAction
}) => {
  const history = useHistory();

  useEffect(() => {
    isAdminLoggedIn(history);
    spinnerAction(true);
    getCouponAction((v) => spinnerAction(v));
  }, [getCouponAction, history, spinnerAction]);

  const renderData = () => {
    return (
      <div className={styles.cardContainer}>
        {couponData &&
          Array.isArray(couponData) &&
          couponData.map((item, index) => {
            return (
              <div style={{ margin: "20px" }} key={index}>
                <CouponCard
                  name={item.code}
                  discount={item.discount}
                  isDelete={true}
                  handleDelete={() => {
                    deleteCouponAction(item._id);
                  }}
                />
              </div>
            );
          })}
      </div>
    );
  };

  return (
    <div style={{ margin: "10px" }}>
      <Button
        onClick={() => history.push("/admin-dashboard")}
        variant="primary"
        className={styles.buttonStyle}
      >
        Admin Dashboard
      </Button>
      <div className={styles.mainContainer}>
        <h1 style={{ textAlign: "center" }}>Admin Coupon</h1>

        <Button
          onClick={() => history.push("/add-coupon")}
          variant="primary"
          className={styles.buttonStyle}
        >
          Add Coupon
        </Button>
        {fetching ? (
          <div style={{ margin: "200px" }}>
            <Spinner scale={0.4} color="#ea1a20" />
          </div>
        ) : (
          renderData()
        )}
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  getCouponAction,
  deleteCouponAction,
  spinnerAction
};

const mapStateToProps = ({ couponReducer: couponState }) => {
  const { couponData } = couponState;

  return {
    fetching: couponState.fetching,
    apiError: couponState.apiError,
    couponData,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminCoupon);
