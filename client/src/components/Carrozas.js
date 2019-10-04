import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCarrozas, votar } from "../actions/carrozas";
import Spinner from "./layout/Spinner";

const Carrozas = ({
  getCarrozas,
  carrozas: { loading, carrozas },
  user,
  history,
  votar
}) => {
  useEffect(() => {
    getCarrozas();
  });

  const vote = id => {
    votar(id, history);
  };

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
  ) : (
    <div className="container">
      <h1 className="large">Votá tu carroza favorita</h1>
      {carrozas.map(carroza => (
        <div className="item">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <section>
              <strong>{carroza.name}</strong> <br />
              {carroza.curso}
            </section>
            {user !== null && !user.voto && (
              <button
                onClick={() => vote(carroza._id)}
                className="btn btn-primary"
              >
                Votar
              </button>
            )}
          </div>
        </div>
      ))}
      {user !== null && user.isAdmin && (
        <Link to="/add-carroza" className="btn btn-light">
          Agregar Carroza
        </Link>
      )}
    </div>
  );
};

Carrozas.propTypes = {
  getCarrozas: PropTypes.func.isRequired,
  votar: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  carrozas: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  carrozas: state.carrozas
});

export default connect(
  mapStateToProps,
  { getCarrozas, votar }
)(Carrozas);
