import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getResultado } from "../actions/carrozas";
import Spinner from "./layout/Spinner";

const Resultados = ({
  getResultado,
  auth: { user },
  carrozas: { resultados, loading }
}) => {
  useEffect(() => {
    getResultado();
  }, []);

  return loading ? (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Spinner />
    </div>
  ) : user.isAdmin ? (
    <div className="container">
      {resultados.map(carroza => (
        <div className="item">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <section>
              <strong>{carroza.name}</strong> <br />
              {carroza.curso}
            </section>
            {carroza.votos}
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="container">No tienes permiso</div>
  );
};

Resultados.propTypes = {
  getResultado: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  carrozas: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  carrozas: state.carrozas
});

export default connect(
  mapStateToProps,
  { getResultado }
)(Resultados);
