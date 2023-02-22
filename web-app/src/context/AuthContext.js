import React, { createContext, useState} from "react";
import { useNavigate} from 'react-router-dom';
import Swal from "sweetalert2";

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
            //https://comunicartewebapp-api.herokuapp.com/
            //http://localhost:5000/
            const respuesta = await fetch('https://comunicartewebapp-api.herokuapp.com/', {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            }).then((respuesta) => respuesta.json()).then((data) => {
                let validarPeticion = true;
                //Validar si ocurrio error en contraseña o correo
                if(data.status === "ErrorPW"){
                    Swal.fire({
                        title: "Error",
                        icon: "error",
                        text: String.fromCodePoint(0x26a0)+" ¡El usuario  o contraseña no es valida! "+String.fromCodePoint(0x26a0)
                    });
                    setRequestFetchLogin(false);
                    validarPeticion = false;
                }
                //Validar estado de empleado
                if(data.Estado === "inactivo"){
                    setRequestFetchLogin(false);
                    Swal.fire({
                        title: "Error",
                        icon: "error",
                        text: "El usuario que esta intentando ingresar esta inactivo en la empresa.\n¡No puede acceder al sistema!"
                    });
                    validarPeticion = false;
                } 

                if(validarPeticion){
                    if(data.Posicion!== ''){
                        setDatosUsuario({correo: email,posicion_Usuario: data.Posicion});
                        setLoggedIn(current => !current);
                        setRequestFetchLogin(false);
                        //Redireccionar a base de data de Rest API
                        if(data.Posicion === "Gerente"){
                            navigate('/Gerente');
                        } else if(data.Posicion === "Subgerente"){
                            navigate('/Subgerente');
                        } else { //Es ejecutivo de cuenta
                            navigate('/Ejecutivo_cuenta');
                        } 
                        /*Local Storage*/
                        localStorage.setItem("isLoggedIn", "true");
                    }else {
                        console.log("El usuario no es valido.")
                    }
                }
                
            }).catch(() => {
                Swal.fire({
                    icon:"error",
                    title:"Error",
                    text: "Ocurrio algun error en el servidor.\nIntente la peticion nuevamente."
                })
                //alert();
                setRequestFetchLogin(false);
            });

        } catch (err) {
            console.error(err.message);
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

