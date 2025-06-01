import { SET_CREATEBULLETIN } from "../actions";

const initialState = {
  createBulletin: [],
};

const createBulletinReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CREATEBULLETIN:
      return {
        ...state,
        createBulletin: action.payload,
      };
    default:
      return state;
  }
};

export default createBulletinReducer;
