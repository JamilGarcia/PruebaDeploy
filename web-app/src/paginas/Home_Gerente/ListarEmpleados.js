import "../../assets/hojas-de-estilo/ListarEmpleados.css";
import { FaBirthdayCake, FaAt, FaStackExchange } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState,useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import DatePicker from "react-datepicker";
import axios from "axios";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import TextBoxInputMOD from "../../Componentes/caja-texto-input/TextBoxInputMOD";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';

const ListarEmpleados = () => {
  const [EyeState , setEyeState] = useState("password");
    const [EyeState2 , setEyeState2] = useState("password");
    const [selectedDate , setSelectedDate] = useState(null);
    const [selectedDate2 , setSelectedDate2] = useState(null);
    const [show, setShow] = useState(false);
  const target = useRef(null);
    
    const  [Confirmpass , setConfirmpass] = useState(null);   
    const [formErros,setFormErros] = useState({
        estado: "activo"
    });
    const [Empleado, setEmpleado] = useState({
        primer_nombre:"",
        segundo_nombre: "",
        apellidos: "",
        correo: "",
        fecha_de_nacimiento: "",
        fecha_de_inicio: "",
        puesto_empresa: "",
        foto_perfil:"/images/avatar.png"
    });

    const [loading , setLoading] = useState(false);

    useEffect(() => {
        if(Object.keys(formErros).length === 0 && loading == false){
            ingresoUsuarioExitoso();
        }
    }, [formErros]);
    //Metodo para eliminar Error
    const quitarMensajeError = (e) => {
        console.log(e.target.name);
        setFormErros({...formErros, [e.target.name]: ''});
    }
    const handleChange = (e) => {
        if([e.target.name]== "confirm_password"){
            setConfirmpass(e.target.value);
        }else{
            setEmpleado({...Empleado, [e.target.name]: e.target.value});
        }
    };
    const handleChangeCombo = (e) => setEmpleado({...Empleado, [e.target.name]: e.target.value});

    const passControl = (num, e) =>{
        
        if(num === 1 ){
            if(EyeState === "password"){
               setEyeState("text");
            }else{
                setEyeState("password");
                
            }
        }
        if(num === 2 ){
            if(EyeState2 === "password"){
                setEyeState2("text");
                
             }else{
                 setEyeState2("password");
                
             }
        }
    }
    const handleChangeDate = ( place )  => {
        if(place === "fecha_de_inicio"){
            
            const fecha_temp = new Date(selectedDate2.toString());
            let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(fecha_temp);
            let mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(fecha_temp);
            let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(fecha_temp);
            let dateFormated = ye +"-" +mo +"-"+da;
            setEmpleado({...Empleado,fecha_de_inicio:dateFormated});
        }
        if(place === "fecha_de_nacimiento"){
            
             const fecha_temp2 = new Date(selectedDate.toString());
            let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(fecha_temp2);
            let mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(fecha_temp2);
            let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(fecha_temp2);
            let dateFormated = ye +"-" +mo +"-"+da;
            setEmpleado({...Empleado,fecha_de_nacimiento:dateFormated});
        }
    };

    
    const manejarIngresoDatos = async(e) => {
       
        e.preventDefault();
        setFormErros(validate());
        
    }
    const whenIsOpen = (place) =>{
        if(place === "fecha_de_inicio"){
            
           
            setSelectedDate2(new Date());
        }
        if(place === "fecha_de_nacimiento"){
            
            setSelectedDate(new Date());
            
        }
    }

    const ingresoUsuarioExitoso= async() => {
        //Limpiar campos y redireccionar a ventana anterior
        //navigate(-1);//Esto devuelve al ultimo elemento en la stack
        const body = Empleado;
        console.log(body);
        //https://comunicartewebapp-api.herokuapp.com/crear_empleado
        const respuesta = await fetch('https://comunicartewebapp-api.herokuapp.com/crear_empleado', {
             method: 'POST',
             headers: {"Content-Type": "application/json"},
             body: JSON.stringify(body)
         }).then((respuesta) => respuesta.json()).then((data)=>{ 
            if(data.status === "success"){
                alert("Creacion de Empleado Exitosa");

                //Limpiar campos
                
             }else{
                alert("Ocurrio un error al crear un nuevo empleado");
             }
         });
         //Limpiar campos
         
        
    };
    const validate = () =>{
        const erros = {}
        const rgex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if(!Empleado.primer_nombre){
            erros.primer_nombre = "Ingrese primer nombre";
        }
        if(!Empleado.segundo_nombre){
          erros.segundo_nombre = "Ingrese segundo nombre";
      }
        
        if(!Empleado.apellidos){
            erros.apellidos = "Ingrese apellidos";    
        }

        if(!Empleado.correo){
            erros.correo = "Ingrese correo";
            
        }else{
            if(!rgex.test(Empleado.correo)){
                erros.correo = "Este no es un correo valido.";
                
            }   
        }
        if(!Empleado.password_usuario){
            erros.password_usuario = "Ingrese Contraseña";
            erros.confirmpass = "Ingrese Contraseña";
        }
        
        if(!selectedDate){
            erros.fecha_de_nacimiento = "Selecione la fecha";
        }else{
            let date_birth = new Date(selectedDate.toDateString()) ;
            let today = new Date();
            let years = -date_birth.getFullYear() + today.getFullYear();
            
            if(years > 17){
                if(years === 18){
                    if( today.getMonth() < date_birth.getMonth()){
                        erros.fecha_de_nacimiento = "Fecha Invalida";    
                    }
                }
            }else{
                erros.fecha_de_nacimiento = "Fecha Invalida";
            }
        }

        if(!selectedDate2){
            erros.fecha_de_inicio = "Selecione la fecha";//2006/01/01
        }else{
            let date_start = new Date(selectedDate2.toString());
            let today = new Date();
            if(date_start.getFullYear() < 2006 || date_start.getFullYear() > today.getFullYear() ){
                erros.fecha_de_inicio = "Fecha Invalida";
            }
        }
        if(Empleado.puesto_empresa  === "true" || Empleado.puesto_empresa  === ""){
            erros.puesto_empresa = "Selecione un puesto";
            
        }
        if(Confirmpass !== Empleado.password_usuario){
            erros.confirm_password = "Contraseñas no coinciden";
        }
        if(!Confirmpass){
            erros.confirm_password = "Ingrese Contraseña";
        }
        
        
        return erros;
    }
  {/*}
  const [entradasMOD] = useState({errorPNombre: '', errorSNombre: '', errorApellidos: '', errorCorreo: ''});
  const {primer_nombre, segundo_nombre, apellidos, correo} = entradasMOD;
  const lista_errores = {errorPNombre: '', errorSNombre: '', errorApellidos: '', errorCorreo: ''}
  

  const validarValor = () => {
    
    if(primer_nombre.length === 0){
        lista_errores.errorPnombre = "¡Se requiere ingresar un Primer Nombre!";
    } else {
        lista_errores.errorPnombre = '';
    }
    if(segundo_nombre.length === 0){
        lista_errores.errorSnombre = "¡Se requiere ingresar un Segundo Nombre!";
    } else {
        lista_errores.errorSnombre = '';
    }
    if(apellidos.length === 0){
        lista_errores.errorApellidos = "¡Se requiere ingresar un Apellido!";
    } else {
        lista_errores.errorApellidos = '';
    }
    if(correo.length === 0){
        lista_errores.errorCorreo = "¡Se requiere ingresar un Correo!";
    } else {
        lista_errores.errorCorreo = '';
    }
    return lista_errores;
};
*/}
  return (
    <>
    <div className="Filtrado">
        <button className="botonFiltrarLE" onClick={ manejarIngresoDatos}>
            Filtar Activo/Inactivo
        </button>
    </div>
    
    <div className="fondo-pantallaLE">
        
      <div className="caja-izquierdaLE">

    <section>
      <div className="scrollitLE">
      <table
          id = "mytable"
          class="table table-stripedLE"
          data-toggle="table"
          data-url="data2.json"
        >
          <thead>
            <tr>
              <th scope="col">P.Nombre</th>
              <th scope="col">S.Nombre</th>
              <th scope="col">Apellidos</th>
            </tr>
          </thead>
        </table>
      </div>
      
    </section>
      </div>
      <div className="caja-derechaLE">
        <div className="cajaImagen">
        <img src="/images/Logo_ComunicArte_Final.png" className="comunicarte-logoMP"alt="Logo ComunicArte"/>
        <img src="/images/avatar.png"className="avatarMP"alt="Avatar de usuario"/>
      </div>
        <form onSubmit={ () =>manejarIngresoDatos} className="formDatos">
          <div className="Juntos">
          <TextBoxInputMOD className = "inputsMOD" TituloInput="Primer Nombre" name="primer_nombre" placeholder="Primer Nombre" 
            onChange={handleChange} errorInput={formErros.primer_nombre} onClick={quitarMensajeError}/>
            <TextBoxInputMOD TituloInput="Correo" name="correo" placeholder="Correo" onChange={handleChange} errorInput={formErros.correo} onClick={quitarMensajeError}/>
          
          </div>
          <div className="Juntos">
          <TextBoxInputMOD className = "inputsMOD" TituloInput="Segundo Nombre" name="segundo_nombre" placeholder="Segundo Nombre" 
            onChange={handleChange} errorInput={formErros.segundo_nombre} onClick={quitarMensajeError}/>
          <label  className="form-label-mod">Fecha de Inicio</label>
              <DatePicker  name="fecha_de_inicio" className='form-control-mod' selected={selectedDate2} dateFormat={"yyyy-MM-dd"} onCalendarOpen ={(place)=>whenIsOpen("fecha_de_inicio")} onCalendarClose={(place)=>handleChangeDate("fecha_de_inicio")} onChange={date => setSelectedDate2(date) }  />
              <p className="mensaje_error-mod">{formErros.fecha_de_inicio}</p>
            
          </div>
          <div className="Juntos">
          <TextBoxInputMOD TituloInput="Apellidos" name="apellidos" placeholder="Apellidos" onChange={handleChange} onClick={quitarMensajeError}
              errorInput = {formErros.apellidos}/>
            
              <label  className="form-label-cre ">Fecha de Nacimiento</label>
            <DatePicker name="fecha_de_nacimiento" className='form-control-mod' selected={selectedDate} dateFormat={"yyyy-MM-dd"}  onCalendarOpen ={(place)=>whenIsOpen("fecha_de_nacimiento")}  onCalendarClose={(place)=>handleChangeDate("fecha_de_nacimiento")} onChange={date => setSelectedDate(date) }  />
            <p className="mensaje_error-mod">{formErros.fecha_de_nacimiento}</p>
          </div>
          <div className="Juntos2">
                <FormControl>
                    <FormLabel>Estado</FormLabel>
                        <RadioGroup  defaultValue="Activo">
                            <FormControlLabel value="Activo" control={<Radio />} label="Activo" />
                            <FormControlLabel value="Inactivo" control={<Radio />} label="Inactivo" />
                        </RadioGroup>
                </FormControl>
                <div className="Juntos">
                    <label  className="form-label-mod">Tipo de Cuenta</label>  
                    <select  name ="puesto_empresa" class='form-control-mod' id = 'tipo_Cuenta' onChange={e => handleChangeCombo(e)}>
                        <option value = "true"> -- --- --</option>
                        <option value="Gerente">Gerente</option>
                        <option value = "Subgerente">Subgerente</option>
                        <option value = "Ejecutivo_Cuenta">Ejecutivo_Cuenta</option>
                    </select>
                    <p className="mensaje_error-mod">{formErros.puesto_empresa}</p>
                </div>
          </div>     
    </form>
        <div className="botonesModificacionLE">
      
        

          <button className="botonModificacionLE">
            Cancelar
          </button>
          <button className="botonModificacionLE" onClick={ manejarIngresoDatos}>
            Guardar Cambios
          </button>
          <button  className="botonModificacionLE" ref={target} onClick={() => setShow(!show)}>
            Eliminar Usuario
        </button>
      <Overlay target={target.current} show={show} placement="bottom">
        {(props) => (
          <Tooltip id="overlay-example" {...props}>
           <button className="botonModificacionLE">
            Aceptar
          </button>
          </Tooltip>
        )}
      </Overlay>
        </div>
      </div>
    </div>
    </>
  );
};

export default ListarEmpleados;