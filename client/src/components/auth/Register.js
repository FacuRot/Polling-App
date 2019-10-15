import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";
import LogoComuna from "../../img/logoazul-01.png";

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    tel: ""
  });

  const { name, email, password, password2, tel } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();

    if (password !== password2) {
      setAlert("Las contraseñas no coinciden", "danger");
    } else {
      register({ name, email, password, tel });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/carrozas" />;
  }

  return (
    <div className="container">
      <h1 className="large text-primary">Registrate</h1>
      <section style={{ display: "flex" }}>
        <i className="material-icons md-36">person_outline</i>{" "}
        <p className="lead">Creá tu cuenta para poder votar</p>
      </section>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Nombre"
            name="name"
            value={name}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            placeholder="Número de tel."
            name="tel"
            value={tel}
            onChange={e => onChange(e)}
          />
          <small>Ingrese la caracteristica de su num.</small>
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
        <div className="form-group">
          <input
            type="password"
            placeholder="Repetir Contraseña"
            name="password2"
            value={password2}
            onChange={e => onChange(e)}
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Crear Cuenta" />
      </form>
      <p className="my-1">
        Ya tenés una cuenta? <Link to="/login">Iniciar Sesión</Link>
      </p>
      <img id="logoComuna" src={LogoComuna} alt="Comuna Gdor. Crespo" />
    </div>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { setAlert, register }
)(Register);
