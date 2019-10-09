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
      <img id="logoComuna" src={LogoComuna} alt="Comuna Gdor. Crespo" />
    </div>
  );
};

export default VotoEmitido;
