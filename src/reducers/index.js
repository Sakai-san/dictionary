// @flow
import { combineReducers } from "redux";
import Dictionaries from "./dictionaries";

const allReducers: Function = combineReducers({
  dictionaries: Dictionaries
});

export default allReducers;
