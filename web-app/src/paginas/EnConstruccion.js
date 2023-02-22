import React from "react";
import '../assets/hojas-de-estilo/Enconstruccion.css';
import Imagen from '../assets/imagenes/UnderConstruction.jpg';

const EnConstruccion = () => {

    return (
      <React.Fragment>
        <div className= "ec_fondo">
        <div className="ec_caja">
            <img className= "FotoEC" src={Imagen}/>
            
        </div>
    </div>
      </React.Fragment>
      
  );
  }
  
  export default EnConstruccion;