import { combineReducers, configureStore } from "@reduxjs/toolkit";
import tokenReducer from "../reducers/tokenReducer";

const rootReducer = combineReducers({
  token: tokenReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
