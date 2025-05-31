import { SET_MYCIRCLES } from "../actions";

const initialState = {
  myCircles: [],
};

const myCirclesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MYCIRCLES:
      return {
        ...state,
        myCircles: action.payload,
      };
    default:
      return state;
  }
};

export default myCirclesReducer;
