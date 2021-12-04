import Types from "utils/types";

const initialState = {
  fetching: false,
  apiError: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case Types.USER.GET_USER_ACTION_LOADING:
      return {
        ...state,
        apiError: false,
        fetching: true,
      };
    case Types.USER.GET_USER_ACTION_SUCCESS:
      return {
        ...state,
        fetching: false,
        apiError: false,
        userPayload: { ...action.payload },
      };
    case Types.USER.GET_USER_ACTION_FAILURE:
      return {
        ...state,
        fetching: false,
        apiError: true,
        userPayload: { ...action.payload },
      };

    case Types.USER.UPDATE_USER_ACTION_LOADING:
      return {
        ...state,
        apiError: false,
        fetching: true,
      };
    case Types.USER.UPDATE_USER_ACTION_SUCCESS:
      return {
        ...state,
        fetching: false,
        apiError: false,
        userPayload: { ...action.payload },
      };
    case Types.USER.UPDATE_USER_ACTION_FAILURE:
      return {
        ...state,
        fetching: false,
        apiError: true,
        userPayload: { ...action.payload },
      };
    default:
      return {
        ...state,
      };
  }
};
