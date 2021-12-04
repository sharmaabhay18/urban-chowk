import Types from "utils/types";
import agent from "config/agent";
import config from "utils/configConstant";

import { registerWithEmailAndPassword } from "utils/firebase";

const signupAction =
  ({ name, email, password, mobile, role }, history) =>
  async (dispatch) => {
    dispatch({
      type: Types.SIGNUP.SIGNUP_ACTION_LOADING,
      payload: null,
    });
    try {
      const userCreated = await registerWithEmailAndPassword(email, password);
      const accessToken = userCreated.accessToken;
      localStorage.setItem(config.AUTH_TOKEN, accessToken);
      const userPayload = {
        email: userCreated.email,
        name: name,
        mobile,
        uid: userCreated.uid,
        authProvider: userCreated.authProvider,
        role,
      };

      await agent.Auth.signUp(userPayload);

      if (role === "admin") {
        history.push("/admin-dashboard");
        localStorage.setItem(config.ROLE, "admin");
      } else {
        history.push("/");
        localStorage.setItem(config.ROLE, "customer");
      }

      dispatch({
        type: Types.SIGNUP.SIGNUP_ACTION_SUCCESS,
        payload: userPayload,
      });
    } catch (error) {
      let errorMessage = "Something went wrong!";
      if (error?.code === "auth/email-already-in-use") {
        errorMessage = "Email Address already in use";
      }

      if (error?.data?.message) {
        errorMessage = error?.data?.message;
      }
      dispatch({
        type: Types.SIGNUP.SIGNUP_ACTION_FAILURE,
        payload: {
          isError: true,
          errorMessage,
        },
      });
    }
  };

export { signupAction };
