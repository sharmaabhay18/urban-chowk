import React, { Component } from "react";
import { connect } from "react-redux";
import Avatar from "react-avatar-edit";
import { Formik, Form, Field } from "formik";

import config from "utils/configConstant";

import {
  getStorage,
  ref,
  getDownloadURL,
  uploadString,
} from "firebase/storage";
import EndpointMessage from "components/EndpointMessage";
import InputField from "components/Input";
import Constants from "utils/constants";

import {
  getUserInfoAction,
  spinnerAction,
  updateUserAction,
} from "redux/actions";
import Button from "components/Button";

import imageConstants from "utils/imageConstants";

import { EditProfileSchema } from "utils/formValidation";

import AccountNavBar from "pages/account/accountNavBar";
import AccountHeader from "pages/account/accountHeader";

import styles from "./profile.module.scss";

const storage = getStorage();

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      preview: imageConstants.AVATAR_ICON,
      isEdit: false,
      isFromEdit: false,
      name: "",
      mobile: "",
    };
  }

  onClose = () => this.setState({ preview: null });

  onCrop = (preview) => this.setState({ preview });

  onBeforeFileLoad = (elem) => {
    if (elem.target.files[0].size > 500000) {
      alert("File is too big!");
      elem.target.value = "";
    }
  };

  handleSpinner = (flag) => this.props.spinnerAction(flag);
  handleFormEdit = (val) => this.setState({ isFromEdit: val });

  componentDidUpdate(prevProps) {
    if (prevProps.userInfo !== this.props.userInfo) {
      this.props.spinnerAction(false);
    }
    if (this.props.userInfo && this.props.userInfo.mobile) {
      getDownloadURL(
        ref(storage, `image/${this.props.userInfo.mobile + ".jpeg"}`)
      )
        .then((url) => {
          this.setState({
            preview: url,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  componentDidMount() {
    const { history } = this.props;
    const data = localStorage.getItem(config.AUTH_TOKEN);
    if (!data) return history.push("/");
    this.handleSpinner(true);
    this.props.getUserInfoAction(this.handleSpinner);
  }

  handleApiCall = () => {
    const value = { name: this.state.name, mobile: this.state.mobile };
    this.handleSpinner(true);
    this.props.updateUserAction(value, this.handleSpinner, this.handleFormEdit);
  };

  renderEditForm = () => {
    const form = {
      name: this.state.name,
      mobile: this.state.mobile,
    };
    return (
      <Formik
        initialValues={form}
        validationSchema={EditProfileSchema}
        onSubmit={(values) => {
          this.handleApiCall(values);
        }}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit} noValidate autoComplete="off">
            <React.Fragment>
              <Field
                id="outlined-name-input"
                type="text"
                placeholder="Enter Name"
                name="name"
                containerClassname={styles.containerStyle}
                labelStyle={{
                  top: "0.9rem",
                }}
                inputClassName={styles.inputStyle}
                component={InputField}
                isRequired
                onTextChange={(e) => this.setState({ name: e })}
              />

              <Field
                id="outlined-mobile-input"
                type="text"
                placeholder="Enter Mobile Number"
                name="mobile"
                containerClassname={styles.containerStyle}
                labelStyle={{
                  top: "0.9rem",
                }}
                inputClassName={styles.inputStyle}
                component={InputField}
                isRequired
                onTextChange={(e) => this.setState({ mobile: e })}
              />
            </React.Fragment>
          </Form>
        )}
      </Formik>
    );
  };

  renderProfileDetail = () => {
    const { userInfo, apiError } = this.props;
    const { isFromEdit } = this.state;

    return (
      <div className={styles.profileDetailSubContainer}>
        <div className={styles.profileDetailStyle}>
          <div>
            <h4>Name: </h4>
            <h4>Mobile: </h4>
            <h4>Email:</h4>
          </div>
          <div>
            {isFromEdit ? (
              this.renderEditForm()
            ) : (
              <React.Fragment>
                <h4>{userInfo ? userInfo.name : ""}</h4>
                <h4>{userInfo ? userInfo.mobile : ""}</h4>
              </React.Fragment>
            )}
            <h4 className={isFromEdit ? styles.emailStyleWhenEdit : null}>
              {userInfo ? userInfo.email : ""}
            </h4>
          </div>
        </div>
        {isFromEdit ? (
          <React.Fragment>
            <EndpointMessage
              errorFlag={(userInfo && userInfo.isError) || apiError}
              endpointMessage={
                (userInfo && userInfo.isError && userInfo.errorMessage) ||
                Constants.ERROR_MESSAGE
              }
            />
            <Button
              className={styles.editButtonStyle}
              variant="secondary"
              onClick={() => this.handleApiCall()}
            >
              Update Details
            </Button>
          </React.Fragment>
        ) : (
          <Button
            className={styles.editButtonStyle}
            variant="secondary"
            onClick={() =>
              this.setState({
                isFromEdit: true,
                name: userInfo.name,
                mobile: userInfo.mobile,
              })
            }
          >
            Edit Details
          </Button>
        )}
      </div>
    );
  };

  render() {
    const { isEdit, mobile } = this.state;
    const {
      userInfo,
      location: { pathname },
    } = this.props;
    const mobilePayload = (userInfo && userInfo.mobile) || mobile;

    const routeName = pathname.replace("/", "");
    return (
      <React.Fragment>
        {userInfo ? (
          <React.Fragment>
            <AccountHeader routeName={routeName} />
            <div className={styles.mainContainer}>
              <AccountNavBar />

              <div className={styles.profileContainer}>
                <h3>Profile Detials</h3>
                <div className={styles.profileSubContainer}>
                  <div className={styles.avatarContainer}>
                    {isEdit ? (
                      <Avatar
                        width={200}
                        height={150}
                        onCrop={this.onCrop}
                        onClose={this.onClose}
                        onBeforeFileLoad={this.onBeforeFileLoad}
                      />
                    ) : (
                      <img
                        className={styles.avatarStyle}
                        src={this.state.preview}
                        alt="Preview"
                      />
                    )}

                    {isEdit ? (
                      <Button
                        className={styles.avatarButtonStyle}
                        variant="secondary"
                        onClick={() => {
                          const storageRef = ref(
                            storage,
                            `image/${mobilePayload + ".jpeg"}`
                          );

                          const profileImage = this.state.preview;

                          uploadString(
                            storageRef,
                            profileImage,
                            "data_url"
                          ).then((snapshot) => {
                            console.log("Uploaded a blob or file!");
                          });

                          getDownloadURL(
                            ref(storage, `image/${mobilePayload + ".jpeg"}`)
                          )
                            .then((url) => {
                              this.setState({
                                preview: url,
                              });
                            })
                            .catch((err) => {
                              this.setState({
                                isEdit: false,
                              });
                            });
                          this.setState({
                            isEdit: false,
                          });
                        }}
                      >
                        Done
                      </Button>
                    ) : (
                      <Button
                        className={styles.avatarButtonStyle}
                        variant="secondary"
                        onClick={() => this.setState({ isEdit: true })}
                      >
                        Click to Change
                      </Button>
                    )}
                  </div>
                  {this.renderProfileDetail()}
                </div>
              </div>
            </div>
          </React.Fragment>
        ) : (
          <div style={{ height: "100%" }} />
        )}
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = {
  getUserInfoAction,
  spinnerAction,
  updateUserAction,
};

const mapStateToProps = ({ userReducer: userState }) => {
  return {
    apiError: userState.apiError,
    userInfo: userState.userPayload,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
