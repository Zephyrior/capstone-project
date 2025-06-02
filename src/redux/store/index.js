import { combineReducers, configureStore } from "@reduxjs/toolkit";
import tokenReducer from "../reducers/tokenReducer";
import userReducer from "../reducers/userReducer";
import profileViewsReducer from "../reducers/profileViewsReducer";
import myCirclesReducer from "../reducers/myCirclesReducer";
import mySmallCircleReducer from "../reducers/mySmallCircleReducer";
import bulletinPostsReducer from "../reducers/bulletinPostsReducer";
import createBulletinReducer from "../reducers/createBulletinReducer";
import bulletinCommentsReducer from "../reducers/bulletinCommentsReducer";
import otherUserReducer from "../reducers/otherUserReducer.js";

const rootReducer = combineReducers({
  token: tokenReducer,
  user: userReducer,
  profileViews: profileViewsReducer,
  myCircles: myCirclesReducer,
  mySmallCircle: mySmallCircleReducer,
  bulletinPosts: bulletinPostsReducer,
  createBulletin: createBulletinReducer,
  bulletinComments: bulletinCommentsReducer,
  otherUser: otherUserReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
