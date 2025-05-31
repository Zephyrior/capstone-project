import { SET_MYSMALLCIRCLE } from "../actions";

const initialState = {
  mySmallCircle: [],
};

const mySmallCircleReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MYSMALLCIRCLE:
      return {
        ...state,
        mySmallCircles: action.payload,
      };
    default:
      return state;
  }
};

export default mySmallCircleReducer;
