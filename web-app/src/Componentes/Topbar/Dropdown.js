import React, { useContext, useEffect, useState } from 'react';
import {Dropdown, DropdownToggle, DropdownMenu,DropdownItem,} from 'reactstrap';
import { Link } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';
import '../../assets/hojas-de-estilo/Dropdown.css';

const  DropdownButton =() => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const {logoutUsuario, datosUsuario} = useContext(AuthContext);
  const [nombreUsuario, setNombreUsuario] = useState("");
  const obtenerNombreUsuario = async() => {
    const {correo, posicion_Usuario} = datosUsuario;
    const body = {correo: correo};
    console.log(correo);
    try {
      //`https://comunicartewebapp-api.herokuapp.com/${posicion_Usuario}`
      //`http://localhost:5000/${posicion_Usuario}`
      console.log(posicion_Usuario);
      const respuesta = await fetch(
        `https://comunicartewebapp-api.herokuapp.com/${posicion_Usuario}`,{
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      ).then((respuesta) => respuesta.json()).then((data) => setNombreUsuario(data.nombreusuario)) ;
      
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    window.onbeforeunload = obtenerNombreUsuario();
  },[]);
    
    const toggle = () => setDropdownOpen((prevState) => !prevState);

    return (
      <React.Fragment>
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
      
    );
}

export default DropdownButton;