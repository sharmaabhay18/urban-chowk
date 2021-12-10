import Types from "utils/types";

const initialState = {
  fetching: false,
  apiError: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case Types.ITEMS.GET_ALL_ITEMS_ACTION_LOADING:
      return {
        ...state,
        apiError: false,
        fetching: true,
      };
    case Types.ITEMS.GET_ALL_ITEMS_ACTION_SUCCESS:
      return {
        ...state,
        fetching: false,
        apiError: false,
        allItemData: [...action.payload],
      };
    case Types.ITEMS.GET_ALL_ITEMS_ACTION_FAILURE:
      return {
        ...state,
        fetching: false,
        apiError: true,
        allItemData: [...action.payload],
      };

    default:
      return state;
  }
};
