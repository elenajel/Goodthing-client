import { createStore } from "redux";
import reducer from "./modules/reducer";
// import { devToolsEnhancer } from "redux-devtools-extension";
const store = createStore(reducer);

export default store;
