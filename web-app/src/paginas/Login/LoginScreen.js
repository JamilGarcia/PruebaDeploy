import React, {useState, useContext} from 'react';
import  '../../assets/hojas-de-estilo/LoginScreen.css';
import {AiOutlineMail} from 'react-icons/ai';
import {FaLock} from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


const LoginScreen = () => {
    //Destructuring de datos de entrada, correo y contraseña
    const [entradasLogin,setEntradasLogin] = useState({login_Email: '',login_Password: ''});
    const {login_Email, login_Password} = entradasLogin;
    const [formErrors, setFormErrors] = useState({errorEmail: '',errorPassword: ''});
    const [requestFetchLogin, setRequestFetchLogin] = useState(false);
    const {loginUsuario} = useContext(AuthContext);

    /*Metodo para manejar cambios en inputs de texto */
    const onChange = (e) => setEntradasLogin({...entradasLogin, [e.target.name]: e.target.value});
        

    const limpiarErrorCampoTextoEmail = () => {
        if(formErrors.errorEmail !== '')
            setFormErrors({...formErrors, errorEmail: ""});
    }
    const limpiarErrorCampoTextoPassword = () => {
        //Revisar si hay un error, si lo hay dejarlo vacio
        if(formErrors.errorPassword !== '')
            setFormErrors({...formErrors, errorPassword: ""});
    }

    /*Metodo para manejar datos de ingreso de sesión*/ 
    const manejarIngreso = (e) => {
       
        e.preventDefault();//Prevenir que recargue la pagina
        setRequestFetchLogin(true);
        setTimeout(() => {}, 2000);
        try {
            setFormErrors({...validarValor()});
            //Verificacion que no existan errores (verificacion de campos por bugs con errores)
            if((formErrors.errorEmail === '' && formErrors.errorPassword === '')  &&
                (login_Email !== '' && login_Password !== '')){
                loginUsuario(login_Email, login_Password, requestFetchLogin, setRequestFetchLogin);//Llamado a metodo que conecta con el back-end
            } else {
                setRequestFetchLogin(false);
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    const validarValor = () => {
        /*Metodo para validacion de entradas, validacion de campos vacios y correo por regex */
        let lista_errores = {errorEmail: '', errorPassword: ''}
        const regex_Correo = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if(login_Email.length === 0){
            lista_errores.errorEmail = "¡Se requiere ingresar una correo!";
        } else if(!regex_Correo.test(login_Email)){
            lista_errores.errorEmail = "Este no es un correo valido.";
        } else {
            lista_errores.errorEmail = '';
        }
        if(login_Password.length === 0)
            lista_errores.errorPassword = "¡Se requiere ingresar una contraseña!";
        else 
            lista_errores.errorPassword = '';
        return lista_errores;
    };

    return (
        <div className= "fondo-pantalla">
            <div className="caja-Login">
                <img src="/images/Logo_ComunicArte_Final.png" alt="Logo de la empresa ComunicArte"
                height="120"/>
                <h2>Inicio de Sesión</h2>
                <form className="contenedor_datos" onSubmit={manejarIngreso}>
                    <div className="form-group">
                        <AiOutlineMail size={35} color="gray"/>
                        <input type = "email" placeholder ="Ingrese su correo" 
                            id="email_login" name="login_Email" className="form-control" 
                            value={login_Email} onChange={e => onChange(e)} onClick={limpiarErrorCampoTextoEmail}/>
                    </div>
                    <div className='indicador_error'>{formErrors.errorEmail}</div>          
                    <div className ="form-group">
                        <FaLock size={35} color="gray"/>
                        <input type = "password" placeholder ="Ingrese su contraseña" id="password" 
                            name="login_Password" className="form-control" value={login_Password} onChange={e => onChange(e)}
                            onClick={limpiarErrorCampoTextoPassword}/>
                    </div>
                    <div className='indicador_error'>{formErrors.errorPassword}</div>
                    <button type="submit" className="btn-login">Ingresar</button>
	            </form>
                {requestFetchLogin ?  
                    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
                        <CircularProgress color="inherit" />
                    </Backdrop>: null}
            </div>
        </div>
    );
}

export default LoginScreen;