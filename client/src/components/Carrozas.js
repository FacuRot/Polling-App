import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCarrozas, votar, getVotos } from "../actions/carrozas";
import Spinner from "./layout/Spinner";
import LogoComuna from "../img/logocomuna-02.png";
import Modal from "./layout/Modal";
import china from "../img/china.png";
import brasil from "../img/brasil.png";
import rusia from "../img/rusia.png";
import mexico from "../img/mexico.png";
import egipto from "../img/egipto.png";
import india from "../img/india.png";
import eeuu from "../img/eeuu.png";
import japon from "../img/japon.png";

const Carrozas = ({
  getCarrozas,
  getVotos,
  carrozas: { loading, carrozas, votos },
  user,
  history,
  votar
}) => {
  useEffect(() => {
    getCarrozas();
    getVotos();
  }, []);

  const vote = id => {
    votar(id, history);
  };

  const paises = [china, brasil, rusia, mexico, egipto, india, eeuu, japon];

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
    <Fragment>
      <Modal />
      <div>
        <div className="container">
          <h1 className="large">Votá tu carroza favorita</h1>
          <p className="lead">{`Votos emitidos hasta el momento ${
            votos !== null ? votos : 0
          }`}</p>
        </div>
        <div className="items-container">
          {carrozas.map((carroza, i) => (
            <div
              className="item"
              style={{
                background: `url(${paises[i]}) no-repeat center center/cover`
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center"
                }}
              >
                <section>
                  <h3 style={{ fontSize: "25px" }}>
                    {carroza.name.toUpperCase()}
                  </h3>
                  <p>
                    <strong>{carroza.curso}</strong>
                  </p>
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
        </div>
        {user !== null && user.isAdmin && (
          <Link to="/add-carroza" className="btn btn-light">
            Agregar Carroza
          </Link>
        )}
        <img id="logoComuna" src={LogoComuna} alt="Comuna de Gdor. Crespo" />
      </div>
    </Fragment>
  );
};

Carrozas.propTypes = {
  getCarrozas: PropTypes.func.isRequired,
  getVotos: PropTypes.func.isRequired,
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
  { getCarrozas, votar, getVotos }
)(Carrozas);
