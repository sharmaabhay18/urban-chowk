import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import CategoryCard from "components/CategoryCard";
import styles from "./home.module.scss";

const Category = ({ categoryData }) => {
  const history = useHistory();
  return (
    <div>
      {categoryData && categoryData !== undefined && (
        <div className={styles.categoryListMainContainer}>
          <div className={styles.mainWrapContainer}>
            <div className={styles.categoryCardWrapContainer}>
              <h3>Explore by Category</h3>
            </div>
            <div className={styles.categoryCardWrapContainer}>
              <p>Everything we have. Everything you need.</p>
            </div>
            <div className={styles.categoryCardWrapContainer}>
              {categoryData &&
                categoryData !== undefined &&
                categoryData.map((category, index) => {
                  return (
                    <CategoryCard
                      key={index}
                      title={category.name}
                      imgSrc={category.icon}
                      subTitle={category.description}
                      handleOnClick={() => {
                        history.push(`/category/${category.name}`, {
                          title: `Category: ${category.name}`,
                          id: category._id,
                        });
                      }}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
const mapStateToProps = ({ categoryReducer: categoryState }) => {
  const { categoryData } = categoryState;
  return {
    fetching: categoryState.fetching,
    apiError: categoryState.apiError,
    categoryData,
  };
};

export default connect(mapStateToProps)(Category);
