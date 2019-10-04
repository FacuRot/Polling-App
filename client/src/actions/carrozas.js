import axios from "axios";
import { GET_CARROZAS } from "./types";
import { setAlert } from "./alert";
import { loadUser } from "./auth";

export const getCarrozas = () => async dispatch => {
  try {
    const res = await axios.get("/api/carrozas");
    dispatch({
      type: GET_CARROZAS,
      payload: res.data
    });
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

export const createCarroza = (name, curso, history) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ name, curso });

  try {
    await axios.post("/api/carrozas", body, config);

    history.push("/carrozas");
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

export const votar = (id, history) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ id });

  try {
    if (
      window.confirm(
        "Estas seguro que quieres votar por esta carroza? Una vez emitido el voto no se puede cambiar"
      )
    ) {
      await axios.post("/api/carrozas/votar", body, config);
      dispatch(loadUser());
      history.push("/voto-emitido");
    }
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
  }
};
