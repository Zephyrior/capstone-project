import { APPEND_BULLETINPOSTS, DELETE_BULLETINPOST, EDIT_BULLETINPOST, RESET_BULLETIN_POSTS, SET_BULLETINPOSTS } from "../actions";

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
    case EDIT_BULLETINPOST:
      return {
        ...state,
        bulletinPosts: {
          ...state.bulletinPosts,
          content: state.bulletinPosts.content.map((post) => (post.id === action.payload.id ? action.payload : post)),
        },
      };
    case RESET_BULLETIN_POSTS:
      return {
        ...state,
        bulletinPosts: {
          content: [],
          number: 0,
          last: false,
        },
      };
    default:
      return state;
  }
};

export default bulletinPostsReducer;
