import React, { useState } from "react";
import LogoComuna from "../../img/logocomuna-02.png";

const Modal = () => {
  const [display, setDisplay] = useState({
    display: true
  });

  if (!display) {
    return null;
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center"
      }}
    >
      <div className="modal">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <h1>
            El premio Mención Dorada es otorgado por la{" "}
            <span>Comuna de Gobernador Crespo</span>
          </h1>
          <img id="logoComuna" src={LogoComuna} alt="Comuna de Gdor. Crespo" />
          <button
            onClick={() => setDisplay(false)}
            className="btn btn-primary my-1"
            style={{ display: "flex" }}
          >
            Entendido{" "}
            <i className="material-icons" style={{ marginLeft: "3px" }}>
              thumb_up_alt
            </i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
