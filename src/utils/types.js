const LOGIN = {
  LOGIN_ACTION_LOADING: "LOGIN_ACTION_LOADING",
  LOGIN_ACTION_SUCCESS: "LOGIN_ACTION_SUCCESS",
  LOGIN_ACTION_FAILURE: "LOGIN_ACTION_FAILURE",
};

const LOGOUT = {
  LOGOUT_ACTION_LOADING: "LOGOUT_ACTION_LOADING",
  LOGOUT_ACTION_SUCCESS: "LOGOUT_ACTION_SUCCESS",
  LOGOUT_ACTION_FAILURE: "LOGOUT_ACTION_FAILURE",
};

const SIGNUP = {
  SIGNUP_ACTION_LOADING: "SIGNUP_ACTION_LOADING",
  SIGNUP_ACTION_SUCCESS: "SIGNUP_ACTION_SUCCESS",
  SIGNUP_ACTION_FAILURE: "SIGNUP_ACTION_FAILURE",
};

const USER = {
  FORGET_USER_PASSWORD_ACTION_LOADING: "FORGET_USER_PASSWORD_ACTION_LOADING",
  FORGET_USER_PASSWORD_ACTION_SUCCESS: "FORGET_USER_PASSWORD_ACTION_SUCCESS",
  FORGET_USER_PASSWORD_ACTION_FAILURE: "FORGET_USER_PASSWORD_ACTION_FAILURE",

  GET_USER_ACTION_LOADING: "GET_USER_ACTION_LOADING",
  GET_USER_ACTION_SUCCESS: "GET_USER_ACTION_SUCCESS",
  GET_USER_ACTION_FAILURE: "GET_USER_ACTION_FAILURE",

  UPDATE_USER_ACTION_LOADING: "UPDATE_USER_ACTION_LOADING",
  UPDATE_USER_ACTION_SUCCESS: "UPDATE_USER_ACTION_SUCCESS",
  UPDATE_USER_ACTION_FAILURE: "UPDATE_USER_ACTION_FAILURE",
};

const TESTIMONIAL = {
  GET_TESTIMONIAL_ACTION_LOADING: "GET_TESTIMONIAL_ACTION_LOADING",
  GET_TESTIMONIAL_ACTION_SUCCESS: "GET_TESTIMONIAL_ACTION_SUCCESS",
  GET_TESTIMONIAL_ACTION_FAILURE: "GET_TESTIMONIAL_ACTION_FAILURE",

  DELETE_TESTIMONIAL_ACTION_LOADING: "DELETE_TESTIMONIAL_ACTION_LOADING",
  DELETE_TESTIMONIAL_ACTION_SUCCESS: "DELETE_TESTIMONIAL_ACTION_SUCCESS",
  DELETE_TESTIMONIAL_ACTION_FAILURE: "DELETE_TESTIMONIAL_ACTION_FAILURE",

  ADD_TESTIMONIAL_ACTION_LOADING: "ADD_TESTIMONIAL_ACTION_LOADING",
  ADD_TESTIMONIAL_ACTION_SUCCESS: "ADD_TESTIMONIAL_ACTION_SUCCESS",
  ADD_TESTIMONIAL_ACTION_FAILURE: "ADD_TESTIMONIAL_ACTION_FAILURE",
};

const ADDRESS = {
  GET_ADDRESS_ACTION_LOADING: "GET_ADDRESS_ACTION_LOADING",
  GET_ADDRESS_ACTION_SUCCESS: "GET_ADDRESS_ACTION_SUCCESS",
  GET_ADDRESS_ACTION_FAILURE: "GET_ADDRESS_ACTION_FAILURE",

  DELETE_ADDRESS_ACTION_LOADING: "DELETE_ADDRESS_ACTION_LOADING",
  DELETE_ADDRESS_ACTION_SUCCESS: "DELETE_ADDRESS_ACTION_SUCCESS",
  DELETE_ADDRESS_ACTION_FAILURE: "DELETE_ADDRESS_ACTION_FAILURE",

  ADD_ADDRESS_ACTION_LOADING: "ADD_ADDRESS_ACTION_LOADING",
  ADD_ADDRESS_ACTION_SUCCESS: "ADD_ADDRESS_ACTION_SUCCESS",
  ADD_ADDRESS_ACTION_FAILURE: "ADD_ADDRESS_ACTION_FAILURE",
};

const COUPON = {
  GET_COUPON_ACTION_LOADING: "GET_COUPON_ACTION_LOADING",
  GET_COUPON_ACTION_SUCCESS: "GET_COUPON_ACTION_SUCCESS",
  GET_COUPON_ACTION_FAILURE: "GET_COUPON_ACTION_FAILURE",

  DELETE_COUPON_ACTION_LOADING: "DELETE_COUPON_ACTION_LOADING",
  DELETE_COUPON_ACTION_SUCCESS: "DELETE_COUPON_ACTION_SUCCESS",
  DELETE_COUPON_ACTION_FAILURE: "DELETE_COUPON_ACTION_FAILURE",

  ADD_COUPON_ACTION_LOADING: "ADD_COUPON_ACTION_LOADING",
  ADD_COUPON_ACTION_SUCCESS: "ADD_COUPON_ACTION_SUCCESS",
  ADD_COUPON_ACTION_FAILURE: "ADD_COUPON_ACTION_FAILURE",
};

