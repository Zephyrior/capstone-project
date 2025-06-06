import { APPEND_BULLETINPOSTS, SET_BULLETINPOSTS } from "../actions";

const initialState = {
  bulletinPosts: {
    content: [],
    number: 0,
    last: false,
  },
};

const bulletinPostsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BULLETINPOSTS:
      return {
        ...state,
        bulletinPosts: action.payload,
      };
    case APPEND_BULLETINPOSTS:
      return {
        ...state,
        bulletinPosts: {
          ...action.payload,
          content: [...state.bulletinPosts.content, ...action.payload.content],
        },
      };
    default:
      return state;
  }
};

export default bulletinPostsReducer;
