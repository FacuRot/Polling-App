import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <Fragment>
      <section className="landing">
        <div className="dark-overlay">
          <div className="landing-inner">
            <h1 className="x-large">La Carroza de la Gente</h1>
            <p className="lead">
              Votá tu carroza favorita para que sea la ganadora de la Mención
              Dorada
            </p>
            <div className="buttons">
              <Link to="/register" className="btn btn-primary">
                Registrate
              </Link>
              <Link to="/login" className="btn btn-light">
                Iniciar Sesión
              </Link>
            </div>
            <small style={{ color: "grey" }}>
              Para votar es necesario que te registres en la aplicación
            </small>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Landing;
