import React, { Component } from "react";
import { Carousel as NCarousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import ImageConstant from "utils/imageConstants";

import styles from "./carousel.module.scss";

export default class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mounted: false,
    };
  }

  componentDidMount() {
    this.handleMount(true);
  }

  componentWillUnmount() {
    this.handleMount(false);
  }

  handleMount = (flag) => this.setState({ mounted: flag });

  renderCarousel = () => (
    <NCarousel
      autoPlay
      showArrows={false}
      showStatus={false}
      showThumbs={false}
      stopOnHover={false}
      infiniteLoop={true}
      transitionTime={800}
      interval={3000}
    >
      <div>
        <img
          src={ImageConstant.LANDING_ONE_ICON}
          className={styles.imageStyle}
          alt="landing"
        />
      </div>
      <div>
        <img
          src={ImageConstant.LANDING_TWO_ICON}
          className={styles.imageStyle}
          alt="landing"
        />
      </div>
    </NCarousel>
  );

  render() {
    return (
      <React.Fragment>
        {this.state.mounted && (
          <div className={styles.carouselMainContainer}>
            <div className={styles.carouselMainContainer}>
              <div className={styles.carouselTextContainer}>
                <h1>Best Quality Food Delivery With All Safety Checks.</h1>
              </div>
              {this.renderCarousel()}
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}
