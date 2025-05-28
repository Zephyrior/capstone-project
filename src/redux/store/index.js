import { combineReducers, configureStore } from "@reduxjs/toolkit";
import tokenReducer from "../reducers/tokenReducer";
import userReducer from "../reducers/userReducer";

const rootReducer = combineReducers({
  token: tokenReducer,
  user: userReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
