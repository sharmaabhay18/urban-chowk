import Types from "utils/types";

const initialState = {
    fetching: false,
    apiError: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
    switch (action.type) {
        case Types.ORDER.GET_ALL_ORDER_ACTION_LOADING:
            return {
                ...state,
                apiError: false,
                fetching: true,
            };
        case Types.ORDER.GET_ALL_ORDER_ACTION_SUCCESS:
            return {
                ...state,
                fetching: false,
                apiError: false,
                allOrderData: [...action.payload],
            };
        case Types.ORDER.GET_ALL_ORDER_ACTION_FAILURE:
            return {
                ...state,
                fetching: false,
                apiError: true,
            };
        case Types.ORDER.UPDATE_ORDER_STATUS_ACTION_LOADING:
            return {
                ...state,
                apiError: false,
                fetching: true,
            };
        case Types.ORDER.UPDATE_ORDER_STATUS_ACTION_SUCCESS:
            return {
                ...state,
                fetching: false,
                apiError: false,
                allOrderData: [...action.payload],
            };
        case Types.ORDER.UPDATE_ORDER_STATUS_ACTION_FAILURE:
            return {
                ...state,
                fetching: false,
                apiError: true,
            };

        default:
            return state;

    }
};
