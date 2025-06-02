import { SET_OTHERSCIRCLE } from "../actions";

const initialState = {
  othersCircle: [],
};

const othersCircleReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_OTHERSCIRCLE:
      return {
        ...state,
        othersCircle: action.payload,
      };
    default:
      return state;
  }
};

export default othersCircleReducer;
