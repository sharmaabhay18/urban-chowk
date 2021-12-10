import Types from "utils/types";
import agent from "config/agent";

const getAllItemAction = (handleSpinner) => async (dispatch) => {
  dispatch({
    type: Types.ITEMS.GET_ALL_ITEMS_ACTION_LOADING,
    payload: null,
  });

  try {
    const data = await agent.Items.getAllItems();
    dispatch({
      type: Types.ITEMS.GET_ALL_ITEMS_ACTION_SUCCESS,
      payload: data?.data?.result?.data,
    });
    handleSpinner(false);
  } catch (error) {
    dispatch({
      type: Types.ITEMS.GET_ALL_ITEMS_ACTION_FAILURE,
      payload: null,
    });
    handleSpinner(false);
  }
};

export { getAllItemAction };
