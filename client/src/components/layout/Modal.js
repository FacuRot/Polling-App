import React, { useState } from "react";

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
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "center"
          }}
        >
          <button
            onClick={() => setDisplay(false)}
            className="btn btn-primary my-1"
            style={{
              display: "flex"
            }}
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
