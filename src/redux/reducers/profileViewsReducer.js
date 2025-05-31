import { SET_PROFILEVIEWS } from "../actions";

const initialState = {
  profileViews: [],
};
const profileViewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROFILEVIEWS:
      return {
        ...state,
        profileViews: action.payload,
      };
    default:
      return state;
  }
};

export default profileViewsReducer;
