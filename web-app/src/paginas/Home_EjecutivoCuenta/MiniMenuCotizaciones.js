
import React from "react";
import { NavLink } from "react-router-dom";
import '../../assets/hojas-de-estilo/minimenu.css';

const minimenu = () => {

    return (
      <React.Fragment>
        <div className= "g_mm_fondo">
        <div className="g_mm_caja">
            <div className="g_mm_elementos">
              <NavLink to="/Ejecutivo_cuenta/cotizacion">
                Crear
              </NavLink>
            </div>
            <div className="g_mm_elementos">
              <NavLink to="/Ejecutivo_cuenta/cotizacion/ListarCotizaciones">
                Listado de Cotizaciones
              </NavLink>
            </div>
            
        </div>
    </div>
      </React.Fragment>
      
  );
  }

  export default minimenu;