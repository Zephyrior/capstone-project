import { combineReducers, configureStore } from "@reduxjs/toolkit";
import tokenReducer from "../reducers/tokenReducer";
import userReducer from "../reducers/userReducer";
import profileViewsReducer from "../reducers/profileViewsReducer";
import myCirclesReducer from "../reducers/myCirclesReducer";
import mySmallCircleReducer from "../reducers/mySmallCircleReducer";

const rootReducer = combineReducers({
  token: tokenReducer,
  user: userReducer,
  profileViews: profileViewsReducer,
  myCircles: myCirclesReducer,
  mySmallCircle: mySmallCircleReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
