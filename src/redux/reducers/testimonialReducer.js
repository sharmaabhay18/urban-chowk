import Types from "utils/types";

const initialState = {
  fetching: false,
  apiError: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case Types.TESTIMONIAL.GET_TESTIMONIAL_ACTION_LOADING:
      return {
        ...state,
        apiError: false,
        fetching: true,
      };
    case Types.TESTIMONIAL.GET_TESTIMONIAL_ACTION_SUCCESS:
      return {
        ...state,
        fetching: false,
        apiError: false,
        testimonialData: [...action.payload],
      };
    case Types.TESTIMONIAL.GET_TESTIMONIAL_ACTION_FAILURE:
      return {
        ...state,
        fetching: false,
        apiError: true,
        testimonialData: [...action.payload],
      };
    case Types.TESTIMONIAL.DELETE_TESTIMONIAL_ACTION_LOADING:
      return {
        ...state,
        apiError: false,
        fetching: true,
      };
    case Types.TESTIMONIAL.DELETE_TESTIMONIAL_ACTION_SUCCESS:
      return {
        ...state,
        fetching: false,
        apiError: false,
        testimonialData: [...action.payload],
      };
    case Types.TESTIMONIAL.DELETE_TESTIMONIAL_ACTION_FAILURE:
      return {
        ...state,
        fetching: false,
        apiError: true,
        testimonialData: [...action.payload],
      };
    case Types.TESTIMONIAL.ADD_TESTIMONIAL_ACTION_LOADING:
      return {
        ...state,
        apiError: false,
        fetching: true,
      };
    case Types.TESTIMONIAL.ADD_TESTIMONIAL_ACTION_SUCCESS:
      return {
        ...state,
        fetching: false,
        apiError: false,
      };
    case Types.TESTIMONIAL.ADD_TESTIMONIAL_ACTION_FAILURE:
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
