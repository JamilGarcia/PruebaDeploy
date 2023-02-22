import React, { useEffect, useState  } from "react";
import {  Input } from 'reactstrap';
import  '../../assets/hojas-de-estilo/CreateEmpleado.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import TextBoxInput from "../../Componentes/caja-texto-input/TextBoxInput";
import axios from "axios";
import Swal from 'sweetalert2';

const CreateEmpleado = () => {
    
    const [EyeState , setEyeState] = useState("password");
    const [EyeState2 , setEyeState2] = useState("password");
    const [selectedDate , setSelectedDate] = useState(null);
    const [selectedDate2 , setSelectedDate2] = useState(null);
    
    const  [Confirmpass , setConfirmpass] = useState(null);   
    const [formErros,setFormErros] = useState({
        estado: "activo"
    });
    const [nuevoEmpleado, setNuevoEmpleado] = useState({
        primer_nombre:"",
        segundo_nombre: "",
        apellidos: "",
        correo: "",
        fecha_de_nacimiento: "",
        fecha_de_inicio: "",
        puesto_empresa: "",
        password_usuario: "",
        estado: "activo",
        foto_perfil:"/images/avatar.png"
    });

    const [loading , setLoading] = useState(false);
    const uploadImage = async(e) => {
        const files = e.target.files;
        const formData = new FormData();
        formData.append("file", files[0]);
        formData.append("upload_preset" , "Prueba");
        
        setLoading(true);
        
        const {data} = await axios.post( "https://api.cloudinary.com/v1_1/do0jwednz/image/upload",formData)
        console.log(typeof(data.secure_url))
        setNuevoEmpleado({...nuevoEmpleado,['foto_perfil']:data.secure_url})
        console.log(data.secure_url)
        setLoading(false)
        return {publicId : data?.public_id , url: data?.secure_url}
    }

    useEffect(() => {
        if(Object.keys(formErros).length === 0 && loading == false){
            ingresoUsuarioExitoso();
        }
    }, [formErros]);
    //Metodo para eliminar Error
    const quitarMensajeError = (e) => {
        setFormErros({...formErros, [e.target.name]: ''});
    }
    const handleChange = (e) => {
        if([e.target.name]== "confirm_password"){
            setConfirmpass(e.target.value);
        }else{
            setNuevoEmpleado({...nuevoEmpleado, [e.target.name]: e.target.value});
        }
    };
    const handleChangeCombo = (e) => setNuevoEmpleado({...nuevoEmpleado, [e.target.name]: e.target.value});

    const changeDatesValue = (date,place) =>{
        
        if(place === "fecha_de_inicio" && date != null){
            
           
            setSelectedDate2(date);
        }
        if(place === "fecha_de_nacimiento" && date != null){
            
            setSelectedDate(date);
            
        }
    }

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
            setNuevoEmpleado({...nuevoEmpleado,fecha_de_inicio:dateFormated});
        }
        if(place === "fecha_de_nacimiento"){
            
             const fecha_temp2 = new Date(selectedDate.toString());
            let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(fecha_temp2);
            let mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(fecha_temp2);
            let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(fecha_temp2);
            let dateFormated = ye +"-" +mo +"-"+da;
            setNuevoEmpleado({...nuevoEmpleado,fecha_de_nacimiento:dateFormated});
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
        const body = nuevoEmpleado;
        //console.log(body);
        //https://comunicartewebapp-api.herokuapp.com/crear_empleado
        //https://localhost:5000/crear_empleado
        const respuesta = await fetch('https://comunicartewebapp-api.herokuapp.com/crear_empleado', {
             method: 'POST',
             headers: {"Content-Type": "application/json"},
             body: JSON.stringify(body)
         }).then((respuesta) => respuesta.json()).then((data)=>{ 
            if(data.status === "success"){
                Swal.fire({
                    icon:"success",
                    title:"Creacion Exitosa",
                    text: "¡Se creo el perfil de empleado exitosamente!"
                })

                //Limpiar campos
                setSelectedDate(null);
                setSelectedDate2(null);
                setNuevoEmpleado({
                    primer_nombre:"", segundo_nombre: "", apellidos: "", correo: "",
                    fecha_de_nacimiento: "", fecha_de_inicio: "", puesto_empresa: "",
                    password_usuario: "", estado: "activo",foto_perfil:"/images/avatar.png"
                })
                setFormErros({estado: "activo" });
                let inputs = document.getElementsByClassName("form-control-cre");
                for (let i = 0; i < inputs.length; i++) {
                        inputs[i].value = '';
                }
                document.getElementById('tipo_Cuenta').value = "true";
                setEyeState("password");
                setEyeState2("password");
                setConfirmpass(null);
             }else{
                Swal.fire({
                    icon:"error",
                    title:"Error",
                    text: "Ocurrio un error al crear un nuevo empleado"
                })
             }
         });
         //Limpiar campos
         
        
    };
    const validate = () =>{
        const erros = {}
        const rgex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        const dominioCorreo = 'comunicartehn.com';
        if(!nuevoEmpleado.primer_nombre){
            erros.primer_nombre = "Ingrese primer nombre";
        }
        
        if(!nuevoEmpleado.apellidos){
            erros.apellidos = "Ingrese apellidos";    
        }

        if(!nuevoEmpleado.correo){
            erros.correo = "Ingrese correo";
            
        }else{
            if(!rgex.test(nuevoEmpleado.correo)){
                erros.correo = "Este no es un correo valido.";
            } else {
                //Revisar si el correo es del dominio
                let correoCaseSensitive = nuevoEmpleado.correo.toLowerCase();
                if(!correoCaseSensitive.endsWith(`@${dominioCorreo}`)){
                    erros.correo = "Este correo no es de la empresa."               
                } 
            }
            
        }
        if(!nuevoEmpleado.password_usuario){
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
        if(nuevoEmpleado.puesto_empresa  === "true" || nuevoEmpleado.puesto_empresa  === ""){
            erros.puesto_empresa = "Selecione un puesto";
            
        }
        if(Confirmpass !== nuevoEmpleado.password_usuario){
            erros.confirm_password = "Contraseñas no coinciden";
        }
        if(!Confirmpass){
            erros.confirm_password = "Ingrese Contraseña";
        }
        
        
        return erros;
    }
    return (
        
        <div className="fondo-pantalla-cre">                        
            {/* {Object.keys(formErros).length === 0 && isSubmit ? (ingresoUsuarioExitoso()) : (ingresoUsuario_no_Exitoso())} */}
            <h1 className = "Tituloc"><bl>Creación De Perfil De Usuario</bl></h1>
            <div className="CuadroCentrado-cre">
                    
                    <div className="seccion_entradas-cre">
                        <form onSubmit={ () =>manejarIngresoDatos} className="row g-3">
                            <TextBoxInput TituloInput="Primer Nombre" name="primer_nombre" placeholder="Primer Nombre" valor={nuevoEmpleado.primer_nombre}
                                onChange={handleChange} errorInput={formErros.primer_nombre} onClick={quitarMensajeError}/>

                            <TextBoxInput TituloInput="Segundo Nombre" name="segundo_nombre" placeholder="Segundo Nombre" onChange={handleChange} valor={nuevoEmpleado.segundo_nombre}/>
                            <TextBoxInput TituloInput="Apellidos" name="apellidos" placeholder="Apellidos" onChange={handleChange} onClick={quitarMensajeError}
                                errorInput = {formErros.apellidos} valor={nuevoEmpleado.apellidos}/>

                            <div className='formSpace ' >
                                <label  className="form-label ">Fecha de Inicio</label>
                                <DatePicker  name="fecha_de_inicio" className='form-control-cre' selected={selectedDate2} dateFormat={"yyyy-MM-dd"} onCalendarOpen ={(place)=>whenIsOpen("fecha_de_inicio")} onCalendarClose={(place)=>handleChangeDate("fecha_de_inicio")} onChange={(date,place) => changeDatesValue(date,'fecha_de_inicio') }  />
                                <p className="mensaje_error-cre">{formErros.fecha_de_inicio}</p>
                            </div>
                            <TextBoxInput TituloInput="Correo" name="correo" placeholder="Correo" onChange={handleChange} errorInput={formErros.correo} onClick={quitarMensajeError}
                                valor={nuevoEmpleado.correo}
                            />
                            <div className="formSpace">
                                <label for="" className="form-label-cre">Contraseña</label>
                                <div className="password_segmento">
                                    <input
                                    type= {EyeState}
                                    placeholder=""
                                    className="form-control-cre"
                                    name="password_usuario"
                                    onChange={e => handleChange(e)}
                                    />
                                    <button type="button" className='btn btn-outline-secondary passEye'  name="password1" onClick={(e) => passControl(1, e)} > {EyeState === "text" ? <AiFillEyeInvisible/>:< AiFillEye/>}</button>
                                </div>
                                
                                    <p className="mensaje_error-cre">{formErros.password_usuario}</p>
                            </div>
                            <div className='formSpace'>
                                <label  className="form-label-cre ">Fecha de Nacimiento</label>
                                <DatePicker name="fecha_de_nacimiento" className='form-control-cre' selected={selectedDate} dateFormat={"yyyy-MM-dd"}  onCalendarOpen ={(place)=>whenIsOpen("fecha_de_nacimiento")}  onCalendarClose={(place)=>handleChangeDate("fecha_de_nacimiento")} onChange={(date,place) => changeDatesValue(date,'fecha_de_nacimiento') }  />
                                <p className="mensaje_error-cre">{formErros.fecha_de_nacimiento}</p>
                            </div>
                            <div className="formSpace">
                                <label for="" className="form-label-cre">Confirmar Contraseña</label>
                                <div className="password_segmento">
                                    <input
                                    type= {EyeState2}
                                    className="form-control-cre"
                                    name="confirm_password"
                                    onChange={e => handleChange(e)}
                                    />
                                    <button type="button" className='btn btn-outline-secondary passEye ' name="password2" onClick={() => passControl(2)} >{EyeState2 === "text" ? <AiFillEyeInvisible/>:< AiFillEye/>}</button>
                                </div>
                                
                                    <p className="mensaje_error-cre">{formErros.confirm_password}</p>
                            </div>
                            <div className='formSpace'>
                                <label  className="form-label-cre ">Tipo de Cuenta</label>    
                                <select  name ="puesto_empresa" class='form-select' id = 'tipo_Cuenta' onChange={e => handleChangeCombo(e)}>
                                    <option value = "true"> -- --- --</option>
                                    <option value="Gerente">Gerente</option>
                                    <option value = "Subgerente">Subgerente</option>
                                    <option value = "Ejecutivo_Cuenta">Ejecutivo_Cuenta</option>
                                </select>
                                <p className="mensaje_error-cre">{formErros.puesto_empresa}</p>
                            </div>
                            
                        </form>
                        
                    </div>
                    <div className="seccion_2">
                        <img className= "Foto_crePerfil" src={nuevoEmpleado.foto_perfil}  />
                        {loading ? (<p className="mensaje_error-cre">Cargando Imagen</p>) : (<h3></h3> )}
                        <div className="col-12">
                            
                            <Input
                                type='file'
                                name='file'
                                placeholder='Sube tu imagen aqui' 
                                onChange={uploadImage}
                                className = 'InputFile_CreateUser'
                            />
                            
                        </div>
                        <div className="col-12">
                            <button type="button" className='btn btn-outline-secondary Boton_config' onClick={ manejarIngresoDatos}>Crear</button>
                        </div>
                    </div>
                    
                </div> 

        </div>
    );

}

export default CreateEmpleado;