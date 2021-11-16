import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import styles from "./header.module.scss";

class NavigationBar extends Component {
  render() {
    const { categoryState } = this.props;
    return (
      <React.Fragment>
        {categoryState && categoryState !== undefined && (
          <div className={styles.bottomNavigationContainer}>
            {categoryState &&
              categoryState !== undefined &&
              categoryState.map((item) => (
                <button
                  className={styles.navButtonStyle}
                  key={item.name}
                  onClick={() => {}}
                >
                  <img
                    src={item.icon}
                    alt={item.name}
                    className={styles.navButtonImageStyle}
                  />
                  <h5 className={styles.navButtonTextStyle}>{item.name}</h5>
                </button>
              ))}
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default withRouter(NavigationBar);
