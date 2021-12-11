import Types from "utils/types";
import agent from "config/agent";
import { notifySuccessToast } from "utils/helperFunction";

const getAddressAction = (handleSpinner) => async (dispatch) => {
  dispatch({
    type: Types.ADDRESS.GET_ADDRESS_ACTION_LOADING,
    payload: null,
  });

  try {
    const data = await agent.Address.getAll();

    dispatch({
      type: Types.ADDRESS.GET_ADDRESS_ACTION_SUCCESS,
      payload: data?.data?.result?.data,
    });
    handleSpinner(false);
  } catch (error) {
    dispatch({
      type: Types.ADDRESS.GET_ADDRESS_ACTION_FAILURE,
      payload: null,
    });
    handleSpinner(false);
  }
};

const addAddressAction =
  (payload, toggleEditAddress, handleSpinner) => async (dispatch) => {
    dispatch({
      type: Types.ADDRESS.ADD_ADDRESS_ACTION_LOADING,
      payload: null,
    });

    try {
      const data = await agent.Address.add(payload);

      const result = data?.data?.result?.data;

      dispatch({
        type: Types.ADDRESS.ADD_ADDRESS_ACTION_SUCCESS,
        payload: result,
      });
      notifySuccessToast("Address added Successfully!");
      handleSpinner(false);
      toggleEditAddress(false);
    } catch (error) {
      dispatch({
        type: Types.ADDRESS.ADD_ADDRESS_ACTION_FAILURE,
        payload: null,
      });
      handleSpinner(false);
      toggleEditAddress(false);
    }
  };

const deleteAddressAction = (id) => async (dispatch) => {
  dispatch({
    type: Types.ADDRESS.DELETE_ADDRESS_ACTION_LOADING,
    payload: null,
  });

  try {
    const data = await agent.Address.delete(id);

    const result = data.data.result.data;
    if (result.deleted) {
      const payload = await agent.Address.getAll();
      dispatch({
        type: Types.ADDRESS.DELETE_ADDRESS_ACTION_SUCCESS,
        payload: payload?.data?.result?.data,
      });
      notifySuccessToast("Address deleted Successfully!");
    }
  } catch (error) {
    dispatch({
      type: Types.ADDRESS.DELETE_ADDRESS_ACTION_FAILURE,
      payload: null,
    });
  }
};

export { getAddressAction, addAddressAction, deleteAddressAction };
