import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../assets/hojas-de-estilo/HomeSection.css';

const HomeSection = ({ DataSidebar }) => {
  return (
    <section className="fondo-pantalla-coti">
      <div className="welcome-container">
        <div className="welcome-text-container">
          <div className="welcome-title full-width">
            Bievenido, usuario
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