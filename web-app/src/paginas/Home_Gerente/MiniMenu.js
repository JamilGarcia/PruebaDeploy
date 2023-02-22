import { style } from '@mui/system';
import { hover } from '@testing-library/user-event/dist/hover';
import React, {useState} from 'react';
import { NavLink } from "react-router-dom";
import '../../assets/hojas-de-estilo/minimenu.css';
const Minimenu = () => {
  const [active, setActive] = useState(true);

  const handleClick = () => {
    setActive(true);
  };

  const handleClick2 = () => {
    setActive(false);
  };

  
    return (
      <React.Fragment>
        <div className= "g_mm_fondo">
        <div className="g_mm_caja">
            <div className="g_mm_elementos" onChange={handleClick}
              style={{ backgroundColor: active ? "#F9C6DD" : "#EC428C"
                     }} 
                     >
              <NavLink to="/Gerente/gestion_perfiles/crear_perfil"
              
              >
                Crear
              </NavLink>
            </div>
            <div className="g_mm_elementos"onClick={handleClick2}
              style={{backgroundColor: active ? "#EC428C" :"#F9C6DD"  }}>
              <NavLink to="/Gerente/gestion_perfiles/modificarEliminar_perfil">
                Modificar/Eliminar
              </NavLink>
            </div>
        </div>
    </div>
      </React.Fragment>
      
  );
  }
  
  export default Minimenu;