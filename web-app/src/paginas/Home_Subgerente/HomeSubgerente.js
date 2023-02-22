import React, { useContext } from "react";
import Topbar from "../../Componentes/Topbar/Topbar";
import "../../App.css"
import "../../assets/hojas-de-estilo/MainPage.css"
import { Outlet } from "react-router-dom";
import { SideBarDataSG } from "../../data/SideBarData_SubGerente";
import SideBar from "../../Componentes/sidebar/SideBar";
import { GlobalContext } from "../../context/GlobalProvider";

const HomeSubgerente = () => {
  const { menuHidden } = useContext(GlobalContext);
  return (
    <React.Fragment>
      <Topbar />
      <SideBar posicionUsuario="Subgerente" DataSidebar={SideBarDataSG} />
      <div className="grid-container">
        <div className={`sidebar-spacer ${menuHidden ? 'sidebar-spacer-hidden' : ''}`}></div>
        <Outlet />
      </div>
    </React.Fragment>

  );
}

export default HomeSubgerente;
