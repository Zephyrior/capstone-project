/* import { DELETE_BULLETINPOST } from "../actions";

const initialState = {
  deleteBulletin: [],
};

const deleteBulletinReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_BULLETINPOST:
      return {
        ...state,
        deleteBulletin: state.deleteBulletin.filter((bulletin) => bulletin.id !== action.payload.postId),
      };
    default:
      return state;
  }
};

export default deleteBulletinReducer;
 */
