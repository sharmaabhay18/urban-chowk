import React, { useEffect } from "react";
import { connect } from "react-redux";

import {
  getCategoryAction,
  spinnerAction,
  getTestimonialAction,
} from "redux/actions";

import Carousel from "components/Carousel";
import Category from "pages/home/category";
import TestimonialList from "pages/home/testimonialList";
import QualityCheck from "pages/home/qualityCheck";

const Home = ({ getCategoryAction, spinnerAction, getTestimonialAction }) => {
  useEffect(() => {
    spinnerAction(true);
    getCategoryAction(() => spinnerAction(false));
    getTestimonialAction(() => spinnerAction(false));
  }, [getCategoryAction, spinnerAction, getTestimonialAction]);

  return (
    <div>
      <Carousel />
      <QualityCheck />
      <Category />
      <TestimonialList />
    </div>
  );
};

const mapDispatchToProps = {
  getCategoryAction,
  spinnerAction,
  getTestimonialAction,
};

export default connect(null, mapDispatchToProps)(Home);

