import { SET_TOKEN } from "../actions";

const initialState = {
  token: "",
};

const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        token: action.payload,
      };
    default:
      return state;
  }
};

export default tokenReducer;
