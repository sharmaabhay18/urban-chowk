import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import { isAdminLoggedIn } from "utils/helperFunction";
import Button from "components/Button";

import styles from "./adminDashboard.module.scss";

const AdminDashboard = ({ userPayload }) => {
  const history = useHistory();

  useEffect(() => {
    isAdminLoggedIn(history);
  }, [history]);

  return (
    <div className={styles.mainContainer}>
      <h1>Admin Dashboard</h1>
      <div className={styles.btnContainer}>
        <Button
          onClick={() => history.push("/admin-testimonial")}
          variant="primary"
          className={styles.buttonStyle}
        >
          Testimonial
        </Button>
        <Button
          onClick={() => {}}
          variant="primary"
          className={styles.buttonStyle}
        >
          Category
        </Button>
        <Button
          onClick={() => {}}
          variant="primary"
          className={styles.buttonStyle}
        >
          Items
        </Button>
        <Button
          onClick={() => {}}
          variant="primary"
          className={styles.buttonStyle}
        >
          Delivery
        </Button>
      </div>
    </div>
  );
};

export default AdminDashboard;
