import Types from "utils/types";
import agent from "config/agent";
import { notifySuccessToast } from "utils/helperFunction";

const getItemAction = (id, handleSpinner) => async (dispatch) => {
  dispatch({
    type: Types.ITEMS.GET_ITEMS_ACTION_LOADING,
    payload: null,
  });

  try {
    const data = await agent.Items.getAll(id);
    dispatch({
      type: Types.ITEMS.GET_ITEMS_ACTION_SUCCESS,
      payload: data?.data?.result?.data,
    });
    handleSpinner(false);
  } catch (error) {
    dispatch({
      type: Types.ITEMS.GET_ITEMS_ACTION_FAILURE,
      payload: null,
    });
    handleSpinner(false);
  }
};

const addItemAction = (payload, history) => async (dispatch) => {
  dispatch({
    type: Types.ITEMS.ADD_ITEMS_ACTION_LOADING,
    payload: null,
  });

  try {
    const data = await agent.Items.add(payload);
    const result = data?.data?.result?.data?.isCreated;
    if (result) {
      dispatch({
        type: Types.ITEMS.ADD_ITEMS_ACTION_SUCCESS,
        payload: payload?.data?.result?.data,
      });
      notifySuccessToast("Items added Successfully!");
      //To-do: add nav after implemeting add func
      //   history.push("/admin-testimonial");
    }
  } catch (error) {
    dispatch({
      type: Types.ITEMS.ADD_ITEMS_ACTION_FAILURE,
      payload: null,
    });
  }
};

const deleteItemAction = (id, categoryId) => async (dispatch) => {
  dispatch({
    type: Types.ITEMS.DELETE_ITEMS_ACTION_LOADING,
    payload: null,
  });

  try {
    const data = await agent.Items.delete(id);

    const result = data.data.result.data;
    if (result.deleted) {
      const payload = await agent.Items.getAll(categoryId);
      dispatch({
        type: Types.ITEMS.DELETE_ITEMS_ACTION_SUCCESS,
        payload: payload?.data?.result?.data,
      });
    }
  } catch (error) {
    dispatch({
      type: Types.ITEMS.DELETE_ITEMS_ACTION_FAILURE,
      payload: null,
    });
  }
};

export { getItemAction, deleteItemAction, addItemAction };
