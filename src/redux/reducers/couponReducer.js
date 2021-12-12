import Types from "utils/types";

const initialState = {
  fetching: false,
  apiError: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case Types.COUPON.GET_COUPON_ACTION_LOADING:
      return {
        ...state,
        apiError: false,
        fetching: true,
      };
    case Types.COUPON.GET_COUPON_ACTION_SUCCESS:
      return {
        ...state,
        fetching: false,
        apiError: false,
        couponData: [...action.payload],
      };
    case Types.COUPON.GET_COUPON_ACTION_FAILURE:
      return {
        ...state,
        fetching: false,
        apiError: true,

      };
    case Types.COUPON.DELETE_COUPON_ACTION_LOADING:
      return {
        ...state,
        apiError: false,
        fetching: true,
      };
    case Types.COUPON.DELETE_COUPON_ACTION_SUCCESS:
      return {
        ...state,
        fetching: false,
        apiError: false,
        couponData: [...action.payload],
      };
    case Types.COUPON.DELETE_COUPON_ACTION_FAILURE:
      return {
        ...state,
        fetching: false,
        apiError: true,

      };
    case Types.COUPON.ADD_COUPON_ACTION_LOADING:
      return {
        ...state,
        apiError: false,
        fetching: true,
      };
    case Types.COUPON.ADD_COUPON_ACTION_SUCCESS:
      return {
        ...state,
        fetching: false,
        apiError: false,
      };
    case Types.COUPON.ADD_COUPON_ACTION_FAILURE:
      return {
        ...state,
        fetching: false,
        apiError: true,
        couponData: { ...action.payload },
      };
    default:
      return {
        ...state,
      };
  }
};
