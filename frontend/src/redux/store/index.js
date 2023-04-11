import { createStore, applyMiddleware, compose } from "redux";

import thunk from "redux-thunk";
import reducer from "../reducers/index";

const middlewares = [thunk];

const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;

const store = createStore(
  reducer,
  {},
  composeEnhancers(applyMiddleware(...middlewares))
);

export { store };
