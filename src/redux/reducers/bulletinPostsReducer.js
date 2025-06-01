import { SET_BULLETINPOSTS } from "../actions";

const initialState = {
  bulletinPosts: null,
};

const bulletinPostsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BULLETINPOSTS:
      return {
        ...state,
        bulletinPosts: action.payload,
      };
    default:
      return state;
  }
};

export default bulletinPostsReducer;
