import { SET_ADDCIRCLE, SET_ACCEPTCIRCLE, SET_CANCELCIRCLE, SET_DECLINECIRCLE, SET_CIRCLERELATIONSHIP } from "../actions";

const initialState = {
  circles: {},
  relationships: {},
};

const circleReducer = (state = initialState, action) => {
  const { receiverId, requestId, circleId, userId1, userId2, addCircle, requestCircle, circleRelationship } = action.payload || {};

  switch (action.type) {
    case SET_ADDCIRCLE:
      return {
        ...state,
        circles: {
          ...state.circles,
          [receiverId]: addCircle,
        },
      };

    case SET_ACCEPTCIRCLE:
      return {
        ...state,
        circles: {
          ...state.circles,
          [requestId]: requestCircle,
        },
      };

    case SET_CANCELCIRCLE:
    case SET_DECLINECIRCLE: {
      const newCircles = Object.fromEntries(Object.entries(state.circles).filter(([key]) => key !== String(circleId)));

      const newRelationships = Object.fromEntries(Object.entries(state.relationships).filter(([, rel]) => rel.id !== circleId));

      return {
        ...state,
        circles: newCircles,
        relationships: newRelationships,
      };
    }

    case SET_CIRCLERELATIONSHIP:
      if (!circleRelationship) {
        const newRelationships = { ...state.relationships };
        delete newRelationships[`${userId1}_${userId2}`];
        delete newRelationships[`${userId2}_${userId1}`];
        return {
          ...state,
          relationships: newRelationships,
        };
      }
      return {
        ...state,
        relationships: {
          ...state.relationships,
          [`${userId1}_${userId2}`]: circleRelationship,
          [`${userId2}_${userId1}`]: circleRelationship,
        },
      };

    default:
      return state;
  }
};

export default circleReducer;
