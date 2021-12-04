import { combineReducers } from "redux";
import signupReducer from "redux/reducers/signupReducer";
import loginReducer from "redux/reducers/loginReducer";
import forgotPasswordReducer from "redux/reducers/forgetPasswordReducer";
import testimonialReducer from "redux/reducers/testimonialReducer";

const rootReducer = combineReducers({
  signupReducer,
  loginReducer,
  forgotPasswordReducer,
  testimonialReducer,
});

export default rootReducer;
