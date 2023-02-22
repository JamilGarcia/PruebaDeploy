import React from "react";
import { useNavigate } from "react-router-dom";
import '../../assets/hojas-de-estilo/GestionPerfiles.css';
import CreateEmpleado from "./CreateEmpleado";
import Minimenu from "./MiniMenu";

const GestionarPerfilesCE = () => {

    const navigate = useNavigate();
    return (
    <React.Fragment>
      <section>
        <Minimenu/>
        <CreateEmpleado />
        {/*
        
        <div className="contenedorBotones">
          <h2 className="title">Gestion de Perfiles de Empleados</h2>
          <button type="button" className="botonGestionarPerfiles" onClick={() =>navigate('/crear_empleado')}>Crear Empleado</button>
          <button type="button" className="botonGestionarPerfiles">Modificar Empleado</button>
          <button type="button" className="botonGestionarPerfiles">Eliminar Empleado</button>
        </div>
    */}
      </section>
    </React.Fragment>  
  );
  }
  
  export default GestionarPerfilesCE;