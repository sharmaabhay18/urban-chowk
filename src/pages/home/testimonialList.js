import React from "react";
import { connect } from "react-redux";

import TestimonialCard from "components/TestimonialCard";
import styles from "./home.module.scss";

const TestimonialList = ({ testimonialData }) => {
  return (
    <div className={styles.mainWrapContainer} style={{ marginTop: "40px" }}>
      <div className={styles.testimonailCardTitleWrapContainer}>
        <h3>What Our Customers Say</h3>
      </div>
      <div className={styles.testimonailCardWrapContainer}>
        {testimonialData &&
          testimonialData.map((testimonial, index) => {
            return (
              <TestimonialCard
                key={index}
                name={testimonial.name}
                description={testimonial.description}
                imgSrc={testimonial.image_url}
                avatar={testimonial.icon}
              />
            );
          })}
      </div>
    </div>
  );
};
const mapStateToProps = ({ testimonialReducer: testimonialState }) => {
  const { testimonialData } = testimonialState;
  return {
    testimonialData,
  };
};

export default connect(mapStateToProps)(TestimonialList);
