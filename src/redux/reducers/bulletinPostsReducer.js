import { APPEND_BULLETINPOSTS, DELETE_BULLETINPOST, SET_BULLETINPOSTS } from "../actions";

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
    case DELETE_BULLETINPOST:
      return {
        ...state,
        bulletinPosts: {
          ...state.bulletinPosts,
          content: state.bulletinPosts.content.filter((post) => post.id !== action.payload),
        },
      };
    default:
      return state;
  }
};

export default bulletinPostsReducer;
