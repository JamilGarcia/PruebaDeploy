import React, { createContext, useState } from "react";

const { innerWidth } = window;
const responsiveFirstValue = innerWidth < 768 ;

export const GlobalContext = createContext(null);
export const GlobalProvider = ({ children }) => {
  const [menuHidden, setMenuHidden] = useState(responsiveFirstValue);
  const ContextValues = {
    menuHidden,
    setMenuHidden
  }

  return <GlobalContext.Provider value={ContextValues} >{children}</GlobalContext.Provider>;
}

