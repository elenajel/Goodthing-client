import { combineReducers } from "redux";
import bugsReducer from "./bugs";

export default combineReducers({
  test: bugsReducer,
});
