import React, { useEffect, useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../../assets/hojas-de-estilo/HomeSection.css';
import { AuthContext } from '../../context/AuthContext';
import { obtenerNombreUsuario } from '../peticiones/obtenerNombreUsuario';

const HomeSection = ({ DataSidebar }) => {

  const {datosUsuario} = useContext(AuthContext);
  const [nombreUsuario, setNombreUsuario] = useState("");

  useEffect(() => {
    if(datosUsuario.nombre_usuario === undefined){
      window.onbeforeunload = obtenerNombreUsuario(datosUsuario, setNombreUsuario);
    } else {
      setNombreUsuario(datosUsuario.nombre_usuario);
    } 
  },[])
  return (
    <section>
      <div className="welcome-container">
        <div className="welcome-text-container">
          <div className="welcome-title full-width">
            Bievenido, {nombreUsuario}
          </div>
          <br />
          <div className="welcome-text">
            Esta es tu sección de principal, desde aquí puedes acceder a todas las funcionalidades de la plataforma.
          </div>
        </div>
      </div>
      <div className="home-container">
        {DataSidebar.map(({title, icon: Icon}) => (
          "home" !== title.toLowerCase() ?
            <NavLink key={title} className="home-button">
              <div className="navigation-icon-home">
                <Icon style={{display: 'block',  width: '3rem', height: '3rem', paddingLeft: '1rem'}} />
              </div>
              {title}
            </NavLink>
            : <></>
        ))}
      </div>
    </section>
  )
}

export default HomeSection;