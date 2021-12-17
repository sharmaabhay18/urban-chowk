import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "components/Button";

import styles from "./testimonialCard.module.scss";

export default class TestimonialCard extends Component {
  render() {
    const { imgSrc, name, description, avatar, isDelete, handleDelete } =
      this.props;
    return (
      <div className={styles.testimonialCardContainer}>
        <img
          src={imgSrc}
          alt="testimonialCard"
          className={styles.testimonialCardImageStyle}
        />
        <div className={styles.testimonialCardContentStyle}>
          <div className={styles.testimonialCardHeaderStyle}>
            <img
              src={avatar}
              alt="avatar"
              className={styles.testimonialCardAvatarStyle}
            />
            <h2 className={styles.testimonialCardNameStyle}>{name}</h2>
          </div>
          <span className={styles.testimonialCardDescriptionStyle}>
            {description}
          </span>
          {isDelete && (
            <div
              style={{
                margin: "10px 5px",
              }}
            >
              <Button
                onClick={handleDelete}
                variant="primary"
                className={styles.buttonStyle}
              >
                Delete
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

TestimonialCard.protoTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  imgSrc: PropTypes.string,
  isDelete: PropTypes.bool,
  handleDelete: PropTypes.func,
};
