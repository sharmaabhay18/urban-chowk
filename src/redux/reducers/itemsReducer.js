import Types from "utils/types";

const initialState = {
  fetching: false,
  apiError: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case Types.ITEMS.GET_ITEMS_ACTION_LOADING:
      return {
        ...state,
        apiError: false,
        fetching: true,
      };
    case Types.ITEMS.GET_ITEMS_ACTION_SUCCESS:
      return {
        ...state,
        fetching: false,
        apiError: false,
        itemData: [...action.payload],
      };
    case Types.ITEMS.GET_ITEMS_ACTION_FAILURE:
      return {
        ...state,
        fetching: false,
        apiError: true,
      };
    case Types.ITEMS.GET_ALL_ITEMS_BY_ID_ACTION_LOADING:
      return {
        ...state,
        apiError: false,
        fetching: true,
      };
    case Types.ITEMS.GET_ALL_ITEMS_BY_ID_ACTION_SUCCESS:
      return {
        ...state,
        fetching: false,
        apiError: false,
        itemData: [...action.payload],
      };
    case Types.ITEMS.GET_ALL_ITEMS_BY_ID_ACTION_FAILURE:
      return {
        ...state,
        fetching: false,
        apiError: true,
      };
    case Types.ITEMS.DELETE_ITEMS_ACTION_LOADING:
      return {
        ...state,
        apiError: false,
        fetching: true,
      };
    case Types.ITEMS.DELETE_ITEMS_ACTION_SUCCESS:
      return {
        ...state,
        fetching: false,
        apiError: false,
        itemData: [...action.payload],
      };
    case Types.ITEMS.DELETE_ITEMS_ACTION_FAILURE:
      return {
        ...state,
        fetching: false,
        apiError: true,
      };
    case Types.ITEMS.ADD_ITEMS_ACTION_LOADING:
      return {
        ...state,
        apiError: false,
        fetching: true,
      };
    case Types.ITEMS.ADD_ITEMS_ACTION_SUCCESS:
      return {
        ...state,
        fetching: false,
        apiError: false,
      };
    case Types.ITEMS.ADD_ITEMS_ACTION_FAILURE:
      return {
        ...state,
        fetching: false,
        apiError: true,
      };
    default:
      return state;
  }
};
