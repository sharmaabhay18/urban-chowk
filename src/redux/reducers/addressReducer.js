import Types from "utils/types";

const initialState = {
  fetching: false,
  apiError: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case Types.ADDRESS.GET_ADDRESS_ACTION_LOADING:
      return {
        ...state,
        apiError: false,
        fetching: true,
      };
    case Types.ADDRESS.GET_ADDRESS_ACTION_SUCCESS:
      return {
        ...state,
        fetching: false,
        apiError: false,
        addressData: [...action.payload],
      };
    case Types.ADDRESS.GET_ADDRESS_ACTION_FAILURE:
      return {
        ...state,
        fetching: false,
        apiError: true,
        addressData: [...action.payload],
      };
    case Types.ADDRESS.DELETE_ADDRESS_ACTION_LOADING:
      return {
        ...state,
        apiError: false,
        fetching: true,
      };
    case Types.ADDRESS.DELETE_ADDRESS_ACTION_SUCCESS:
      return {
        ...state,
        fetching: false,
        apiError: false,
        addressData: [...action.payload],
      };
    case Types.ADDRESS.DELETE_ADDRESS_ACTION_FAILURE:
      return {
        ...state,
        fetching: false,
        apiError: true,
        addressData: [...action.payload],
      };
    case Types.ADDRESS.ADD_ADDRESS_ACTION_LOADING:
      return {
        ...state,
        apiError: false,
        fetching: true,
      };
    case Types.ADDRESS.ADD_ADDRESS_ACTION_SUCCESS:
      return {
        ...state,
        fetching: false,
        apiError: false,
        addressData: [...action.payload],
      };
    case Types.ADDRESS.ADD_ADDRESS_ACTION_FAILURE:
      return {
        ...state,
        fetching: false,
        apiError: true,
        addressData: [...action.payload],
      };
    default:
      return {
        ...state,
      };
  }
};
