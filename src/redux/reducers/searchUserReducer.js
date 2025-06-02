import { SEARCH_USER } from "../actions";

const initialState = {
  searchUser: [],
};

const searchUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_USER:
      return {
        ...state,
        searchUser: action.payload,
      };
    default:
      return state;
  }
};

export default searchUserReducer;
