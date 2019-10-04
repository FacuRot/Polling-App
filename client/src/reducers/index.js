import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import carrozas from "./carrozas";

export default combineReducers({
  alert,
  auth,
  carrozas
});
