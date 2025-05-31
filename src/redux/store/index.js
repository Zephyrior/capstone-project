import { combineReducers, configureStore } from "@reduxjs/toolkit";
import tokenReducer from "../reducers/tokenReducer";
import userReducer from "../reducers/userReducer";
import profileViewsReducer from "../reducers/profileViewsReducer";

const rootReducer = combineReducers({
  token: tokenReducer,
  user: userReducer,
  profileViews: profileViewsReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
