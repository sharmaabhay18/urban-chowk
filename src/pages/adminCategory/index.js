import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import { spinnerAction, getCategoryAction, deleteCategoryAction } from "redux/actions";

import { isAdminLoggedIn } from "utils/helperFunction";
import Button from "components/Button";
import Spinner from "components/Spinner";
import CategoryCard from "components/CategoryCard";

import styles from "./adminCategory.module.scss";

const AdminCategory = ({
  categoryData,
  getCategoryAction,
  fetching,
  deleteCategoryAction,
  spinnerAction
}) => {
  const history = useHistory();

  useEffect(() => {
    isAdminLoggedIn(history);
    spinnerAction(true);
    getCategoryAction((val) => spinnerAction(val));
  }, [getCategoryAction, history, spinnerAction]);

  const renderData = () => {
    return (
      <div className={styles.cardContainer}>
        {categoryData &&
          categoryData.map((item, index) => {
            return (
              <div style={{ margin: "20px" }} key={index}>
                <CategoryCard
                  title={item.name}
                  subTitle={item.description}
                  avatar={item.icon}
                  imgSrc={item.icon}
                  isDelete={true}
                  handleDelete={() => {
                    deleteCategoryAction(item._id);
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
        <h1 style={{ textAlign: "center" }}>Admin Category</h1>

        <Button
          onClick={() => history.push({pathname: "/add-category", state: {update: true} })}
          variant="primary"
          className={styles.buttonStyle}
        >
          Add Category
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
  getCategoryAction,
  deleteCategoryAction,
  spinnerAction
};

const mapStateToProps = ({ categoryReducer: categoryState }) => {
  const { categoryData } = categoryState;

  return {
    fetching: categoryState.fetching,
    apiError: categoryState.apiError,
    categoryData,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminCategory);
