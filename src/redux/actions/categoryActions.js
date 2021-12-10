import Types from "utils/types";
import agent from "config/agent";
import { notifySuccessToast } from "utils/helperFunction";

const getCategoryAction = (handleSpinner) => async (dispatch) => {
  dispatch({
    type: Types.CATEGORY.GET_CATEGORY_ACTION_LOADING,
    payload: null,
  });

  try {
    const data = await agent.Category.getAll();
    dispatch({
      type: Types.CATEGORY.GET_CATEGORY_ACTION_SUCCESS,
      payload: data?.data?.result?.data,
    });
    handleSpinner(false);
  } catch (error) {
    dispatch({
      type: Types.CATEGORY.GET_CATEGORY_ACTION_FAILURE,
      payload: null,
    });
    handleSpinner(false);
  }
};

const addCategoryAction = (payload, history) => async (dispatch) => {
  dispatch({
    type: Types.CATEGORY.ADD_CATEGORY_ACTION_LOADING,
    payload: null,
  });

  try {
    const data = await agent.Category.add(payload);
    const result = data?.data?.result?.data?.isCreated;
    if (result) {
      dispatch({
        type: Types.CATEGORY.ADD_CATEGORY_ACTION_SUCCESS,
        payload: payload?.data?.result?.data,
      });
      notifySuccessToast("Category added Successfully!");
      //To-do: add nav after implemeting add func
      //   history.push("/admin-testimonial");
    }
  } catch (error) {
    dispatch({
      type: Types.CATEGORY.ADD_CATEGORY_ACTION_FAILURE,
      payload: null,
    });
  }
};

const deleteCategoryAction = (id) => async (dispatch) => {
  dispatch({
    type: Types.CATEGORY.DELETE_CATEGORY_ACTION_LOADING,
    payload: null,
  });

  try {
    const data = await agent.Category.delete(id);

    const result = data.data.result.data;
    if (result.deleted) {
      const payload = await agent.Category.getAll();
      dispatch({
        type: Types.CATEGORY.DELETE_CATEGORY_ACTION_SUCCESS,
        payload: payload?.data?.result?.data,
      });
    }
  } catch (error) {
    dispatch({
      type: Types.CATEGORY.DELETE_CATEGORY_ACTION_FAILURE,
      payload: null,
    });
  }
};

export { getCategoryAction, deleteCategoryAction, addCategoryAction };
