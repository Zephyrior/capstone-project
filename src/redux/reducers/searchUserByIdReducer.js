import { SEARCH_USERID } from "../actions";

const initialState = {
  searchUserById: null,
};

const searchUserByIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_USERID:
      return action.payload;
    default:
      return state;
  }
};
export default searchUserByIdReducer;
