import Types from "utils/types";
import config from "utils/configConstant";
import agent from "config/agent";

import { signInNormal, logout } from "utils/firebase";

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

        const data = await agent.Auth.login(accessToken);
        const userRole = data?.data?.data?.role;
        userPayload["role"] = userRole;

        if (userRole === "admin") {
          history.push("/admin-dashboard");
          localStorage.setItem(config.ROLE, "admin");
        } else {
          history.push("/");
          localStorage.setItem(config.ROLE, "customer");
        }

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

const logoutAction = () => async (dispatch) => {
  dispatch({
    type: Types.LOGOUT.LOGOUT_ACTION_LOADING,
    payload: null,
  });

  try {
    await logout();

    dispatch({
      type: Types.LOGOUT.LOGOUT_ACTION_SUCCESS,
      payload: null,
    });
  } catch (error) {
    dispatch({
      type: Types.LOGOUT.LOGOUT_ACTION_FAILURE,
      payload: null,
    });
  }
};
export { loginAction, logoutAction };
