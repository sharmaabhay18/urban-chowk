import Types from "utils/types";
import agent from "config/agent";
import { notifySuccessToast } from "utils/helperFunction";

const getTestimonialAction = (handleSpinner) => async (dispatch) => {
  dispatch({
    type: Types.TESTIMONIAL.GET_TESTIMONIAL_ACTION_LOADING,
    payload: null,
  });

  try {
    const data = await agent.Testimonial.getAll();
    dispatch({
      type: Types.TESTIMONIAL.GET_TESTIMONIAL_ACTION_SUCCESS,
      payload: data?.data?.result?.data,
    });
    handleSpinner(false);
  } catch (error) {
    dispatch({
      type: Types.TESTIMONIAL.GET_TESTIMONIAL_ACTION_FAILURE,
      payload: null,
    });
    handleSpinner(false);
  }
};

const addTestimonialAction = (payload, history) => async (dispatch) => {
  dispatch({
    type: Types.TESTIMONIAL.ADD_TESTIMONIAL_ACTION_LOADING,
    payload: null,
  });

  try {
    const data = await agent.Testimonial.add(payload);
    const result = data?.data?.result?.data?.isCreated;
    if (result) {
      dispatch({
        type: Types.TESTIMONIAL.ADD_TESTIMONIAL_ACTION_SUCCESS,
        payload: payload?.data?.result?.data,
      });
      notifySuccessToast("Testimonial added Successfully!");
      history.push("/admin-testimonial");
    }
  } catch (error) {
    dispatch({
      type: Types.TESTIMONIAL.ADD_TESTIMONIAL_ACTION_FAILURE,
      payload: null,
    });
  }
};

const deleteTestimonialAction = (id) => async (dispatch) => {
  dispatch({
    type: Types.TESTIMONIAL.DELETE_TESTIMONIAL_ACTION_LOADING,
    payload: null,
  });

  try {
    const data = await agent.Testimonial.delete(id);

    const result = data.data.result.data;
    if (result.deleted) {
      const payload = await agent.Testimonial.getAll();
      dispatch({
        type: Types.TESTIMONIAL.DELETE_TESTIMONIAL_ACTION_SUCCESS,
        payload: payload?.data?.result?.data,
      });
    }
  } catch (error) {
    dispatch({
      type: Types.TESTIMONIAL.DELETE_TESTIMONIAL_ACTION_FAILURE,
      payload: null,
    });
  }
};

export { getTestimonialAction, deleteTestimonialAction, addTestimonialAction };
