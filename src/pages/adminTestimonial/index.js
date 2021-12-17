import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import { spinnerAction, getTestimonialAction, deleteTestimonialAction } from "redux/actions";

import { isAdminLoggedIn } from "utils/helperFunction";
import Button from "components/Button";
import Spinner from "components/Spinner";
import TestimonialCard from "components/TestimonialCard";

import styles from "./adminTestimonial.module.scss";

const AdminTestimonial = ({
  testimonialData,
  getTestimonialAction,
  fetching,
  deleteTestimonialAction,
  spinnerAction
}) => {
  const history = useHistory();

  useEffect(() => {
    isAdminLoggedIn(history);
    spinnerAction(true);
    getTestimonialAction((val) => spinnerAction(val));
  }, [getTestimonialAction, history, spinnerAction]);

  const renderData = () => {
    return (
      <div className={styles.cardContainer}>
        {testimonialData &&
          testimonialData.map((item, index) => {
            return (
              <div style={{ margin: "20px" }} key={index}>
                <TestimonialCard
                  name={item.name}
                  description={item.description}
                  avatar={item.icon}
                  imgSrc={item.image_url}
                  isDelete={true}
                  handleDelete={() => {
                    deleteTestimonialAction(item._id);
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
        <h1 style={{ textAlign: "center" }}>Admin Testimonial</h1>

        <Button
          onClick={() => history.push("/add-testimonial")}
          variant="primary"
          className={styles.buttonStyle}
        >
          Add Testimonial
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
  getTestimonialAction,
  deleteTestimonialAction,
  spinnerAction
};

const mapStateToProps = ({ testimonialReducer: testimonialState }) => {
  const { testimonialData } = testimonialState;

  return {
    fetching: testimonialState.fetching,
    apiError: testimonialState.apiError,
    testimonialData,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminTestimonial);
