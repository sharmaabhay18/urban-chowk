import Types from "utils/types";
import agent from "config/agent";
import { notifySuccessToast } from "utils/helperFunction";

const getAdminOrderAction = (spinnerAction) => async (dispatch) => {
    dispatch({
        type: Types.ORDER.GET_ALL_ORDER_ACTION_LOADING,
        payload: null,
    });

    try {
        const data = await agent.Order.getAllOrder();
        dispatch({
            type: Types.ORDER.GET_ALL_ORDER_ACTION_SUCCESS,
            payload: data?.data?.result?.data,
        });
        spinnerAction(false);
    } catch (error) {
        dispatch({
            type: Types.ORDER.GET_ALL_ORDER_ACTION_FAILURE,
            payload: null,
        });
        spinnerAction(false);
    }
};

const getOrderAction = (spinnerAction) => async (dispatch) => {
    dispatch({
        type: Types.ORDER.GET_ORDER_ACTION_LOADING,
        payload: null,
    });

    try {
        const data = await agent.Order.getAll();
        dispatch({
            type: Types.ORDER.GET_ORDER_ACTION_SUCCESS,
            payload: data?.data?.result?.data,
        });
        spinnerAction(false);
    } catch (error) {
        dispatch({
            type: Types.ORDER.GET_ORDER_ACTION_FAILURE,
            payload: null,
        });
        spinnerAction(false);
    }
};

const addOrderAction = (payload, history, handleSpinner) => async (dispatch) => {
    dispatch({
        type: Types.ORDER.ADD_ORDER_ACTION_LOADING,
        payload: null,
    });

    try {
        const data = await agent.Order.add(payload);
        const result = data?.data?.result?.data?.isCreated;
        if (result) {
            dispatch({
                type: Types.ORDER.ADD_ORDER_ACTION_SUCCESS,
                payload: payload?.data?.result?.data,
            });
            notifySuccessToast("Order placed successfully!");
            history.push("/order-details");
            handleSpinner(false);
        }
    } catch (error) {
        const errorMessage = error?.data?.message || "Something went wrong!";
        dispatch({
            type: Types.ORDER.ADD_ORDER_ACTION_FAILURE,
            payload: {
                isError: true,
                errorMessage,
            },
        });
        handleSpinner(false);
    }
};



export { addOrderAction, getOrderAction, getAdminOrderAction };
