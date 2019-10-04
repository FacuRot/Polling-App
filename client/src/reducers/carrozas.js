import { GET_CARROZAS } from "../actions/types";

const initialState = {
  carrozas: [],
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CARROZAS:
      return {
        ...state,
        carrozas: payload,
        loading: false
      };
    default:
      return state;
  }
}
