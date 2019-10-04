import React, { Fragment } from "react";
import Spinner from "../../img/spinner.gif";

export default () => (
  <Fragment>
    <img src={Spinner} alt="Cargando..." style={{ width: "200px" }} />
  </Fragment>
);
