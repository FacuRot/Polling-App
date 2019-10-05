import {
  GET_CARROZAS,
  GET_VOTOS,
  GET_RESULTADOS,
  CLEAR_CARROZAS
} from "../actions/types";

const initialState = {
  carrozas: [],
  resultados: [],
  loading: true,
  votos: null
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
    case GET_VOTOS:
      return {
        ...state,
        votos: payload,
        loading: false
      };
    case GET_RESULTADOS:
      return {
        ...state,
        resultados: payload,
        loading: false
      };
    case CLEAR_CARROZAS:
      return {
        ...state,
        carrozas: [],
        resultados: [],
        loading: true,
        votos: null
      };
    default:
      return state;
  }
}
