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
import searchUserReducer from "../reducers/searchUserReducer.js";
import searchUserByIdReducer from "../reducers/searchUserByIdReducer.js";
import toggleAdoreReducer from "../reducers/toggleAdoreReducer.js";
import othersCircleReducer from "../reducers/othersCircleReducer.js";
import circlesReducer from "../reducers/circlesReducer.js";

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
  searchUser: searchUserReducer,
  searchUserById: searchUserByIdReducer,
  othersCircle: othersCircleReducer,
  toggleAdore: toggleAdoreReducer,
  circles: circlesReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
