import Types from "utils/types";

const initialState = {
  fetching: false,
  apiError: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case Types.CATEGORY.GET_CATEGORY_ACTION_LOADING:
      return {
        ...state,
        apiError: false,
        fetching: true,
      };
    case Types.CATEGORY.GET_CATEGORY_ACTION_SUCCESS:
      return {
        ...state,
        fetching: false,
        apiError: false,
        categoryData: [...action.payload],
      };
    case Types.CATEGORY.GET_CATEGORY_ACTION_FAILURE:
      return {
        ...state,
        fetching: false,
        apiError: true,
      };
    case Types.CATEGORY.DELETE_CATEGORY_ACTION_LOADING:
      return {
        ...state,
        apiError: false,
        fetching: true,
      };
    case Types.CATEGORY.DELETE_CATEGORY_ACTION_SUCCESS:
      return {
        ...state,
        fetching: false,
        apiError: false,
        categoryData: [...action.payload],
      };
    case Types.CATEGORY.DELETE_CATEGORY_ACTION_FAILURE:
      return {
        ...state,
        fetching: false,
        apiError: true,
      };
    case Types.CATEGORY.ADD_CATEGORY_ACTION_LOADING:
      return {
        ...state,
        apiError: false,
        fetching: true,
      };
    case Types.CATEGORY.ADD_CATEGORY_ACTION_SUCCESS:
      return {
        ...state,
        fetching: false,
        apiError: false,
      };
    case Types.CATEGORY.ADD_CATEGORY_ACTION_FAILURE:
      return {
        ...state,
        fetching: false,
        apiError: true,
      };
    default:
      return {
        ...state,
      };
  }
};
