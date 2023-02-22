import "../../assets/hojas-de-estilo/TopBar.css";
import React from "react";
import DropdownButton from "./Dropdown";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalProvider";

import { FaBars } from 'react-icons/fa';


const TopBar = () => {
  const {menuHidden, setMenuHidden} = useContext(GlobalContext);

  return (
    <React.Fragment>
      <div className="topbar">
        <div className="topbar-left">
          <button className="btn"  style={{color:'white'}}onClick={() => setMenuHidden(!menuHidden)} />
            <FaBars/>

          <button className="btn" onClick={() => setMenuHidden(!menuHidden)}>
            <i class="fas fa-bars"></i>
          </button>
          ComunicArte
        </div>
        <div className="topbar-right">
          <DropdownButton />
        </div>
      </div>
      <div className="topbar-spacer"></div>
    </React.Fragment>
  );
}

export default TopBar;