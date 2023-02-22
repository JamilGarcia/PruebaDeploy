import React, { createContext,  useState} from "react";
import { useNavigate} from 'react-router-dom';

export const AuthContext= createContext(null);

//Creacion de provider
const initialDatosUser = {
    correo_usuario: "",
    posicion_Usuario: ""
}
export const AuthProvider = ({children}) => {
    
    const [loggedIn, setLoggedIn] = useState(false);
    const [datosUsuario, setDatosUsuario] = useState(initialDatosUser);
    const navigate = useNavigate();

    const loginUsuario = async (email, password , requestFetchLogin, setRequestFetchLogin) => {

        /*Metodo para verificar usuario en la base de datos al hacer fetch */
        try {
            const body = {correo: email, password_usuario: password}; //Recordatorio de cambiar este code
            const respuesta = await fetch('https://comunicartewebapp-api.herokuapp.com//', {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            }).then((respuesta) => respuesta.json()).then((data) => {
                
                if(data.Posicion!== ''){
                    //window.localStorage.setItem("isLoggedIn", "true");
                    setDatosUsuario({
                        correo: email,
                        posicion_Usuario: data.Posicion});
                    setLoggedIn(current => !current);
                    setRequestFetchLogin(false);
                    //Posicion usuario,
                    //Redireccionar a base de data de Rest API
                    if(data.Posicion === "Gerente"){
                        navigate('/Gerente');
                    } else if(data.Posicion === "Subgerente"){
                        navigate('/Subgerente');
                    } else {
                        //Es ejecutivo de cuenta
                        navigate('/Ejecutivo_cuenta');
                    }

                    /*Local Storage*/
                    localStorage.setItem("isLoggedIn", "true");
                    //localStorage.setItem("puestoEmpresa", data.Posicion);
                    //localStorage.setItem("correoUsuario", datosUsuario.correo_usuario);
                }else {
                    console.log("El usuario no es valido.")
                }
            }).catch(() => {alert(String.fromCodePoint(0x26a0)+" El usuario  o contraseña no es valida "+String.fromCodePoint(0x26a0))
            setRequestFetchLogin(false);});
            
        } catch (err) {
            console.error(err.message); 
            setRequestFetchLogin(false);
        } 
    }

    const logoutUsuario = () => {
        //window.localStorage.removeItem();
        localStorage.setItem("isLoggedIn","false");
        //localStorage.setItem("puestoEmpresa","");
        //localStorage.setItem("correoUsuario","");
        setLoggedIn(false);
        setDatosUsuario(initialDatosUser);
        navigate('/');
    }

    const datosUsuario_Ingresado = {
        loginUsuario,
        logoutUsuario,
        loggedIn,
        datosUsuario
    }


    return<AuthContext.Provider value={datosUsuario_Ingresado} >{children}</AuthContext.Provider>;
}

