import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import throttle from "lodash/throttle";

import { loadState, saveState } from "utils/localStorage";

import rootReducer from "./rootReducer";

const persistedState = loadState();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  persistedState,
  composeEnhancers(applyMiddleware(thunk))
);

store.subscribe(
  throttle(() => {
    saveState({
      checkoutListReducer: store.getState().checkoutListReducer,
      // itemsReducer: store.getState().itemsReducer,
    });
  }, 1000)
);

export { store };
