import React, { useContext } from "react";
import Topbar from "../../Componentes/Topbar/Topbar";
import "../../App.css";
//../../assets/hojas-de-estilo/MainPage.css
import "../../assets/hojas-de-estilo/MainPage.css";
import { Outlet } from "react-router-dom";
import SideBar from "../../Componentes/sidebar/SideBar";
import { SideBarDataEC } from "../../data/SideBarData_EjecutivoCuenta";
import { GlobalContext } from "../../context/GlobalProvider";

const HomeEjecutivoCuenta = () => {
  const {menuHidden} = useContext(GlobalContext);
  return (
    <React.Fragment>
      <Topbar />
      <SideBar posicionUSuario="Ejecutivo Cuenta" DataSidebar={SideBarDataEC} />
      <div className="grid-container">
        <div className={`sidebar-spacer ${menuHidden ? 'sidebar-spacer-hidden' : ''}`}></div>
        <Outlet />
      </div>
    </React.Fragment>

  );
}

export default HomeEjecutivoCuenta;