import Types from "utils/types";

const initialState = {
    fetching: false,
    apiError: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
    switch (action.type) {
        case Types.ORDER.GET_ORDER_ACTION_LOADING:
            return {
                ...state,
                apiError: false,
                fetching: true,
            };
        case Types.ORDER.GET_ORDER_ACTION_SUCCESS:
            return {
                ...state,
                fetching: false,
                apiError: false,
                orderData: [...action.payload],
            };
        case Types.ORDER.GET_ORDER_ACTION_FAILURE:
            return {
                ...state,
                fetching: false,
                apiError: true,
                orderData: [...action.payload],
            };
        case Types.ORDER.ADD_ORDER_ACTION_LOADING:
            return {
                ...state,
                apiError: false,
                fetching: true,
            };
        case Types.ORDER.ADD_ORDER_ACTION_SUCCESS:
            return {
                ...state,
                fetching: false,
                apiError: false,
            };
        case Types.ORDER.ADD_ORDER_ACTION_FAILURE:
            return {
                ...state,
                fetching: false,
                apiError: true,
            };
        default:
            return state;
    }
};
