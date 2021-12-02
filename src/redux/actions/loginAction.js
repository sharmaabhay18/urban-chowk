import Types from "utils/types";
import config from "utils/configConstant";

import { signInNormal } from "utils/firebase";

const loginAction =
  ({ email, password }, history) =>
  async (dispatch) => {
    dispatch({
      type: Types.LOGIN.LOGIN_ACTION_LOADING,
      payload: null,
    });
    try {
      const loggedUser = await signInNormal(email, password);

      const accessToken = loggedUser.accessToken;
      localStorage.setItem(config.AUTH_TOKEN, accessToken);

      const userPayload = {
        email: loggedUser.email,
        uid: loggedUser.uid,
        authProvider: loggedUser.authProvider,
      };
      history.push("/");
      dispatch({
        type: Types.LOGIN.LOGIN_ACTION_SUCCESS,
        payload: userPayload,
      });
    } catch (error) {
      let errorMessage = "Something went wrong!";
      if (
        error?.code === "auth/user-not-found" ||
        error?.code === "auth/wrong-password"
      ) {
        errorMessage = "Email/Password not correct";
      }

      dispatch({
        type: Types.LOGIN.LOGIN_ACTION_FAILURE,
        payload: {
          isError: true,
          errorMessage,
        },
      });
    }
  };

export { loginAction };
