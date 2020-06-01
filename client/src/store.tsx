import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./modules/reducer";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas/index";
import { devToolsEnhancer } from "redux-devtools-extension";

const sagaMiddleware = createSagaMiddleware();

const configureStore = () => {
  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(sagaMiddleware, thunk),
      devToolsEnhancer({ trace: true }),
    ),
  );
  sagaMiddleware.run(rootSaga);
  return store;
};

export default configureStore();
