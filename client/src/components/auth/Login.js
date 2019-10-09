import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";
import LogoComuna from "../../img/logocomuna-02.png";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to="/carrozas" />;
  }

  return (
    <div className="container">
      <h1 className="large text-primary">Iniciá Sesión</h1>
      <section style={{ display: "flex" }}>
        <i className="material-icons md-36">person_outline</i>{" "}
        <p className="lead">Ingresá con tu cuenta</p>
      </section>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Contraseña"
            name="password"
            value={password}
            onChange={e => onChange(e)}
            minLength="6"
          />
        </div>
        <input
          type="submit"
          className="btn btn-primary"
          value="Iniciar Sesión"
        />
      </form>
      <p className="my-1">
        Todavia no tenes una cuenta? <Link to="/register">Registrate</Link>
      </p>
      <img id="logoComuna" src={LogoComuna} alt="Comuna Gdor. Crespo" />
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
