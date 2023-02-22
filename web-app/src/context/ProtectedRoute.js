
import {Navigate, Outlet} from "react-router-dom";

export const ProtectedRoute= () => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    let loggedIn_bool = false;
    if(loggedIn){loggedIn_bool = true;}
    //Hacer validacion por usuario para que no pueda acceder a ventanas de otros usuarios
    //ej. Gerente no puede acceder a ventana subgerente/ejecutivoCuenta
    return <>{loggedIn_bool ? <Outlet /> : <Navigate to ="/"/>}</>
  }
  