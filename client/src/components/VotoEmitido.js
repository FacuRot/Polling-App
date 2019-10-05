import React from "react";
import LogoComuna from "../img/logocomuna-02.png";

const VotoEmitido = () => {
  return (
    <div className="container">
      <h1 className="large text-center">
        Su voto ha sido procesado exitosamente
        <br />
        <i className="material-icons success md-36">check_circle_outline</i>
      </h1>
      <p className=" text-center lead my-3">Gracias por participar</p>
      <img
        src={LogoComuna}
        alt="Comuna Gdor. Crespo"
        style={{ width: "200px", margin: "auto", display: "block" }}
      />
    </div>
  );
};

export default VotoEmitido;
