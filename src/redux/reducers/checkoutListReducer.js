import Types from "utils/types";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = {}, action) => {
  switch (action.type) {
    case Types.CHECKOUT.GET_CHECKOUT_LIST:
      return {
        ...state,
        checkoutItems: action.payload,
      };
    case Types.CHECKOUT.UPDATE_CHECKOUT_LIST:
      return {
        ...state,
        checkoutItems: action.payload,
      };
    case Types.CHECKOUT.UPDATE_COUNTER_CHECKOUT_LIST:
      return {
        ...state,
        checkoutItems: action.payload,
      };
    case Types.CHECKOUT.REMOVE_CHECKOUT_LIST:
      return {
        ...state,
        checkoutItems: action.payload,
      };
    case Types.CHECKOUT.CLEAR_CHECKOUT_LIST:
      return {
        ...state,
        checkoutItems: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
