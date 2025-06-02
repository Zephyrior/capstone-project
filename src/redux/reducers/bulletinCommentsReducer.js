import { ADD_BULLETINCOMMENTS, DELETE_BULLETINCOMMENTS, SET_BULLETINCOMMENTS, UPDATE_BULLETINCOMMENTS } from "../actions";

const initialState = {
  bulletinCommentsByPostId: {},
};

const bulletinCommentsReducer = (state = initialState, action) => {
  const { postId } = action.payload || {};

  switch (action.type) {
    case SET_BULLETINCOMMENTS:
      return {
        ...state,
        bulletinCommentsByPostId: {
          ...state.bulletinCommentsByPostId,
          [postId]: action.payload.bulletinComment,
        },
      };

    case ADD_BULLETINCOMMENTS:
      return {
        ...state,
        bulletinCommentsByPostId: {
          ...state.bulletinCommentsByPostId,
          [postId]: [...(state.bulletinCommentsByPostId[postId] || []), action.payload.bulletinComment],
        },
      };

    case UPDATE_BULLETINCOMMENTS:
      return {
        ...state,
        bulletinCommentsByPostId: {
          ...state.bulletinCommentsByPostId,
          [postId]: state.bulletinCommentsByPostId[postId].map((bulletinComment) =>
            bulletinComment.id === action.payload.bulletinComment.id ? action.payload.bulletinComment : bulletinComment
          ),
        },
      };

    case DELETE_BULLETINCOMMENTS:
      return {
        ...state,
        bulletinCommentsByPostId: {
          ...state.bulletinCommentsByPostId,
          [postId]: state.bulletinCommentsByPostId[postId].filter((bulletinComment) => bulletinComment.id !== action.payload.bulletinComment),
        },
      };
    default:
      return state;
  }
};

export default bulletinCommentsReducer;
