import Types from "utils/types";
import agent from "config/agent";
import config from "utils/configConstant";

import { registerWithEmailAndPassword } from "utils/firebase";

const signupAction =
  ({ name, email, password, mobile }, history) =>
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
      };

      await agent.Auth.signUp(userPayload);
      history.push("/");
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
