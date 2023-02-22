import React from "react";
import { useNavigate } from "react-router-dom";
import '../../assets/hojas-de-estilo/GestionPerfiles.css';
import Minimenu from "./MiniMenu";

const GestionarPerfilesCE = () => {

    const navigate = useNavigate();
    return (
    <React.Fragment>
      <section>
        <Minimenu/>

      </section>
    </React.Fragment>  
  );
  }
  
  export default GestionarPerfilesCE;