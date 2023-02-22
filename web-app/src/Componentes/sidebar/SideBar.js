import React from "react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import "../../assets/hojas-de-estilo/SideBar.css";
import { GlobalContext } from "../../context/GlobalProvider";


const SideBar = (props) => {
  const { DataSidebar } = props;
  const { menuHidden } = useContext(GlobalContext);

  return (
    <section
      className={`${menuHidden ? 'sidebar-hidden': ''}`}
    >
      <div
        className={`sidebar ${menuHidden ? 'sidebar-hidden': ''}`}
      >
        <p className="tipoUsuario">{props.posicionUsuario}</p>
        {
          DataSidebar.map((item) => {
            return (
              <div key={item.title} className="Elementos">
                <NavLink
                  style={{ display: 'flex' }}
                  to={item.path}
                  className={
                    ({ isActive }) =>
                      ["nav-link", 'Elementos', isActive ? "active" : null].join("")
                  }
                >
                  <div className="element-icon">
                    {item.icon()}
                  </div>
                  {
                    <div
                      className={`sidebar-text ${menuHidden ? 'text-hidden': ''}`}
                    >
                      {item.title}
                    </div>
                  }
                </NavLink>
              </div>
            )
          })}
      </div>
    </section>
  );
};
export default SideBar;