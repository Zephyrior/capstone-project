import { ADD_BULLETINCOMMENTS, DELETE_BULLETINCOMMENTS, SET_BULLETINCOMMENTS, UPDATE_BULLETINCOMMENTS } from "../actions";

const initialState = {
  bulletinComments: [],
};

const bulletinCommentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BULLETINCOMMENTS:
      return {
        ...state,
        bulletinComments: action.payload,
      };

    case ADD_BULLETINCOMMENTS:
      return {
        ...state,
        bulletinComments: [...state.bulletinComments, action.payload],
      };

    case UPDATE_BULLETINCOMMENTS:
      return {
        ...state,
        bulletinComments: state.bulletinComments.map((comment) => (comment.id === action.payload.id ? action.payload : comment)),
      };

    case DELETE_BULLETINCOMMENTS:
      return {
        ...state,
        bulletinComments: state.bulletinComments.filter((comment) => comment.id !== action.payload),
      };
    default:
      return state;
  }
};

export default bulletinCommentsReducer;
