import Types from "utils/types";
import agent from "config/agent";

const getUserInfoAction = (handleSpinner) => async (dispatch) => {
  dispatch({
    type: Types.USER.GET_USER_ACTION_LOADING,
    payload: null,
  });

  try {
    const data = await agent.User.getInfo();
    dispatch({
      type: Types.USER.GET_USER_ACTION_SUCCESS,
      payload: data?.data?.data?.result,
    });
    handleSpinner(false);
  } catch (error) {
    dispatch({
      type: Types.USER.GET_USER_ACTION_FAILURE,
      payload: null,
    });
    handleSpinner(false);
  }
};

const updateUserAction =
  (payload, handleSpinner, handleFormEdit) => async (dispatch) => {
    dispatch({
      type: Types.USER.UPDATE_USER_ACTION_LOADING,
      payload: null,
    });

    try {
      const data = await agent.User.updateUser(payload);

      dispatch({
        type: Types.USER.UPDATE_USER_ACTION_SUCCESS,
        payload: data?.data?.data?.updatedUser,
      });
      handleSpinner(false);
      handleFormEdit(false);
    } catch (error) {
      const errorMessage = error?.data?.message || "Something went wrong!";
      dispatch({
        type: Types.USER.UPDATE_USER_ACTION_FAILURE,
        payload: {
          isError: true,
          errorMessage,
        },
      });
      handleSpinner(false);
    }
  };

export { getUserInfoAction, updateUserAction };
