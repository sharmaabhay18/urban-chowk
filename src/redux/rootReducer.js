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
});

export default rootReducer;
