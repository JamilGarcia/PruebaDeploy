import React from "react";
import { useNavigate } from "react-router-dom";
import ListarEmpleadosyModElim from "./ListarEmpleadosyModElim";
import Minimenu from "./MiniMenu";

const GestionarPerfilesMOD = () => {

    const navigate = useNavigate();
    return (
    <React.Fragment>
      <section>
        <Minimenu/>
        <ListarEmpleadosyModElim/>
      </section>
    </React.Fragment>  
  );
  }
  
  export default GestionarPerfilesMOD;