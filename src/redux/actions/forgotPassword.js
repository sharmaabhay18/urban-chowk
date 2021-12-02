import Types from "utils/types";
import { resetPassword } from "utils/firebase";
import { notifySuccessToast } from "utils/helperFunction";

const forgotPassword =
  ({ email }, resetForm) =>
  async (dispatch) => {
    dispatch({
      type: Types.USER.FORGET_USER_PASSWORD_ACTION_LOADING,
      payload: null,
    });
    try {
      await resetPassword(email);
      dispatch({
        type: Types.USER.FORGET_USER_PASSWORD_ACTION_SUCCESS,
        payload: { email },
      });
      notifySuccessToast("Email Sent Successfully!");
      resetForm();
    } catch (error) {
      let errorMessage = "Something went wrong!";
      if (error?.code === "auth/user-not-found") {
        errorMessage = "Email Address not found";
      }
      dispatch({
        type: Types.USER.FORGET_USER_PASSWORD_ACTION_FAILURE,
        payload: {
          isError: true,
          errorMessage,
        },
      });
    }
  };

export { forgotPassword };