const CATEGORY = {
  GET_CATEGORY_ACTION_LOADING: "GET_CATEGORY_ACTION_LOADING",
  GET_CATEGORY_ACTION_SUCCESS: "GET_CATEGORY_ACTION_SUCCESS",
  GET_CATEGORY_ACTION_FAILURE: "GET_CATEGORY_ACTION_FAILURE",

  DELETE_CATEGORY_ACTION_LOADING: "DELETE_CATEGORY_ACTION_LOADING",
  DELETE_CATEGORY_ACTION_SUCCESS: "DELETE_CATEGORY_ACTION_SUCCESS",
  DELETE_CATEGORY_ACTION_FAILURE: "DELETE_CATEGORY_ACTION_FAILURE",

  ADD_CATEGORY_ACTION_LOADING: "ADD_CATEGORY_ACTION_LOADING",
  ADD_CATEGORY_ACTION_SUCCESS: "ADD_CATEGORY_ACTION_SUCCESS",
  ADD_CATEGORY_ACTION_FAILURE: "ADD_CATEGORY_ACTION_FAILURE",
};

const CHECKOUT = {
  GET_CHECKOUT_LIST: "GET_CHECKOUT_LIST",
  UPDATE_CHECKOUT_LIST: "UPDATE_CHECKOUT_LIST",
  UPDATE_COUNTER_CHECKOUT_LIST: "UPDATE_COUNTER_CHECKOUT_LIST",
  REMOVE_CHECKOUT_LIST: "REMOVE_CHECKOUT_LIST",
  CLEAR_CHECKOUT_LIST: "CLEAR_CHECKOUT_LIST",
};

const ITEMS = {
  GET_ALL_ITEMS_BY_ID_ACTION_LOADING: "GET_ALL_ITEMS_BY_ID_ACTION_LOADING",
  GET_ALL_ITEMS_BY_ID_ACTION_SUCCESS: "GET_ALL_ITEMS_BY_ID_ACTION_SUCCESS",
  GET_ALL_ITEMS_BY_ID_ACTION_FAILURE: "GET_ALL_ITEMS_BY_ID_ACTION_FAILURE",

  GET_ALL_ITEMS_ACTION_LOADING: "GET_ALL_ITEMS_ACTION_LOADING",
  GET_ALL_ITEMS_ACTION_SUCCESS: "GET_ALL_ITEMS_ACTION_SUCCESS",
  GET_ALL_ITEMS_ACTION_FAILURE: "GET_ALL_ITEMS_ACTION_FAILURE",

  GET_ITEMS_ACTION_LOADING: "GET_ITEMS_ACTION_LOADING",
  GET_ITEMS_ACTION_SUCCESS: "GET_ITEMS_ACTION_SUCCESS",
  GET_ITEMS_ACTION_FAILURE: "GET_ITEMS_ACTION_FAILURE",

  DELETE_ITEMS_ACTION_LOADING: "DELETE_ITEMS_ACTION_LOADING",
  DELETE_ITEMS_ACTION_SUCCESS: "DELETE_ITEMS_ACTION_SUCCESS",
  DELETE_ITEMS_ACTION_FAILURE: "DELETE_ITEMS_ACTION_FAILURE",

  ADD_ITEMS_ACTION_LOADING: "ADD_ITEMS_ACTION_LOADING",
  ADD_ITEMS_ACTION_SUCCESS: "ADD_ITEMS_ACTION_SUCCESS",
  ADD_ITEMS_ACTION_FAILURE: "ADD_ITEMS_ACTION_FAILURE",
};

const START_SPINNER_LOADING = "START_SPINNER_LOADING";

const ORDER = {
  GET_LOCAL_ORDER_LIST: "GET_LOCAL_ORDER_LIST",
  UPDATE_LOCAL_ORDER_LIST: "UPDATE_LOCAL_ORDER_LIST",
  CLEAR_LOCAL_ORDER_LIST: "CLEAR_LOCAL_ORDER_LIST",

  GET_ALL_ORDER_ACTION_LOADING: "GET_ALL_ORDER_ACTION_LOADING",
  GET_ALL_ORDER_ACTION_SUCCESS: "GET_ALL_ORDER_ACTION_SUCCESS",
  GET_ALL_ORDER_ACTION_FAILURE: "GET_ALL_ORDER_ACTION_FAILURE",

  GET_ORDER_ACTION_LOADING: "GET_ORDER_ACTION_LOADING",
  GET_ORDER_ACTION_SUCCESS: "GET_ORDER_ACTION_SUCCESS",
  GET_ORDER_ACTION_FAILURE: "GET_ORDER_ACTION_FAILURE",

  ADD_ORDER_ACTION_LOADING: "ADD_ORDER_ACTION_LOADING",
  ADD_ORDER_ACTION_SUCCESS: "ADD_ORDER_ACTION_SUCCESS",
  ADD_ORDER_ACTION_FAILURE: "ADD_ORDER_ACTION_FAILURE",

  UPDATE_ORDER_STATUS_ACTION_LOADING: "UPDATE_ORDER_STATUS_ACTION_LOADING",
  UPDATE_ORDER_STATUS_ACTION_SUCCESS: "UPDATE_ORDER_STATUS_ACTION_SUCCESS",
  UPDATE_ORDER_STATUS_ACTION_FAILURE: "UPDATE_ORDER_STATUS_ACTION_FAILURE",
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  LOGIN,
  SIGNUP,
  USER,
  TESTIMONIAL,
  LOGOUT,
  START_SPINNER_LOADING,
  COUPON,
  CATEGORY,
  ITEMS,
  CHECKOUT,
  ORDER,
  ADDRESS,
};
