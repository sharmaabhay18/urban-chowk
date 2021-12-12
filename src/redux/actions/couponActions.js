import Types from "utils/types";
import agent from "config/agent";
import { notifySuccessToast } from "utils/helperFunction";

const getCouponAction = (spinnerAction) => async (dispatch) => {
  dispatch({
    type: Types.COUPON.GET_COUPON_ACTION_LOADING,
    payload: null,
  });

  try {
    const data = await agent.Coupon.getAll();
    dispatch({
      type: Types.COUPON.GET_COUPON_ACTION_SUCCESS,
      payload: data?.data?.result?.data,
    });
    spinnerAction(false);
  } catch (error) {
    dispatch({
      type: Types.COUPON.GET_COUPON_ACTION_FAILURE,
      payload: null,
    });
    spinnerAction(false);
  }
};

const addCouponAction = (payload, history) => async (dispatch) => {
  dispatch({
    type: Types.COUPON.ADD_COUPON_ACTION_LOADING,
    payload: null,
  });

  try {
    const data = await agent.Coupon.add(payload);
    const result = data?.data?.result?.data?.isCreated;
    if (result) {
      dispatch({
        type: Types.COUPON.ADD_COUPON_ACTION_SUCCESS,
        payload: data?.data?.result?.data,
      });
      notifySuccessToast("Coupon added Successfully!");
      history.push("/admin-coupon");
    }
  } catch (error) {
    const errorMessage = error?.data?.message || "Something went wrong!";
    dispatch({
      type: Types.COUPON.ADD_COUPON_ACTION_FAILURE,
      payload: {
        isError: true,
        errorMessage,
      },
    });
  }
};

const deleteCouponAction = (id) => async (dispatch) => {
  dispatch({
    type: Types.COUPON.DELETE_COUPON_ACTION_LOADING,
    payload: null,
  });

  try {
    const data = await agent.Coupon.delete(id);

    const result = data.data.result.data;
    if (result.deleted) {
      const payload = await agent.Coupon.getAll();
      dispatch({
        type: Types.COUPON.DELETE_COUPON_ACTION_SUCCESS,
        payload: payload?.data?.result?.data,
      });
    }
  } catch (error) {
    dispatch({
      type: Types.COUPON.DELETE_COUPON_ACTION_FAILURE,
      payload: null,
    });
  }
};

export { getCouponAction, addCouponAction, deleteCouponAction };
