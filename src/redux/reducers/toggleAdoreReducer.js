import { SET_ADORE } from "../actions";

const initialState = {};

const toggleAdoreReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ADORE:
      return {
        ...state,
        [action.payload.postId]: action.payload.likedByCurrentUser,
      };
    default:
      return state;
  }
};

export default toggleAdoreReducer;
