import React, { useContext } from "react";
import SideBar from "../../Componentes/sidebar/SideBar";
import Topbar from "../../Componentes/Topbar/Topbar";
import "../../App.css";
import "../../assets/hojas-de-estilo/MainPage.css";
import { Outlet } from "react-router-dom";
import { SideBarDataG } from "../../data/SideBarData_Gerente";
import { GlobalContext } from "../../context/GlobalProvider";

const HomeGerente = () => {
  const { menuHidden } = useContext(GlobalContext);
  return (
    <React.Fragment>
      <Topbar />
      <SideBar posicionUsuario="Gerente" DataSidebar={SideBarDataG} />
      <div className="grid-container">
        <div className={`sidebar-spacer ${menuHidden ? 'sidebar-spacer-hidden' : ''}`}></div>
        <Outlet />
      </div>
    </React.Fragment>

  );
}

export default HomeGerente;
