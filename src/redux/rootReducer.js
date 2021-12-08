import { combineReducers } from "redux";
import signupReducer from "redux/reducers/signupReducer";
import loginReducer from "redux/reducers/loginReducer";
import forgotPasswordReducer from "redux/reducers/forgetPasswordReducer";
import testimonialReducer from "redux/reducers/testimonialReducer";
import spinnerReducer from "redux/reducers/spinnerReducer";
import userReducer from "redux/reducers/userReducer";
import couponReducer from "redux/reducers/couponReducer";

const rootReducer = combineReducers({
  signupReducer,
  loginReducer,
  forgotPasswordReducer,
  testimonialReducer,
  spinnerReducer,
  userReducer,
  couponReducer,
});

export default rootReducer;
