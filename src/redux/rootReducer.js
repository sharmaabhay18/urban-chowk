import { combineReducers } from "redux";
import signupReducer from "redux/reducers/signupReducer";
import loginReducer from "redux/reducers/loginReducer";
import forgotPasswordReducer from "redux/reducers/forgetPasswordReducer";
import testimonialReducer from "redux/reducers/testimonialReducer";
import spinnerReducer from "redux/reducers/spinnerReducer";
import userReducer from "redux/reducers/userReducer";
import couponReducer from "redux/reducers/couponReducer";
import categoryReducer from "redux/reducers/categoryReducer";
import itemsReducer from "redux/reducers/itemsReducer";
import allItemsReducer from "redux/reducers/allItemsReducer";
import checkoutListReducer from "redux/reducers/checkoutListReducer";
import localOrderReducer from "redux/reducers/localOrderReducer";
import addressReducer from "redux/reducers/addressReducer";
import orderReducer from "redux/reducers/orderReducer"
import allOrderReducer from "redux/reducers/allOrderReducer";

const rootReducer = combineReducers({
  signupReducer,
  loginReducer,
  forgotPasswordReducer,
  testimonialReducer,
  spinnerReducer,
  userReducer,
  couponReducer,
  categoryReducer,
  itemsReducer,
  allItemsReducer,
  checkoutListReducer,
  localOrderReducer,
  addressReducer,
  orderReducer,
  allOrderReducer
});

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  if (action.type === "LOGOUT_ACTION_SUCCESS") {
    state.loginReducer = undefined;
    state.userReducer = undefined;
    state.addressReducer = undefined;
    state.localOrderReducer = undefined;
    state.orderReducer = undefined;
    state.allOrderReducer = undefined;
  }
  return rootReducer(state, action);
};


