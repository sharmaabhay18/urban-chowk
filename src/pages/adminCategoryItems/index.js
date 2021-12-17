import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { connect } from "react-redux";

import { spinnerAction, getItemAction, deleteItemAction } from "redux/actions";

import { isAdminLoggedIn } from "utils/helperFunction";
import Button from "components/Button";
import Spinner from "components/Spinner";
import ItemCard from "components/ItemCard";


import styles from "./adminCategoryItems.module.scss";

const AdminCategoryItems = ({
  itemData,
  getItemAction,
  fetching,
  deleteItemAction,
  spinnerAction
}) => {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    isAdminLoggedIn(history);
    spinnerAction(true);
    getItemAction(location.state.id, (val) => spinnerAction(val));

  }, [getItemAction, history, spinnerAction]);

  const renderData = () => {
    return (
      <div className={styles.cardContainer}>
        {itemData &&
          itemData.map((item, index) => {
            return (
              <div style={{ margin: "20px" }} key={index}>
                <ItemCard
                  title={item.name}
                  subTitle={item.description}
                  price={item.price}
                  imgSrc={item.icon}
                  isDelete={true}
                  handleDelete={() => {
                    deleteItemAction(item._id, location.state.id);
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
        <h1 style={{ textAlign: "center" }}>Admin Items</h1>

        <Button
          onClick={() => history.push({ pathname: "/add-items", state: { id: location.state.id } })}
          variant="primary"
          className={styles.buttonStyle}
        >
          Add Items
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
  getItemAction,
  deleteItemAction,
  spinnerAction
};

const mapStateToProps = ({ itemsReducer: itemState }) => {
  const { itemData } = itemState;
  return {
    fetching: itemState.fetching,
    apiError: itemState.apiError,
    itemData,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminCategoryItems);
