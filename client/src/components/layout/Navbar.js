import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import LogoComuna from "../../img/logocomuna-02.png";

const Navbar = ({ logout, auth: { isAuthenticated, loading, user } }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to="/carrozas">Carrozas</Link>
      </li>
      {user !== null && user.isAdmin && (
        <li>
          <Link to="/resultado">Resultados</Link>
        </li>
      )}
      <li>
        <a onClick={logout} href="#!">
          Salir
        </a>
      </li>
    </ul>
  );

  const guessLinks = (
    <ul>
      <li>
        <Link to="/login">Iniciar Sesión</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <img src={LogoComuna} alt="Comuna de Gdor. Crespo" />
          <span className="hide-sm" style={{ marginLeft: "5px" }}>
            La Carroza de la Gente
          </span>
        </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guessLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
