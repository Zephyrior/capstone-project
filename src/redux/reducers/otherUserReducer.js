import { SET_OTHERUSER } from "../actions";

const initialState = {
  otherUser: null,
};

const otherUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_OTHERUSER:
      return action.payload;
    default:
      return state;
  }
};

export default otherUserReducer;
