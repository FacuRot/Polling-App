import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createCarroza } from "../../actions/carrozas";

const AddCarroza = ({ createCarroza, history }) => {
  const [formData, setFormData] = useState({
    name: "",
    curso: ""
  });

  const { name, curso } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createCarroza(name, curso, history);
  };

  return (
    <div className="container">
      <h1 className="large text-primary">Añadir una Carroza</h1>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Nombre de la carroza"
            name="name"
            value={name}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Curso de la carroza"
            name="curso"
            value={curso}
            onChange={e => onChange(e)}
          />
        </div>
        <input
          type="submit"
          className="btn btn-primary"
          value="Añadir Carroza"
        />
      </form>
    </div>
  );
};

AddCarroza.propTypes = {
  createCarroza: PropTypes.func.isRequired
};

export default connect(
  null,
  { createCarroza }
)(AddCarroza);
