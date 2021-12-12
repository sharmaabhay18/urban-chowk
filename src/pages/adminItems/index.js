import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import { spinnerAction, getAllItemAction, deleteItemAction } from "redux/actions";

import { isAdminLoggedIn } from "utils/helperFunction";
import Button from "components/Button";
import Spinner from "components/Spinner";
import ItemCard from "components/ItemCard";

import styles from "./adminItems.module.scss";

const AdminItem = ({
  allItemData,
  getAllItemAction,
  fetching,
  deleteItemAction,
  spinnerAction
}) => {
  const history = useHistory();

  useEffect(() => {
    isAdminLoggedIn(history);
    spinnerAction(true);
    getAllItemAction((val) => spinnerAction(val));
  }, [getAllItemAction, history, spinnerAction]);

  const renderData = () => {
    return (
      <div className={styles.cardContainer}>
        {allItemData &&
          allItemData.map((item, index) => {
            return (
              <div style={{ margin: "20px" }} key={index}>
                <ItemCard
                  name={item.name}
                  description={item.description}
                  imgSrc={item.icon}
                  price={item.price}
                  isDelete={true}
                  handleDelete={() => {
                    deleteItemAction(item._id);
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
        <h1>Admin Item</h1>

        <Button
          onClick={() => history.push("/add-item")}
          variant="primary"
          className={styles.buttonStyle}
        >
          Add Item
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
  getAllItemAction,
  deleteItemAction,
  spinnerAction
};

const mapStateToProps = ({ allItemsReducer: itemsState }) => {
  const { allItemData } = itemsState;

  console.log("itemData", allItemData);
  console.log("itemState", itemsState);
  
  return {
    fetching: itemsState.fetching,
    apiError: itemsState.apiError,
    allItemData,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminItem);
