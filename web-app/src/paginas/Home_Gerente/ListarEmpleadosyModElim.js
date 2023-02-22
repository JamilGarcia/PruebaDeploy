import "../../assets/hojas-de-estilo/ListarEmpleados.css";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
import TextBoxInputMOD from "../../Componentes/caja-texto-input/TextBoxInputMOD";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TablaListaEmpleados from "../../Componentes/tablaListaEmpleados/TablaListaEmpleados";
import { columnasListadoEmpleados, obtenerListaEmpleados } from "../../data/TablaListaEmpleadosData";
import { obtenerDatoEmpleadoMOD } from "../../Componentes/peticiones/obtenerDatosEmpleado";
import { validarCamposModificarPerfilEmpleado } from "../../Componentes/Funciones/ValidacionCamposPerfilEmpleado";
import Swal from "sweetalert2";

const ListarEmpleadosyModElim = () => {
  
    const [datosTablaEmpleados, setDatosTablaEmpleados] = useState([]);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState("");
    const [botonIsDisabled,setBotonIsDisabled] = useState(false);
    const [nombreEmpleado, setNombreEmpleado] = useState("");
    const [correoViejoEmpleado, setCorreoViejoEmpleado] = useState("");
    const buttonStyleStatus = {
        backgroundColor: botonIsDisabled ? 'gray': 'blue'
    };

    const [datosEmpleado, setDatosEmpleado] = useState({
        primer_nombre:"", segundo_nombre: "", apellidos: "", correo: "",
        fecha_de_nacimiento: "", fecha_de_inicio: "",
        puesto_empresa: "false", estado: ""
    });
    const [fechaNacimiento , setFechaNacimiento] = useState(null);
    const [fechaInicio , setFechaInicio] = useState(null);

    const [formErrorsMod, setFormErrorsMod] = useState ({
        primer_nombre:"", segundo_nombre: "", apellidos: "",
        correo: "", fecha_de_nacimiento: "", fecha_de_inicio: "",
        puesto_empresa: ""
    })

    useEffect(() => {
        window.onbeforeunload = obtenerListaEmpleados(setDatosTablaEmpleados);
        
    },[])

    const cargarCamposEmpleado = () => {
        obtenerDatoEmpleadoMOD(usuarioSeleccionado, setDatosEmpleado).then((data) => {
            try {
                setFormErrorsMod({
                    primer_nombre: "", segundo_nombre: "", apellidos: "", correo: "",
                    fecha_de_nacimiento: "", fecha_de_inicio: "", puesto_empresa:"", estado: ""
                });
                setFechaNacimiento(new Date(data.fecha_de_nacimiento));
                setFechaInicio(new Date(data.fecha_de_inicio));
                //Asginar el estado del radio button
                let estadoEmpleado = data.estado;
                if(estadoEmpleado === "activo"){
                    setDatosEmpleado(prevEmpleado => ({...prevEmpleado, estado:"activo"}));
                } else {
                    setDatosEmpleado(prevEmpleado => ({...prevEmpleado, estado:"inactivo"}));
                }
                //Cargar nombre de Empleado
                setNombreEmpleado(data.primer_nombre + " " + data.apellidos);
                setCorreoViejoEmpleado(data.correo);
            } catch (error) {
                console.log(error);
            }
        })
    }
    const changeDatesValue = (date,place) =>{
        
        if(place === "fecha_de_inicio" && date != null){
            
            setFechaInicio(date);
          //  setSelectedDate2(date);
        }
        if(place === "fecha_de_nacimiento" && date != null){
            setFechaNacimiento(date);
            //setSelectedDate(date);
            
        }
    }
    const whenIsOpen = (place) =>{
        if(place === "fecha_de_inicio"){
            setFechaInicio(new Date());
        }
        if(place === "fecha_de_nacimiento"){
            setFechaNacimiento(new Date());
        }
    }
    const handleChangeDate = ( place )  => {
        if(place === "fecha_de_inicio"){
            //console.log(fechaInicio.toString());

            setFormErrorsMod(prevError => ({...prevError, puesto_empresa:""}));
            const fecha_temp = new Date(fechaInicio.toString());
            let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(fecha_temp);
            let mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(fecha_temp);
            let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(fecha_temp);
            let dateFormated = ye +"-" +mo +"-"+da;
            setDatosEmpleado({...datosEmpleado,fecha_de_inicio:dateFormated});
        }
        if(place === "fecha_de_nacimiento"){

             const fecha_temp2 = new Date(fechaNacimiento.toString());
            let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(fecha_temp2);
            let mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(fecha_temp2);
            let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(fecha_temp2);
            let dateFormated = ye +"-" +mo +"-"+da;
            setDatosEmpleado({...datosEmpleado,fecha_de_nacimiento:dateFormated});
        }
    };

    const handleRadioButton = (e) => {setDatosEmpleado({...datosEmpleado,estado: e.target.value});}
    
    const handleChangeCombo = (e) => {
        //setFormErrorsMod(prevError => ({...prevError, puesto_empresa:""}));
        setDatosEmpleado({...datosEmpleado, puesto_empresa: e.target.value})
    };

    const LimpiarCamposEmpleado = () => {
        setDatosEmpleado({
            primer_nombre: "", segundo_nombre: "", apellidos: "", correo: "",
            fecha_de_nacimiento: "", fecha_de_inicio: "", puesto_empresa:"-----", estado: ""
        });
        setFormErrorsMod({
            primer_nombre: "", segundo_nombre: "", apellidos: "", correo: "",
            fecha_de_nacimiento: "", fecha_de_inicio: "", puesto_empresa:"", estado: ""
        });
        setFechaNacimiento(null);
        setFechaInicio(null);
        setNombreEmpleado("");
        setUsuarioSeleccionado("");
    }

    const onChange = (e) => setDatosEmpleado({...datosEmpleado, [e.target.name]: e.target.value});

    const manejarIngresoDatosModificarEmpleado = async (e) => {
        e.preventDefault();
        console.log(usuarioSeleccionado);
        if(usuarioSeleccionado !== "" && nombreEmpleado !== ""){
            const validacion = validarCamposModificarPerfilEmpleado(datosEmpleado, setFormErrorsMod);
            if(validacion){

                //Verificar si ocurrieron cambios
                //https://comunicartewebapp-api.herokuapp.com/crear_empleado
                //http://localhost:5000/Gerente/gestion_perfiles/modificar_perfiles
                const respuestaPeticion = await axios.put("https://comunicartewebapp-api.herokuapp.com/Gerente/gestion_perfiles/modificar_perfiles",{
                    primer_nombre: datosEmpleado.primer_nombre,
                    segundo_nombre: datosEmpleado.segundo_nombre,
                    apellidos: datosEmpleado.apellidos,
                    correoNuevo:datosEmpleado.correo,
                    correoViejo: correoViejoEmpleado,
                    fecha_de_nacimiento: datosEmpleado.fecha_de_nacimiento,
                    fecha_de_inicio: datosEmpleado.fecha_de_inicio,
                    estado: datosEmpleado.estado,
                    puesto_empresa: datosEmpleado.puesto_empresa
                })
                if(respuestaPeticion.data.status === "SuccesMod"){
                    
                    Swal.fire({
                        title: 'Configuración exitosa',
                        text: '¡La actualización de la información fue exitosa!',
                        icon: 'success',
                      });
                      //Actualizar elementos como la tabla y dropdown menu si se requiere
                      obtenerListaEmpleados(setDatosTablaEmpleados);
                      LimpiarCamposEmpleado();
                } else {
                    //Error en base de datos
                    Swal.fire({
                        title: 'Error',
                        icon: 'error',
                        text: 'Ocurrio un error al momento de hacer la configuración\n'+
                              'Intente de nuevo',
                      });
                }
            } 
        } else {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Debe seleccionar un empleado"
            })
        }
        
    }

    const eliminarErrorMP = async (e) => {
        setFormErrorsMod({...formErrorsMod, [e.target.name]: ""});
    }
    const manejarEliminarEmpleado = () => {
        if(usuarioSeleccionado !== ""){
            Swal.fire({
                title: '¿Esta seguro?',
                text: "¡Desactivación del perfil del empleado!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, eliminar',
                cancelButtonText: "Cancelar"
              }).then(async (result) => {
                if (result.isConfirmed) {
                    //Hacer peticion para actualizar estado de empleado en la empresa
                    //https://comunicartewebapp-api.herokuapp.com
                    //http://localhost:5000/Gerente/gestion_perfiles/eliminar_perfil
                    const resultPeticionElim = axios.put("https://comunicartewebapp-api.herokuapp.com/Gerente/gestion_perfiles/eliminar_perfil",
                    {correoEmpleado: usuarioSeleccionado});

                    Swal.fire({
                        title: 'Eliminado',
                        text: 'Se desactivo la cuenta del empleado exitosamente.',
                        icon: 'success'
                    })
                    //Cargar Datos de empleado otra vez para mostrar que ahora es inactivo
                    obtenerDatoEmpleadoMOD(usuarioSeleccionado, setDatosEmpleado);
                    obtenerListaEmpleados(setDatosTablaEmpleados);
                }
              })
        } else {
            Swal.fire({
                title: "Error",
                icon: "warning",
                text: "¡Debe seleccionar a un empleado!"
            })
        }
    }

    return (
        <div className="fondo-pantallaLE">
        <div className="caja-izquierdaLE">
            <div className="scrollitLE">
                <TablaListaEmpleados datosTabla={datosTablaEmpleados} columnas={columnasListadoEmpleados} setUsuarioSeleccionado = {setUsuarioSeleccionado}/>
            </div>
                <button type="button" className="botonModificacionLE" onClick={cargarCamposEmpleado}>Agregar</button>
            </div>
        <div className="caja-derechaLE">
            <form  onSubmit={manejarIngresoDatosModificarEmpleado}>
                <h3>Empleado:{nombreEmpleado}</h3>
                <div className="seccionEntradasGModificarPerfil">
                    <TextBoxInputMOD TituloInput="Primer Nombre" name="primer_nombre" valor = {datosEmpleado.primer_nombre}
                    errorInput = {formErrorsMod.primer_nombre} onChange={onChange} onClick={eliminarErrorMP}
                    />
                    <TextBoxInputMOD TituloInput="Segundo Nombre" name="segundo_nombre" valor = {datosEmpleado.segundo_nombre}
                    errorInput = {formErrorsMod.segundo_nombre} onChange={onChange} onClick={eliminarErrorMP}
                    />
                </div>
                <div className="seccionEntradasGModificarPerfil">
                    <TextBoxInputMOD TituloInput="Apellidos" name="apellidos" valor = {datosEmpleado.apellidos}
                     errorInput = {formErrorsMod.apellidos} onChange={onChange} onClick={eliminarErrorMP}
                    />
                    <div className="cajaColumnaModElim">
                        <label className="form-label-mod">Fecha de Nacimiento</label>
                        <DatePicker className='form-control-modElim' selected={fechaNacimiento} dateFormat={"yyyy-MM-dd"} onCalendarOpen ={(place)=>whenIsOpen  ("fecha_de_nacimeinto")} onCalendarClose={(place)=>handleChangeDate("fecha_de_nacimiento")} onChange={(date,place) => changeDatesValue(date,'fecha_de_nacimiento')}
                        />
                         <p className="mensaje_error-ModElim">{formErrorsMod.fecha_de_nacimiento}</p>
                    </div>
                    
                </div>
                <div className="seccionEntradasGModificarPerfil">
                    <TextBoxInputMOD TituloInput="Correo" name="correo" valor = {datosEmpleado.correo}
                     errorInput = {formErrorsMod.correo} onChange={onChange}
                    />
                    <div className="cajaColumnaModElim">
                        <label className="form-label-mod">Fecha de Inicio</label>
                        <DatePicker className='form-control-modElim' selected={fechaInicio} dateFormat={"yyyy-MM-dd"} 
                            onCalendarOpen ={(place)=>whenIsOpen      ("fecha_de_inicio")} onCalendarClose={(place)=>handleChangeDate("fecha_de_inicio")} onChange={(date,place) => changeDatesValue(date,'fecha_de_inicio')}
                            
                        />
                        <p className="mensaje_error-ModElim">{formErrorsMod.fecha_de_inicio}</p>
                    </div>
                    
                </div>
                <div className="seccionEntradasGModificarPerfil">
                    <FormControl>
                        <FormLabel>Estado</FormLabel>
                            <RadioGroup  defaultValue="activo" name="estadoEmpleado-grupo" value={datosEmpleado.estado} onChange={handleRadioButton}>
                                <FormControlLabel value="activo" control={<Radio />} label="Activo" />
                                <FormControlLabel value="inactivo" control={<Radio />} label="Inactivo" />
                            </RadioGroup>
                    </FormControl>
                    <div className="cajaColumnaModElim">
                        <label  className="form-label-mod">Tipo de Cuenta</label>  
                        <select  value ={datosEmpleado.puesto_empresa}name ="puesto_empresa" className='comboBoxModElim' onChange={e => handleChangeCombo(e)}>
                            <option value = "false"> -- --- --</option>
                            <option value="Gerente">Gerente</option>
                            <option value = "Subgerente">Subgerente</option>
                            <option value = "Ejecutivo_Cuenta">Ejecutivo_Cuenta</option>
                        </select>
                        <p className="mensaje_error-ModElim">{formErrorsMod.puesto_empresa}</p>
                    </div>
                </div>
            <div className="botonesModificacionLE">
                <button type="button" className="botonModificacionLE" onClick={LimpiarCamposEmpleado}>Cancelar</button>
                <div className="botonesCambiosModElim">
                    <button type="submit" className="botonModificacionLE">Guardar Cambios</button>
                    <button type="button" className="botonModificacionLE" onClick={manejarEliminarEmpleado} >Eliminar Perfil</button>
                </div>
            </div>
            </form>
        </div>
        </div>
    );
};

export default ListarEmpleadosyModElim;