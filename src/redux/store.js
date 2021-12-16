import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import throttle from "lodash/throttle";

import { loadState, saveState } from "utils/localStorage";

import rootReducer from "./rootReducer";

const persistedState = loadState();

const store = createStore(
  rootReducer,
  persistedState,
  applyMiddleware(thunk)
);

store.subscribe(
  throttle(() => {
    saveState({
      checkoutListReducer: store.getState().checkoutListReducer,
      localOrderReducer: store.getState().localOrderReducer,
    });
  }, 1000)
);

export { store };
