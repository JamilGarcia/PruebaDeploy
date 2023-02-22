import React, { useContext, useEffect, useState } from 'react';
import {Dropdown, DropdownToggle, DropdownMenu,DropdownItem,} from 'reactstrap';
import { Link } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';
import '../../assets/hojas-de-estilo/Dropdown.css';
import { obtenerNombreUsuario } from '../peticiones/obtenerNombreUsuario';

const  DropdownButton =() => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const {logoutUsuario, datosUsuario} = useContext(AuthContext);
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [Foto, setFoto] = useState("");
  useEffect(() => {
    //Si no esta guardado el nombre de usuario mandar a llamar metodo
    if(datosUsuario.nombre_usuario === undefined){
      window.onbeforeunload = obtenerNombreUsuario(datosUsuario, setNombreUsuario,setFoto);
    }else{
      setNombreUsuario(datosUsuario.nombre_usuario);
    } 
      
    
  },[]);
    
    const toggle = () => setDropdownOpen((prevState) => !prevState);

    return (
      
        <div className='seccionDropdown'>
          <React.Fragment>
            <img className='foto_in_dropdown' src={Foto}  />
            <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={'down'} >
              <DropdownToggle caret className="botondeperfil"> <React.Fragment>{nombreUsuario}</React.Fragment> </DropdownToggle>
              <DropdownMenu>
                <DropdownItem header>Perfil</DropdownItem>
                <DropdownItem tag={Link} to={"/perfil_usuario"}>Ver Perfil</DropdownItem>
                <DropdownItem tag={Link} to={"/modificar_perfil"}>Modificar Perfil</DropdownItem>
                <DropdownItem divider />
                <DropdownItem  onClick={logoutUsuario}>Cerrar Sesion</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </React.Fragment>
        </div>
        
      
      
      
    );
}

export default DropdownButton;